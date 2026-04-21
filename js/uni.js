document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById("uniModal");
    const closeBtn = document.querySelector(".close-modal");
    const filterBtn = document.querySelector(".uni-filter-btn");
    const filterPanel = document.getElementById("filterPanel");

    // --- 1. ШҮҮЛТҮҮР (FILTER) НЭЭХ ХААХ ---
    if (filterBtn && filterPanel) {
        filterBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Click-ийг гадагш алдахгүй байх
            filterPanel.classList.toggle('active');
            
            // Заавар: CSS дээр .filter-panel.active { display: block !important; } нэмэх хэрэгтэй
        });
    }

    // --- 2. МОДАЛ НЭЭХ ---
    document.querySelectorAll('.uni-card').forEach(card => {
        card.addEventListener('click', (e) => {
            // Хэрэв зүрхэн дээр дарвал модал нээхгүй
            if (e.target.closest('.heart-btn') || e.target.closest('.save-btn')) return;
            
            if (modal) modal.style.display = "block";
        });
    });

    // --- 3. МОДАЛ ХААХ ---
    if (closeBtn) {
        closeBtn.onclick = () => { modal.style.display = "none"; };
    }

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
        // Шүүлтүүрийн гадна дарвал хаах (сонголттой)
        if (filterPanel && !filterPanel.contains(event.target) && event.target !== filterBtn) {
            filterPanel.classList.remove('active');
        }
    });

    // --- 4. ХАДГАЛАХ ТОВЧЛУУР (ЗҮРХ) ---
    document.addEventListener('click', (e) => {
    const saveBtn = e.target.closest('.save-btn');
    
        if (saveBtn) {
            saveBtn.classList.toggle('active');
            
            // Зүрх болон текстийг солих логик
            const icon = saveBtn.querySelector('i');
            const text = saveBtn.querySelector('span');

            if (saveBtn.classList.contains('active')) {
                icon.classList.replace('fa-regular', 'fa-solid'); 
                text.textContent = "ХАДГАЛАГДСАН"; 
            } else {
                icon.classList.replace('fa-solid', 'fa-regular'); 
                text.textContent = "ХАДГАЛАХ";
            }
        }
    });
});