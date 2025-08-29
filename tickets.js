const menuButton = document.querySelector('.menu-button');
const offScreenMenu = document.querySelector('.off-screen-menu');
let themeButton = document.getElementById('theme-button');
const button = document.querySelector('.button');

function toggleSidebar(event) {
  if (offScreenMenu.classList.contains('active')) {
    hideSidebar();
  }
  else {
    showSidebar();
  }
}
function showSidebar() {
  offScreenMenu.classList.add('active');
  setTimeout(() => {
      document.addEventListener('click', outsideClick);
    }, 10);
  
}
function hideSidebar() {
  offScreenMenu.classList.remove('active');
  document.removeEventListener('click', outsideClick);
}

function outsideClick(event) {
  if (!offScreenMenu.contains(event.target) && !menuButton.contains(event.target)) {
    hideSidebar();
  }
}

menuButton.addEventListener('click', toggleSidebar);

const toggleLightMode = () => {
  const lightMode = document.body.classList.toggle('light-mode');
  if (lightMode) {
    themeButton.textContent = 'Dark Mode';
  }
  else {
    themeButton.textContent = 'Light Mode';
  }
};
themeButton.addEventListener('click', toggleLightMode);
button.addEventListener('click', () => {
  window.location.href = 'https://www.floridasupercon.com/en-us/buy/tickets.html';
});