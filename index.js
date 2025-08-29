const menuButton = document.querySelector('.menu-button');
const offScreenMenu = document.querySelector('.off-screen-menu');
let themeButton = document.getElementById('theme-button');
const signUpButton = document.getElementById('sign-up-button');
let count = 3
const closeButton = document.getElementById('close-button');
const signedUpEmails = new Set();
let modal = document.querySelector('.modal');
let animationInterval;
let countdownInterval;

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

const addParticipant = (event, person) => {
  const d = new Date();

  let newText = document.createElement('p')
  newText.innerHTML = `<span style="font-weight: 500;">${person.firstName}</span> subscribed on ${d.toLocaleString()}`;
  document.querySelector('.sign-up-participants').appendChild(newText);

  let participantCount = document.getElementById('sign-up-count');
  count += 1
  participantCount.textContent = count + " people are subscribed to the newsletter";

  event.preventDefault();
};

const validateForm = () => {
  let containsErrors = false;
  let emailError = false;
  let signUpInputs = document.getElementById('sign-up-form').elements;
  let confirmation = document.getElementById('confirmation');
  let confirmationMsg = '';

  let person = {
    firstName: signUpInputs[0].value,
    lastName: signUpInputs[1].value,
    email: signUpInputs[2].value
  };

  let emailField = document.getElementById('email');

  let email = person.email.trim();
  if (email.length >= 1 && (!email.includes('.com') || !email.includes('@'))) {
    emailError = true;
    emailField.setAttribute('class', 'error');
    if (!confirmationMsg) {
      confirmationMsg = 'An invalid email was entered.';
    }
  } 
  else {
    emailField.removeAttribute('class', 'error');
  }
  
  for (let i = 0; i < signUpInputs.length; i++) {
    if (signUpInputs[i].value.trim().length < 2 || (i == 2 && emailError)) {
      containsErrors = true;
      signUpInputs[i].setAttribute('class', 'error');
    }
    else {
      signUpInputs[i].removeAttribute('class');
    }
  }
  
  if (signedUpEmails.has(person.email) && !containsErrors) {
    confirmation.textContent = 'You already signed up!';
    return;
  }

  if (containsErrors) {
    if (!confirmationMsg) {
      confirmationMsg = 'You have missing fields.'
    }
    confirmation.textContent = confirmationMsg;
  }
  if (!containsErrors) {
    addParticipant(event, person)
    toggleModal(person)
    signedUpEmails.add(person.email);
    for (let i = 0; i < signUpInputs.length; i++) {
      signUpInputs[i].value = '';
    }
    confirmation.textContent = '';
  }
};
signUpButton.addEventListener('click', validateForm);

const liveValidate = () => {
  var signUpInputs = document.getElementById("sign-up-form").elements;
  for (let i = 0; i < signUpInputs.length; i++) {
    signUpInputs[i].addEventListener('input', function () {
      if (this.value.length >= 2) {
        this.removeAttribute('class')
      }
    })
  }
}
liveValidate()

const toggleModal = (person) => {
    let modalContent = document.getElementById('modal-content');
    let countdownTimer = document.getElementById('countdown-timer');
    
    modal.style.display = "flex";
    modalContent.textContent = `Thanks ${person.firstName}, you've successfully subscribed to Supercon's newsletter!`;

    animationInterval = setInterval(animateImage, 2000);
    
    let count = 15;
    countdownTimer.textContent = `Closing in ${count}...`;
    countdownInterval = setInterval(() => {
      count--;
      countdownTimer.textContent = `Closing in ${count}...`;

      if (count <= 0) {
        clearInterval(countdownInterval);
        clearInterval(animationInterval);
        modal.style.display = "none";
      }
    }, 1000);
}

const closeModal = (event) => {
  clearInterval(countdownInterval);
  clearInterval(animationInterval);
  modal.style.display = "none"
}

closeButton.addEventListener('click', closeModal);

let image = document.getElementById('gator');
const animateImage = (event) => {
  image.classList.add('pulse');
  setTimeout(() => image.classList.remove('pulse'), 1000);
}
