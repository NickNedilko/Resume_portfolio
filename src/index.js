import debounce from 'lodash.debounce';
const refs = {
  themeBtn: document.querySelector('.change-theme'),
  themeModal: document.querySelector('.modal'),
  fontSize: document.querySelector('.choose-size'),
  fontSizes: document.querySelectorAll('.choose-size span'),
  chooseColor: document.querySelector('.choose-color'),
  chooseColors: document.querySelectorAll('.choose-color span'),
  bgColors: document.querySelector('.choose-bg'),
  bgColor1: document.querySelector('.bg-1'),
  bgColor2: document.querySelector('.bg-2'),
  bgColor3: document.querySelector('.bg-3'),
  root: document.querySelector(':root'),
};

function openModal() {
  refs.themeModal.classList.add('opened');
}

function closeThemeModal(e) {
  if (e.target.className === 'customize-theme') {
    refs.themeModal.classList.remove('opened');
  }
}
refs.themeBtn.addEventListener('click', openModal);
refs.themeModal.addEventListener('click', closeThemeModal);

// ================================Font-Size================================================

refs.fontSize.addEventListener('click', changeFont);

function changeFont(e) {
  removeActiveClass();
  let fontSize;
  if (e.target.className === 'font-size-1') {
    fontSize = '12px';
    document.querySelector('.font-size-1').classList.add('active');
  }
  if (e.target.className === 'font-size-2') {
    fontSize = '14px';
    document.querySelector('.font-size-2').classList.add('active');
  }
  if (e.target.className === 'font-size-3') {
    fontSize = '16px';
    document.querySelector('.font-size-3').classList.add('active');
  }
  if (e.target.className === 'font-size-4') {
    fontSize = '18px';
    document.querySelector('.font-size-4').classList.add('active');
  }
  document.querySelector('html').style.fontSize = fontSize;
}

function removeActiveClass() {
  refs.fontSizes.forEach(size => {
    size.classList.remove('active');
  });
}
// ========================================Choose-color======================================
refs.chooseColor.addEventListener('click', onChooseColorClick);

function onChooseColorClick(e) {
  removeActiveColor();
  console.log(e.target);
  let primaryHue;
  if (e.target.className === 'color-1') {
    primaryHue = 252;
    document.querySelector('.color-1').classList.add('active');
  }
  if (e.target.className === 'color-2') {
    primaryHue = 52;
    document.querySelector('.color-2').classList.add('active');
  }
  if (e.target.className === 'color-3') {
    primaryHue = 352;
    document.querySelector('.color-3').classList.add('active');
  }
  if (e.target.className === 'color-4') {
    primaryHue = 152;
    document.querySelector('.color-4').classList.add('active');
  }
  if (e.target.className === 'color-5') {
    primaryHue = 202;
    document.querySelector('.color-5').classList.add('active');
  }
  refs.root.style.setProperty('--primary-color-hue', primaryHue);
}

function removeActiveColor() {
  refs.chooseColors.forEach(color => {
    color.classList.remove('active');
  });
}
// ====================Theme Background===============

let darkColorLightness;
let lightColorLightness;
let whiteColorLightness;

refs.bgColor1.addEventListener('click', () => {
  darkColorLightness = '17%';
  whiteColorLightness = '92%';
  lightColorLightness = '100%';
  refs.bgColor2.classList.remove('active');
  refs.bgColor3.classList.remove('active');
  refs.bgColor1.classList.add('active');
  onChangeBgColorClick();
});

refs.bgColor2.addEventListener('click', () => {
  darkColorLightness = '95%';
  whiteColorLightness = '20%';
  lightColorLightness = '15%';
  refs.bgColor1.classList.remove('active');
  refs.bgColor3.classList.remove('active');
  refs.bgColor2.classList.add('active');
  onChangeBgColorClick();
});

refs.bgColor3.addEventListener('click', () => {
  darkColorLightness = '95%';
  whiteColorLightness = '20%';
  lightColorLightness = '0%';
  refs.bgColor2.classList.remove('active');
  refs.bgColor1.classList.remove('active');
  refs.bgColor3.classList.add('active');
  onChangeBgColorClick();
});

function onChangeBgColorClick() {
  refs.root.style.setProperty('--light-color-lightness', lightColorLightness);
  refs.root.style.setProperty('--white-color-lightness', whiteColorLightness);
  refs.root.style.setProperty('--dark-color-lightness', darkColorLightness);
}

// =================================Погода============================================
const API_KEY = '2d632050ed6019886ccebb040dfa91ab';
// Geolocation.getCurrentPosition(sucses, error);
let CITY = 'Mariupol';
const refEls = {
  inputEl: document.querySelector('#search-box'),
  divEl: document.querySelector('.city'),
};

refEls.inputEl.addEventListener('input', debounce(onSearchCity, 500));

function onSearchCity(e) {
  CITY = e.target.value;
  weather(CITY);
}

weather(CITY);

function weather(CITY) {
  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${CITY}&limit=5&appid=${API_KEY}`
  )
    .then(response => response.json())
    .then(data => {
      let lat = data[0].lat;
      let lon = data[0].lon;
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      )
        .then(response => response.json())
        .then(data => {
          renderWearher(data);
          console.log(data);
        });
    });
}

function renderWearher(data) {
  const render = `<h3>${data.name}</h3>
  <span>${data.temp}</span>
  <span>${data.temp}</span>
    `;
  refEls.divEl.insertAdjacentHTML('beforeend', render);
}
