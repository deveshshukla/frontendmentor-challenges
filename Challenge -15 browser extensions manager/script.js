'use strict';

//Extension data array
let extensionsArr = [
    {
        "logo": "./assets/images/logo-devlens.svg",
        "name": "DevLens",
        "description": "Quickly inspect page layouts and visualize element boundaries.",
        "isActive": true
    },
    {
        "logo": "./assets/images/logo-style-spy.svg",
        "name": "StyleSpy",
        "description": "Instantly analyze and copy CSS from any webpage element.",
        "isActive": true
    },
    {
        "logo": "./assets/images/logo-speed-boost.svg",
        "name": "SpeedBoost",
        "description": "Optimizes browser resource usage to accelerate page loading.",
        "isActive": false
    },
    {
        "logo": "./assets/images/logo-json-wizard.svg",
        "name": "JSONWizard",
        "description": "Formats, validates, and prettifies JSON responses in-browser.",
        "isActive": true
    },
    {
        "logo": "./assets/images/logo-tab-master-pro.svg",
        "name": "TabMaster Pro",
        "description": "Organizes browser tabs into groups and sessions.",
        "isActive": true
    },
    {
        "logo": "./assets/images/logo-viewport-buddy.svg",
        "name": "ViewportBuddy",
        "description": "Simulates various screen resolutions directly within the browser.",
        "isActive": false
    },
    {
        "logo": "./assets/images/logo-markup-notes.svg",
        "name": "Markup Notes",
        "description": "Enables annotation and notes directly onto webpages for collaborative debugging.",
        "isActive": true
    },
    {
        "logo": "./assets/images/logo-grid-guides.svg",
        "name": "GridGuides",
        "description": "Overlay customizable grids and alignment guides on any webpage.",
        "isActive": false
    },
    {
        "logo": "./assets/images/logo-palette-picker.svg",
        "name": "Palette Picker",
        "description": "Instantly extracts color palettes from any webpage.",
        "isActive": true
    },
    {
        "logo": "./assets/images/logo-link-checker.svg",
        "name": "LinkChecker",
        "description": "Scans and highlights broken links on any page.",
        "isActive": true
    },
    {
        "logo": "./assets/images/logo-dom-snapshot.svg",
        "name": "DOM Snapshot",
        "description": "Capture and export DOM structures quickly.",
        "isActive": false
    },
    {
        "logo": "./assets/images/logo-console-plus.svg",
        "name": "ConsolePlus",
        "description": "Enhanced developer console with advanced filtering and logging.",
        "isActive": true
    }
  ];

//Variables
let themeSwitch = document.querySelector('.themeSwitch');
let btnFilter = document.querySelectorAll('.filter');
let body = document.querySelector('body');

//html card section
let htmlCardContainer = document.querySelector('.cardsContainer');

function printCard(data) {
    let cards = "";

    data.forEach(val => {
        cards += `
        <div class="card">
          <div class="secInfo">
            <img src="${val.logo}" alt="extension icon">
            <div class="secTxt">
              <h2 class="txtH2 txtTheme">${val.name}</h2>
              <h3 class="txtH3 txtDesc">${val.description}</h3>
            </div>
          </div>
          <div class="secBtns">
            <button class="btnRemove txtTheme">Remove</button>
            <label class="switch">
              <input type="checkbox" data-name="${val.name}" ${val.isActive ? 'checked' : ''}>
              <span class="slider round"></span>
            </label>
          </div>
        </div>`;
    });

    htmlCardContainer.innerHTML = cards;
}

//Call one time in starting of pageload.
printCard(extensionsArr);

//Theme Variables
let txtTheme = document.querySelectorAll('.txtTheme');
let txtDesc = document.querySelectorAll('.txtDesc');
let btnRemove = document.querySelectorAll('.btnRemove');
let extCard = document.querySelectorAll('.card');

//Day-Night theme changer
themeSwitch.addEventListener('click', (e) => {
    e.preventDefault();

    if (!body.classList.contains('day')) {
        body.classList.add('day');

        themeSwitch.src = './assets/images/icon-moon.svg';
        themeSwitch.style.backgroundColor = '#aabdd5';

        //Day them: Change heading color
        txtTheme.forEach(txt => {
            txt.style.color = '#11244c';
        });

        //Day them: Change desc color
        txtDesc.forEach(txt => {
            txt.style.color = '#545969';
        });

        //Day them: Change Filter Btns Color
        btnFilter.forEach(filterBtn => {
            filterBtn.style.backgroundColor = '#fbfdfe';
            filterBtn.style.color = '#11244c';
            filterBtn.style.border = '1px solid #11244c';
        });

        //Day theme: Card bg
        extCard.forEach(cards => {
            cards.style.backgroundColor = '#fbfdfe';
            cards.style.boxShadow = '0px 0px 2px #11244c50';
        });

        //Day them: Change btnRemove border color
        btnRemove.forEach(btn => {
            btn.style.border = '1px solid #54596950';
        });

    } else {
        body.classList.remove('day');
        themeSwitch.src = './assets/images/icon-sun.svg';
        themeSwitch.style.backgroundColor = '#49576d';

        //Night them: Change heading color
        txtTheme.forEach(txt => {
            txt.style.color = '#fbfdfe';
        });

        //Night them: Change desc color
        txtDesc.forEach(txt => {
            txt.style.color = '#c7c7c7';
        });

        //Night them: Change Filter Btns Color
        btnFilter.forEach(filterBtn => {
            filterBtn.style.backgroundColor = '#2f364b';
            filterBtn.style.color = '#fbfdfe';
        });

        //Night theme: Card bg
        extCard.forEach(cards => {
            cards.style.backgroundColor = '#212636';
        });

        //Night them: Change btnRemove border color
        btnRemove.forEach(btn => {
            btn.style.border = '1px solid #fbfdfe50';
        });
    }
});

//Filter Buttons
btnFilter.forEach(filterBtn => {
    filterBtn.addEventListener('click', e => {
        e.preventDefault();

        btnFilter.forEach(btn => btn.classList.remove('activeBtn'));
        filterBtn.classList.add('activeBtn');

        const filterType = filterBtn.innerText.toLowerCase();

        if (filterType === 'all') {
            printCard(extensionsArr);
        }

        if (filterType === 'active') {
            const activeExt = extensionsArr.filter(ext => ext.isActive);
            printCard(activeExt);
        }

        if (filterType === 'inactive') {
            const inactiveExt = extensionsArr.filter(ext => !ext.isActive);
            printCard(inactiveExt);
        }
    });
});

// Card Remove Logic
htmlCardContainer.addEventListener('click', e => {
    if (!e.target.classList.contains('btnRemove')) return;

    const targetCard = e.target.closest('.card');
    const extName = targetCard.querySelector('.txtH2').innerText;

    const usrConfirmation = confirm(`${extName} will be removed!`);
    if (!usrConfirmation) return;

    extensionsArr = extensionsArr.filter(ext => ext.name !== extName);

    applyCurrentFilter();
});

// Card state logic (Switch btn -> active/inactive)
htmlCardContainer.addEventListener('change', e => {
    if (e.target.type !== 'checkbox') return;

    const targetCard = e.target.closest('.card');
    const extName = targetCard.querySelector('.txtH2').innerText;

    extensionsArr = extensionsArr.map(ext => {
        if (ext.name === extName) {
            return { ...ext, isActive: e.target.checked };
        }
        return ext;
    });

    applyCurrentFilter();
});

function applyCurrentFilter() {
    const activeFilter = document
        .querySelector('.filter.activeBtn')
        .innerText
        .toLowerCase();

    if (activeFilter === 'all') {
        printCard(extensionsArr);
    }
    if (activeFilter === 'active') {
        printCard(extensionsArr.filter(ext => ext.isActive));
    }
    if (activeFilter === 'inactive') {
        printCard(extensionsArr.filter(ext => !ext.isActive));
    }
}
