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
     MENTOR BUTTON
     ============================================================ */
  function initMentorBtn() {
    var btn = document.querySelector('.mentor-btn');
    if (!btn) return;
    btn.addEventListener('click', function () {
      alert('Ментор хайх хэсэг удахгүй нэмэгдэнэ!');
    });
  }

  /* ============================================================
     CTA BUTTON
     ============================================================ */
  function initCtaBtn() {
    var btn = document.querySelector('.cta-btn');
    if (!btn) return;
    btn.addEventListener('click', function () {
      alert('Бүх хөтөчүүд удахгүй нэмэгдэнэ!');
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
    initScrollReveal();
    initMentorBtn();
    initCtaBtn();
    initSoonCards();

    // Шугамын өндрийг хуудас бүрэн ачаалсны дараа тооцоолох
    window.addEventListener('load', updateRoadmapLines);
    window.addEventListener('resize', updateRoadmapLines);
  });

})();