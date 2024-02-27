'use strict';
//change the appearence of radio images
const checkedAnswer1 = document.querySelector('#option1');
const checkedAnswer2 = document.querySelector('#option2');
const checkedAnswer3 = document.querySelector('#option3');

const radioOptionOne = document.querySelectorAll('.radioImg')[0];
radioOptionOne.style.opacity = 0.6;
radioOptionOne.addEventListener('mouseover', imgInteractionSova);
radioOptionOne.addEventListener('mouseout', imgToDefaultSova);
radioOptionOne.addEventListener('click', selectedImageSova);
const radioOptionTwo = document.querySelectorAll('.radioImg')[1];
radioOptionTwo.style.opacity = 0.6;
radioOptionTwo.addEventListener('mouseover', imgInteractionViper);
radioOptionTwo.addEventListener('mouseout', imgToDefaultViper);
radioOptionTwo.addEventListener('click', selectedImageViper);
const radioOptionThree = document.querySelectorAll('.radioImg')[2];
radioOptionThree.style.opacity = 0.6;
radioOptionThree.addEventListener('mouseover', imgInteractionKilljoy);
radioOptionThree.addEventListener('mouseout', imgToDefaultKilljoy);
radioOptionThree.addEventListener('click', selectedImageKilljoy);

function imgInteractionSova() {
  radioOptionOne.style.paddingBottom = '40px';
  radioOptionOne.style.paddingTop = '0';
}
function imgInteractionViper() {
  radioOptionTwo.style.paddingBottom = '40px';
  radioOptionTwo.style.paddingTop = '0';
}
function imgInteractionKilljoy() {
  radioOptionThree.style.paddingBottom = '40px';
  radioOptionThree.style.paddingTop = '0';
}
function imgToDefaultSova() {
  radioOptionOne.style.paddingBottom = '20px';
  radioOptionOne.style.paddingTop = '20px';
}
function imgToDefaultViper() {
  radioOptionTwo.style.paddingBottom = '20px';
  radioOptionTwo.style.paddingTop = '20px';
}
function imgToDefaultKilljoy() {
  radioOptionThree.style.paddingBottom = '20px';
  radioOptionThree.style.paddingTop = '20px';
}
function selectedImageSova() {
  checkedAnswer1.checked = true;
  radioOptionOne.style.opacity = '1';
  radioOptionTwo.style.opacity = '0.6';
  radioOptionThree.style.opacity = '0.6';

}
function selectedImageViper() {
  checkedAnswer2.checked = true;
  radioOptionTwo.style.opacity = '1';
  radioOptionOne.style.opacity = '0.6';
  radioOptionThree.style.opacity = '0.6';
}
function selectedImageKilljoy() {
  checkedAnswer3.checked = true;
  radioOptionThree.style.opacity = '1';
  radioOptionTwo.style.opacity = '0.6';
  radioOptionOne.style.opacity = '0.6';
}

//Check the right answers

const quizFieldset = document.querySelector('.lessysQuiz');
const quizLegend = quizFieldset.querySelector('legend');
const displayResultH2 = document.getElementById('resultQuiz');
const nextQuestion = document.querySelector('.checkAgent');
nextQuestion.addEventListener('click', showNextQuestion);
let correctAnswers = 0;



const quizButton = document.querySelector('.checkAgent');
// quizButton.addEventListener('click', quizAnswer(correctAnswers));


function appearanceOfQuiz() {
  if (checkedAnswer1.checked || checkedAnswer2.checked || checkedAnswer3.checked) {
    if (quizLegend.innerText === 'Who is from Russia?') {
      quizLegend.innerText = 'Who the 4th Agent to join the PROTOCOL?';
    } else if (quizLegend.innerText === 'Who the 4th Agent to join the PROTOCOL?') {
      quizLegend.innerText = 'Who can use mollies?';
    } else if (quizLegend.innerText === 'Who can use mollies?') {
      quizLegend.innerText = 'What map has teleports?';
      radioOptionOne.src = 'assets/L-assets/maps/bind_b_long.jpg';
      radioOptionOne.style.maxHeight = '30vh';
      radioOptionTwo.src = 'assets/L-assets/maps/haven_A_site.jpeg';
      radioOptionTwo.style.maxHeight = '30vh';
      radioOptionThree.src = 'assets/L-assets/maps/split_mid.jpg';
      radioOptionThree.style.maxHeight = '30vh';
    } else if (quizLegend.innerText === 'What map has teleports?') {
      quizLegend.innerText = 'What map has 3 sites?';
    } else if (quizLegend.innerText === 'What map has 3 sites?') {
      quizLegend.innerText = 'What map has mid?';
    } else if (quizLegend.innerText === 'What map has mid?') {
      quizLegend.innerText = 'What ult can kill an enemy?';
      radioOptionOne.src = 'assets/L-assets/sova/sova_ult_orange.png';
      radioOptionOne.style.maxHeight = '10vh';
      radioOptionTwo.src = 'assets/L-assets/viper/viper_ult_orange.png';
      radioOptionTwo.style.maxHeight = '10vh';
      radioOptionThree.src = 'assets/L-assets/kj/nade_orange.png';
      radioOptionThree.style.maxHeight = '10vh';
    } else if (quizLegend.innerText === 'What ult can kill an enemy?') {
      quizLegend.innerText = 'What ability can damage an enemy?';
      radioOptionOne.src = 'assets/L-assets/sova/scan_orange.png';
      radioOptionTwo.src = 'assets/L-assets/viper/molly_orange.png';
      radioOptionThree.src = 'assets/L-assets/kj/kj_ult_orange.png';
    } else if (quizLegend.innerText === 'What ability can damage an enemy?') {
      quizLegend.innerText = 'What ability can scan?';
      radioOptionOne.src = 'assets/L-assets/sova/drone_orange.png';
      radioOptionTwo.src = 'assets/L-assets/viper/wall_orange.png';
      radioOptionThree.src = 'assets/L-assets/kj/turret_orange.png';
    } else if (quizLegend.innerText === 'What ability can scan?') {
      quizLegend.innerText = 'What ability applies Vulnerable effect?';
      radioOptionOne.src = 'assets/L-assets/sova/shock_orange.png';
      radioOptionTwo.src = 'assets/L-assets/viper/smoke_orange.png';
      radioOptionThree.src = 'assets/L-assets/kj/bot_orange.png';
    } else if (quizLegend.innerText === 'What ability applies Vulnerable effect?') {
      radioOptionOne.src = 'assets/L-assets/sova/sova_ult_orange.png';
      radioOptionTwo.src = 'assets/L-assets/viper/molly_orange.png';
      radioOptionThree.src = 'assets/L-assets/viper/viper_ult_orange.png';
      quizButton.innerText = 'Check Result';
      youResult();
    }
    radioOptionTwo.style.opacity = '0.6';
    radioOptionOne.style.opacity = '0.6';
    radioOptionThree.style.opacity = '0.6';
  }
}
function showNextQuestion() {
  if (quizLegend.innerText === 'Who is from Russia?' && checkedAnswer1.checked) {
    correctAnswers++;
  } else if (quizLegend.innerText === 'Who the 4th Agent to join the PROTOCOL?'
    && checkedAnswer3.checked) {
    correctAnswers++;
  } else if (quizLegend.innerText === 'Who can use mollies?'
    && checkedAnswer2.checked) {
    correctAnswers++;
  } else if (quizLegend.innerText === 'What map has teleports?'
    && checkedAnswer1.checked) {
    correctAnswers++;
  } else if (quizLegend.innerText === 'What map has 3 sites?'
    && checkedAnswer2.checked) {
    correctAnswers++;
  } else if (quizLegend.innerText === 'What map has mid?'
    && checkedAnswer3.checked) {
    correctAnswers++;
  } else if (quizLegend.innerText === 'What ult can kill an enemy?'
    && checkedAnswer1.checked) {
    correctAnswers++;
  } else if (quizLegend.innerText === 'What ability can damage an enemy?'
    && checkedAnswer2.checked) {
    correctAnswers++;
  } else if (quizLegend.innerText === 'What ability can scan?'
    && checkedAnswer1.checked) {
    correctAnswers++;
  } else if (quizLegend.innerText === 'What ability applies Vulnerable effect?'
    && checkedAnswer3.checked) {
    correctAnswers++;
  }
  appearanceOfQuiz();
}
function youResult() {
  if (quizButton.innerText === 'Check Result') {
    quizFieldset.style.display = 'none';
    quizButton.style.display = 'none';
    displayResultH2.innerText = 'You got ' + correctAnswers + '/10 correct answer(s)!';
  }
}