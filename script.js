'use strict';

// Change CSS document between Dark Mode and Light Mode.
const modeToggle = document.querySelector('#mainNav li:nth-child(4) a.navButton');
const modeToggleTwo = document.querySelector('#mobile-nav li:nth-child(4) a.navButton');
modeToggle.addEventListener('click', changeCSSMode);
modeToggleTwo.addEventListener('click', changeCSSMode);

function changeCSSMode() {
  const viewModeLink = document.querySelector('link');
  const linkHref = viewModeLink.getAttribute('href');
  if (linkHref === 'styles/style-dark.css') {
    viewModeLink.setAttribute('href', 'styles/style-light.css');
    localStorage.setItem('mode', 'light');
  } else if (linkHref === 'styles/style-light.css') {
    viewModeLink.setAttribute('href', 'styles/style-dark.css');
    localStorage.setItem('mode', 'dark');
  }
}

/*
* Attribution: https://stackoverflow.com/questions/72662122/
* can-not-set-current-light-dark-mode-into-local-storage */
// On page load, check if mode was previously set and load it
window.addEventListener('load', loadTheme());

function loadTheme() {
  const savedMode = localStorage.getItem('mode');
  const viewModeLink = document.querySelector('link');
  if (savedMode) {
    if (savedMode === 'dark') {
      viewModeLink.setAttribute('href', 'styles/style-dark.css');
    } else if (savedMode === 'light') {
      viewModeLink.setAttribute('href', 'styles/style-light.css');
    }
  }
}

// Hamgburger Menu For mobile
const menuButton = document.querySelector('.hamburger');
const changeToX = document.querySelector('#close');
const changeToMenu = document.querySelector('#menue');
const menuList = document.querySelector('#mobile-nav');
menuButton.addEventListener('click', buttonInteraction);

// Changes hamburger menu button styling
function buttonInteraction() {
  if (changeToMenu.style.display === 'none') {
    changeToMenu.style.display = 'inline';
    changeToX.style.display = 'none';
    menuList.style.display = 'none';
  } else {
    changeToMenu.style.display = 'none';
    changeToX.style.display = 'inline';
    menuList.style.display = 'flex';
  }
}
//Map page changing pictures
const buttonSplitForward = document.getElementById('splitForward');
const buttonSplitPrev = document.getElementById('splitPrev');
const buttonHavenForward = document.getElementById('havenForward');
const buttonHavenPrev = document.getElementById('havenPrev');
const buttonBindForward = document.getElementById('bindForward');
const buttonBindPrev = document.getElementById('bindPrev');

buttonSplitForward.addEventListener('click', showMapSplit);
buttonSplitPrev.addEventListener('click', showMapSplit);
buttonHavenForward.addEventListener('click', showMapHaven);
buttonHavenPrev.addEventListener('click', showMapHaven);
buttonBindForward.addEventListener('click', showMapBind);
buttonBindPrev.addEventListener('click', showMapBind);

function showMapSplit() {
  const splitMap = document.querySelector('#split');
  if (splitMap.src.endsWith('split.png')) {
    splitMap.src = 'assets/L-assets/maps/split_mid.jpg';
  } else if (splitMap.src.endsWith('split_mid.jpg')) {
    splitMap.src = 'assets/L-assets/maps/split.png';
  }
}
function showMapHaven() {
  const havenMap = document.querySelector('#haven');
  if (havenMap.src.includes('heaven.png')) {
    havenMap.src = 'assets/L-assets/maps/haven_A_site.jpeg';
  } else if (havenMap.src.includes('haven_A_site.jpeg')) {
    havenMap.src = 'assets/L-assets/maps/heaven.png';
  }
}
function showMapBind() {
  const bindMap = document.querySelector('#bind');
  if (bindMap.src.includes('bind.png')) {
    bindMap.src = 'assets/L-assets/maps/bind_b_long.jpg';
  } else if (bindMap.src.includes('bind_b_long.jpg')) {
    bindMap.src = 'assets/L-assets/maps/bind.png';
  }
}



