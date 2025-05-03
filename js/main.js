
/* SITENAV */

// Barcha navigatsiya havolalarini (<a> teglarini) topamiz
const navLinks = document.querySelectorAll('.sitenav__link');

// Hozirda aktiv bo'lgan `<li>` elementini topish uchun funksiya
function findActiveItem() {
    return document.querySelector('.sitenav__item--active');
}

// Har bir havola uchun hodisa tinglovchisini qo'shamiz
navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        // Agar havola bosilganda sahifa yangilanishini xohlamasangiz,
        // quyidagi qatorni kommentdan chiqarishingiz kerak bo'ladi.
        // Bu odatda bir sahifali ilovalar (SPA) uchun kerak.
        // event.preventDefault();

        // Hozirda aktiv bo'lgan bandni topamiz
        const currentActiveItem = findActiveItem();

        // Bosilgan havola tegining ota-ona `<li>` elementini topamiz
        // 'this' bu yerda bosilgan `<a>` elementiga ishora qiladi
        const clickedListItem = this.closest('.sitenav__item'); // .parentElement ham ishlaydi, lekin .closest robustroq

        // Agar joriy aktiv band mavjud bo'lsa va u bosilgan band bilan bir xil bo'lmasa
        if (currentActiveItem && currentActiveItem !== clickedListItem) {
            // Undan 'active' klassini olib tashlaymiz
            currentActiveItem.classList.remove('sitenav__item--active');
        }

        // Agar bosilgan `<li>` topilgan bo'lsa (ehtimollik uchun tekshiruv)
        // va u hali aktiv bo'lmasa (takroriy qo'shishni oldini olish)
        if (clickedListItem && !clickedListItem.classList.contains('sitenav__item--active')) {
             // Bosilgan havola tegining ota-ona `<li>` elementiga 'active' klassini qo'shamiz
            clickedListItem.classList.add('sitenav__item--active');
        }

        // Agar event.preventDefault() ishlatilgan bo'lsa va siz baribir
        // navigatsiyani amalga oshirmoqchi bo'lsangiz (masalan, kichik kechikish bilan):
        // setTimeout(() => {
        //     window.location.href = this.href;
        // }, 100); // 100 millisekunddan keyin o'tish
    });
});

// Sahifa yuklanganda URL ga mos keladigan bandni aktiv qilish (qo'shimcha funksiya)
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop(); // Joriy fayl nomi (masalan, 'crew.html')
    if (currentPage) {
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href').split('/').pop();
            if (linkPage === currentPage) {
                const currentActiveItem = findActiveItem();
                if (currentActiveItem) {
                    currentActiveItem.classList.remove('sitenav__item--active');
                }
                link.closest('.sitenav__item').classList.add('sitenav__item--active');
            }
        });
    }
    // Agar bosh sahifa uchun maxsus belgi bo'lsa (masalan, index.html yoki bo'sh)
    else if (window.location.pathname === '/' || currentPage === 'index.html' || currentPage === '') {
        const currentActiveItem = findActiveItem();
        if (currentActiveItem) {
            currentActiveItem.classList.remove('sitenav__item--active');
        }
         // Home linkini topib aktiv qilish
        const homeLink = document.querySelector('.sitenav__link[href="index.html"]');
        if (homeLink) {
            homeLink.closest('.sitenav__item').classList.add('sitenav__item--active');
        }
    }
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



  /* DESTINATION-TABS */
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



  /* CREW */

  document.addEventListener('DOMContentLoaded', function() {
    // Kerakli ekipaj elementlarini tanlab olamiz
    const crewTabLinks = document.querySelectorAll('.js-crew-tab-link'); // Barcha ekipaj tab linklari
    const crewTabItems = document.querySelectorAll('.crew-tabs__item'); // Barcha ekipaj tab ro'yxati elementlari (li)
    const crewTabPanels = document.querySelectorAll('.crew-tabpanels__item'); // Barcha ekipaj tab panel kontentlari

    // Har bir ekipaj tab link uchun click hodisasi tinglovchisini qo'shamiz
    crewTabLinks.forEach(link => {
      link.addEventListener('click', function(event) {
        // Link bosilganda sahifani tepaga sakratish yoki o'tishni to'xtatamiz
        event.preventDefault();

        // Bosilgan linkning href atributidan maqsad ekipaj panel ID sini olamiz (masalan: "#commander")
        const targetPanelSelector = event.target.getAttribute('href');

        // --- Hozirgi faol ekipaj elementlaridagi 'active' klasslarini olib tashlash ---

        // Hamma ekipaj tab itemlaridan 'crew-tabs__item--active' klassini olib tashlaymiz
        crewTabItems.forEach(item => {
          item.classList.remove('crew-tabs__item--active');
        });

        // Hamma ekipaj tab panellaridan 'crew-tabpanels__item--active' klassini olib tashlaymiz
        crewTabPanels.forEach(panel => {
          panel.classList.remove('crew-tabpanels__item--active');
        });

        // --- Bosilgan link va unga mos keladigan ekipaj panelini faol qilish ---

        // Bosilgan linkning ota elementi (<li>) ga 'crew-tabs__item--active' klassini qo'shamiz
        const clickedTabItem = event.target.parentElement;
        if (clickedTabItem) {
          clickedTabItem.classList.add('crew-tabs__item--active');
        }

        // href atributidan olingan selector (masalan, '#commander') yordamida maqsad ekipaj panelini topamiz
        const targetPanel = document.querySelector(targetPanelSelector);
        // Topilgan panelga 'crew-tabpanels__item--active' klassini qo'shamiz
        if (targetPanel) {
          targetPanel.classList.add('crew-tabpanels__item--active');
        }
      });
    });

      // --- Sahifa birinchi marta yuklanganda boshlang'ich faol ekipaj panelini ko'rsatish ---
      // HTML-ingizda birinchi ekipaj tab ('#commander') allaqachon 'active' qilingan.
      // Lekin JavaScript orqali buni tekshirib, mos panelni ko'rsatish yaxshi amaliyot:
      const initialActiveCrewTabItem = document.querySelector('.crew-tabs__item--active');
      if (initialActiveCrewTabItem) {
          const initialActiveCrewLink = initialActiveCrewTabItem.querySelector('.js-crew-tab-link');
          if (initialActiveCrewLink) {
              const initialCrewPanelSelector = initialActiveCrewLink.getAttribute('href');
              const initialCrewPanel = document.querySelector(initialCrewPanelSelector);
              if (initialCrewPanel) {
                  // Barcha ekipaj panellaridan 'active' klassini olib tashlaymiz (ehtiyot shart)
                  crewTabPanels.forEach(panel => {
                    panel.classList.remove('crew-tabpanels__item--active');
                  });
                  // Boshlang'ich faol ekipaj paneliga 'active' klassini qo'shamiz
                  initialCrewPanel.classList.add('crew-tabpanels__item--active');
              }
          }
      }
  });


  /* TECHNOLOGY */

  document.addEventListener('DOMContentLoaded', function() {
    // Kerakli texnologiya elementlarini tanlab olamiz
    const techTabLinks = document.querySelectorAll('.js-technology-tab-link'); // Barcha texnologiya tab linklari
    const techTabItems = document.querySelectorAll('.technology-tabs__item'); // Barcha texnologiya tab ro'yxati elementlari (li)
    const techTabPanels = document.querySelectorAll('.technology-tabpanels__item'); // Barcha texnologiya tab panel kontentlari

    // Har bir texnologiya tab link uchun click hodisasi tinglovchisini qo'shamiz
    techTabLinks.forEach(link => {
      link.addEventListener('click', function(event) {
        // Link bosilganda sahifani tepaga sakratish yoki o'tishni to'xtatamiz
        event.preventDefault();

        // Bosilgan linkning href atributidan maqsad texnologiya panel ID sini olamiz (masalan: "#launch-vehicle")
        const targetPanelSelector = event.target.getAttribute('href');

        // --- Hozirgi faol texnologiya elementlaridagi 'active' klasslarini olib tashlash ---

        // Hamma texnologiya tab itemlaridan 'technology-tabs__item--active' klassini olib tashlaymiz
        techTabItems.forEach(item => {
          item.classList.remove('technology-tabs__item--active');
        });

        // Hamma texnologiya tab panellaridan 'technology-tabpanels__item--active' klassini olib tashlaymiz
        techTabPanels.forEach(panel => {
          panel.classList.remove('technology-tabpanels__item--active');
        });

        // --- Bosilgan link va unga mos keladigan texnologiya panelini faol qilish ---

        // Bosilgan linkning ota elementi (<li>) ga 'technology-tabs__item--active' klassini qo'shamiz
        const clickedTabItem = event.target.parentElement;
        if (clickedTabItem) {
          clickedTabItem.classList.add('technology-tabs__item--active');
        }

        // href atributidan olingan selector (masalan, '#launch-vehicle') yordamida maqsad texnologiya panelini topamiz
        const targetPanel = document.querySelector(targetPanelSelector);
        // Topilgan panelga 'technology-tabpanels__item--active' klassini qo'shamiz
        if (targetPanel) {
          targetPanel.classList.add('technology-tabpanels__item--active');
        }
      });
    });

      // --- Sahifa birinchi marta yuklanganda boshlang'ich faol texnologiya panelini ko'rsatish ---
      // HTML-ingizda birinchi texnologiya tab ('#launch-vehicle') allaqachon 'active' qilingan.
      // Lekin JavaScript orqali buni tekshirib, mos panelni ko'rsatish yaxshi amaliyot:
      const initialActiveTechTabItem = document.querySelector('.technology-tabs__item--active');
      if (initialActiveTechTabItem) {
          const initialActiveTechLink = initialActiveTechTabItem.querySelector('.js-technology-tab-link');
          if (initialActiveTechLink) {
              const initialPanelSelector = initialActiveTechLink.getAttribute('href');
              const initialPanel = document.querySelector(initialPanelSelector);
              if (initialPanel) {
                  // Barcha texnologiya panellaridan 'active' klassini olib tashlaymiz (ehtiyot shart)
                  techTabPanels.forEach(panel => {
                    panel.classList.remove('technology-tabpanels__item--active');
                  });
                  // Boshlang'ich faol texnologiya paneliga 'active' klassini qo'shamiz
                  initialPanel.classList.add('technology-tabpanels__item--active');
              }
          }
      }
  });