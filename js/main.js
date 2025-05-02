const elsSitenavLink = document.querySelectorAll('.sitenav__link');
// const elsSitenavItem = document.querySelectorAll('.sitenav__item'); // Bu o'zgaruvchi kerak emas, shuning uchun olib tashladim


// Barcha navigatsiya linklarini tanlab olamiz

// Tanlab olingan har bir link uchun sikl (loop) orqali o'tamiz
elsSitenavLink.forEach(link => {
  // Har bir linkga 'click' hodisasi tinglovchisini (event listener) qo'shamiz
  link.addEventListener('click', function(event) {

    // Oldingi faol (active) elementni *hozirda* topish va klassini olib tashlash
    // (Agar navigatsiyada faqat bitta element faol bo'lishi kerak bo'lsa)
    const currentActiveItem = document.querySelector('.sitenav__item--active'); // <--- Mana bu qator event listener ichiga ko'chirildi
    if (currentActiveItem) {
      currentActiveItem.classList.remove('sitenav__item--active');
    }

    // Bosilgan linkning ota elementini (ya'ni, <li> elementini) topamiz
    const parentItem = event.target.parentElement;

    // Ota elementga 'sitenav__item--active' klassini qo'shamiz
    // Qo'shimcha tekshiruv: ota element bor va u .sitenav__item klassiga ega ekanligini tekshirish
    if (parentItem && parentItem.classList.contains('sitenav__item')) {
      parentItem.classList.add('sitenav__item--active');
    }

    // Linkning standart harakatini (sahifani yangilash/o'tish) to'xtatish
    // Agar sahifani yangilash kerak bo'lmasa, bu qatorni qo'shishingiz mumkin.
    // event.preventDefault();
  });
});


/* if (elSitenavLink) {
  elSitenavLink.addEventListener('click', function () {
    elSitenavItem.classList.add('sitenav__item--active')
  });
} */

/*  elSitenavLink.addEventListener('click', function () {
    elSitenavItem.classList.add('sitenav__item--active')
  }); */


/* if (elSitenavLink) {
  elSitenavLink.addEventListener('click', function () {
    // elSitenavItem ning mavjudligini tekshirish
    if (elSitenavItem) {
      elSitenavItem.classList.add('sitenav__item--active');
    } else {
      console.error("elSitenavItem elementi topilmadi!"); // Xatolikni xabardor qilish (ixtiyoriy)
    }
  });
} */


/* if (elSiteHeaderSitenavToggler) {
  elSiteHeaderSitenavToggler.addEventListener('click', function () {
    elSiteHeader.classList.toggle(modifiers.siteHeaderOpen)
  });
} */

  document.addEventListener('DOMContentLoaded', function() {
    // Kerakli elementlarni tanlab olamiz
    const tabLinks = document.querySelectorAll('.js-tab-link'); // Barcha tab linklari
    const tabItems = document.querySelectorAll('.tabs__item'); // Barcha tab ro'yxati elementlari (li)
    const tabPanels = document.querySelectorAll('.tabpanels__item'); // Barcha tab panel kontentlari

    // Har bir tab link uchun click hodisasi tinglovchisini qo'shamiz
    tabLinks.forEach(link => {
      link.addEventListener('click', function(event) {
        // Link bosilganda sahifani tepaga sakratish yoki o'tishni to'xtatamiz
        event.preventDefault();

        // Bosilgan linkning href atributidan maqsad panel ID sini olamiz (masalan: "#moon")
        const targetPanelSelector = event.target.getAttribute('href'); // '#moon'

        // --- Hozirgi faol elementlardagi 'active' klasslarini olib tashlash ---

        // Hamma tab itemlaridan 'tabs__item--active' klassini olib tashlaymiz
        tabItems.forEach(item => {
          item.classList.remove('tabs__item--active');
        });

        // Hamma tab panellaridan 'tabpanels__item--active' klassini olib tashlaymiz
        tabPanels.forEach(panel => {
          panel.classList.remove('tabpanels__item--active');
        });

        // --- Bosilgan link va unga mos keladigan panelni faol qilish ---

        // Bosilgan linkning ota elementi (<li>) ga 'tabs__item--active' klassini qo'shamiz
        const clickedTabItem = event.target.parentElement;
        if (clickedTabItem) {
          clickedTabItem.classList.add('tabs__item--active');
        }

        // href atributidan olingan selector (masalan, '#moon') yordamida maqsad panelni topamiz
        const targetPanel = document.querySelector(targetPanelSelector);
        // Topilgan panelga 'tabpanels__item--active' klassini qo'shamiz
        if (targetPanel) {
          targetPanel.classList.add('tabpanels__item--active');
        }
      });
    });

    // --- Sahifa birinchi marta yuklanganda boshlang'ich faol panelni ko'rsatish ---
    // HTML-ingizda birinchi tab ('#moon') allaqachon 'active' qilingan.
    // Lekin JavaScript orqali buni tekshirib, mos panelni ko'rsatish yaxshi amaliyot:

    const initialActiveTabItem = document.querySelector('.tabs__item--active');
    if (initialActiveTabItem) {
        const initialActiveLink = initialActiveTabItem.querySelector('.js-tab-link');
        if (initialActiveLink) {
            const initialPanelSelector = initialActiveLink.getAttribute('href');
            const initialPanel = document.querySelector(initialPanelSelector);
            if (initialPanel) {
                // Barcha panellardan 'active' klassini olib tashlaymiz (ehtiyot shart)
                tabPanels.forEach(panel => {
                   panel.classList.remove('tabpanels__item--active');
                });
                // Boshlang'ich faol panelga 'active' klassini qo'shamiz
                initialPanel.classList.add('tabpanels__item--active');
            }
        }
    }
  });