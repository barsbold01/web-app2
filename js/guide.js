/**
 * guide-content.js
 * Өргөдлийн зам хуудасны интерактив функцүүд
 */

(function () {
  'use strict';

  /* ============================================================
     ROADMAP ACCORDION — дэлгэрэнгүй хэсгийг нээх/хаах
     ============================================================ */
  function initRoadmapAccordion() {
    var cards = document.querySelectorAll('.roadmap-card');

    cards.forEach(function (card) {
      var btn    = card.querySelector('.roadmap-arrow');
      var detail = card.querySelector('.roadmap-detail');

      if (!btn || !detail) return;

      btn.addEventListener('click', function () {
        var isOpen = detail.classList.contains('is-open');

        if (isOpen) {
          detail.classList.remove('is-open');
          btn.classList.remove('is-open');
          btn.setAttribute('aria-expanded', 'false');
        } else {
          detail.classList.add('is-open');
          btn.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });

      btn.setAttribute('aria-expanded', 'false');
    });
  }

  /* ============================================================
     ROADMAP LINE HEIGHT — алхамуудын хоорондох шугамын өндрийг тохируулах
     ============================================================ */
  function updateRoadmapLines() {
    var items = document.querySelectorAll('.roadmap-item');

    items.forEach(function (item, i) {
      var line = item.querySelector('.roadmap-line');
      if (!line) return; // сүүлийн алхамд шугам байхгүй

      // Дараагийн алхамын card-ийн дээд хэсэг хүртэлх зай
      var nextItem = items[i + 1];
      if (!nextItem) { line.style.display = 'none'; return; }

      var stepEl   = item.querySelector('.roadmap-step');
      var stepRect = stepEl.getBoundingClientRect();
      var nextStepEl   = nextItem.querySelector('.roadmap-step');
      var nextStepRect = nextStepEl.getBoundingClientRect();

      var lineHeight = nextStepRect.top - stepRect.bottom;
      if (lineHeight > 0) {
        line.style.height = lineHeight + 'px';
        line.style.display = 'block';
      }
    });
  }

  /* ============================================================
     SCROLL ANIMATION — дэлгэц дээр ирэхэд fade-in
     ============================================================ */
  function initScrollReveal() {
    if (!('IntersectionObserver' in window)) return;

    var targets = document.querySelectorAll('.roadmap-item, .guide-card, .mentor-section');
    targets.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity .45s ease, transform .45s ease';
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    targets.forEach(function (el) { observer.observe(el); });
  }

  /* ============================================================
     SCHOLARSHIP GUIDE OVERLAY
     ============================================================ */
  function initScholarGuide() {
    var overlay  = document.getElementById('scholar-overlay');
    var closeBtn = document.getElementById('scholar-close-btn');
    if (!overlay || !closeBtn) return;

    function open() {
      overlay.classList.add('is-open');
      overlay.setAttribute('aria-hidden', 'false');
      overlay.scrollTop = 0;
      document.body.style.overflow = 'hidden';
    }
    function close() {
      overlay.classList.remove('is-open');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
    closeBtn.addEventListener('click', close);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('is-open')) close();
    });

    // Main guides grid дахь тэтгэлгийн карт
    var card = document.querySelector('.guide-card[data-guide="scholarship"]');
    if (card) card.addEventListener('click', function (e) { e.preventDefault(); open(); });

    // Hub дахь тэтгэлгийн товч
    var hubBtn = document.querySelector('.hg-btn[data-guide="scholarship"]');
    if (hubBtn) hubBtn.addEventListener('click', function () {
      var hub = document.getElementById('hub-overlay');
      if (hub) hub.style.zIndex = '400';
      open();
      closeBtn.addEventListener('click', function r() {
        if (hub) hub.style.zIndex = '';
        closeBtn.removeEventListener('click', r);
      }, { once: true });
    });
  }

  /* ============================================================
     ROADMAP CARD NAVIGATION
     ============================================================ */
  function initRoadmapNav() {
    // guide-ийн overlay id-тай map
    var guideMap = {
      'visa':         'visa-overlay',
      'scholarship':  'scholar-overlay',
      // Удахгүй болох guide-үүд — overlay байхгүй тул үл хийх
      'profile':      null,
      'universities': null,
      'documents':    null,
      'essays':       null,
      'submit':       null,
      'respond':      null
    };

    var cards = document.querySelectorAll('.roadmap-card[data-guide]');
    cards.forEach(function (card) {
      var guide = card.getAttribute('data-guide');
      var overlayId = guideMap[guide];
      if (!overlayId) return; // overlay байхгүй бол дарлага нэмэхгүй

      // Card-д cursor pointer + hover effect нэмэх
      card.style.cursor = 'pointer';

      card.addEventListener('click', function (e) {
        // Accordion товч дарсан бол шилжүүлэхгүй
        if (e.target.closest('.roadmap-arrow')) return;
        var target = document.getElementById(overlayId);
        if (!target) return;
        target.classList.add('is-open');
        target.setAttribute('aria-hidden', 'false');
        target.scrollTop = 0;
        document.body.style.overflow = 'hidden';
      });
    });
  }

  /* ============================================================
     VISA GUIDE DETAIL OVERLAY
     ============================================================ */
  function initVisaGuide() {
    var visaOverlay = document.getElementById('visa-overlay');
    var visaCloseBtn = document.getElementById('visa-close-btn');
    if (!visaOverlay || !visaCloseBtn) return;

    function openVisa() {
      visaOverlay.classList.add('is-open');
      visaOverlay.setAttribute('aria-hidden', 'false');
      visaOverlay.scrollTop = 0;
      document.body.style.overflow = 'hidden';
    }

    function closeVisa() {
      visaOverlay.classList.remove('is-open');
      visaOverlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    visaCloseBtn.addEventListener('click', closeVisa);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && visaOverlay.classList.contains('is-open')) closeVisa();
    });

    // 1. Guide section дахь "Визний Хөтөч" карт
    var mainVisaCard = document.querySelector('.guide-card[data-guide="visa"]');
    if (mainVisaCard) {
      mainVisaCard.addEventListener('click', function (e) {
        e.preventDefault();
        openVisa();
      });
    }

    // 2. Hub overlay дахь "ХӨТӨЧ ҮЗЭХ →" товч
    var hubVisaBtn = document.querySelector('.hg-btn[data-guide="visa"]');
    if (hubVisaBtn) {
      hubVisaBtn.addEventListener('click', function () {
        // Hub-ийг түр нуун visa overlay нээх
        var hubOverlay = document.getElementById('hub-overlay');
        if (hubOverlay) hubOverlay.style.zIndex = '400';
        openVisa();
        // Visa хаахад hub-ийг сэргээх
        visaCloseBtn.addEventListener('click', function restoreHub() {
          if (hubOverlay) hubOverlay.style.zIndex = '';
          visaCloseBtn.removeEventListener('click', restoreHub);
        }, { once: true });
      });
    }
  }

  /* ============================================================
     ALL GUIDES HUB OVERLAY
     ============================================================ */
  function initGuidesHub() {
    var openBtn  = document.getElementById('open-all-guides-btn');
    var overlay  = document.getElementById('hub-overlay');
    var closeBtn = document.getElementById('hub-close-btn');

    if (!openBtn || !overlay || !closeBtn) return;

    function openHub() {
      overlay.classList.add('is-open');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeHub() {
      overlay.classList.remove('is-open');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    openBtn.addEventListener('click', openHub);
    closeBtn.addEventListener('click', closeHub);

    // Overlay-н гадна дарахад хаах
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeHub();
    });

    // ESC товчоор хаах
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('is-open')) closeHub();
    });


  }

  /* ============================================================
     MENTOR BUTTON
     ============================================================ */
  function initMentorBtn() {
    var btn = document.querySelector('.mentor-btn');
    if (!btn) return;
    btn.addEventListener('click', function () {
      // TODO: ментор хайх хуудас руу шилжүүлэх
    });
  }

/* ============================================================
     SOON BADGE — идэвхгүй холбоосын клик хаах
     ============================================================ */
  function initSoonCards() {
    var soonCards = document.querySelectorAll('.guide-card--soon');
    soonCards.forEach(function (card) {
      card.addEventListener('click', function (e) {
        e.preventDefault();
      });
    });
  }

  /* ============================================================
     INIT
     ============================================================ */
  document.addEventListener('DOMContentLoaded', function () {
    initRoadmapAccordion();
    initVisaGuide();
    initScholarGuide();
    initRoadmapNav();
    initGuidesHub();
    initScrollReveal();
    initMentorBtn();
    initSoonCards();

    // Шугамын өндрийг хуудас бүрэн ачаалсны дараа тооцоолох
    window.addEventListener('load', updateRoadmapLines);
    window.addEventListener('resize', updateRoadmapLines);
  });

})();