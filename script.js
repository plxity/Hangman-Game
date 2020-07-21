const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainButton = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const figureParts = document.querySelectorAll('.figure-part');

const words = ['application','programming', 'interface', 'wizard'];

// Math.random() given float value between 0 and 1
var seletctedWord = words[Math.floor(Math.random()* words.length)];

const correctLetter = [];
const wrongLetter = [];

// Show Hidden Word
function displayWord(){
    wordEl.innerHTML = `
    ${seletctedWord.split('').map(letter => {return (`<span class="letters">${correctLetter.includes(letter)?  letter : ''}</span>`)}).join('')}`
    const innerWord = wordEl.innerText.replace(/\n/g,'');
    if(innerWord === seletctedWord){
        finalMessage.innerText = 'Congratulation! You won! '
        popup.style.display = 'flex';
    }
}
var checkWrong  = 0
function updateWrongLetterEl(){
   wrongLettersEl.innerHTML = `${wrongLetter.length>0?'<p>Wrong</p>': ''}
   ${ wrongLetter.map(wrongWord=>{
    return (`<span>${wrongWord}</span>`)
    })}`
    if(wrongLetter.length == figureParts.length){
        window.removeEventListener('keydown',typeWords,false);
        finalMessage.innerHTML = 'You Lost!'
        popup.style.display = 'flex';
    }
    else{
        figureParts[checkWrong].style.display= 'block';
        checkWrong++;
    }
    
}
function showNotification(){
    notification.classList.add('show');
    setTimeout(()=>{
        notification.classList.remove('show');
    },2000)
}
// Key Down letter press;
 function typeWords (e){
    if(e.keyCode>=65 && e.keyCode<=90){
        const letter = e.key;
        if(seletctedWord.includes(letter)){
            if(!correctLetter.includes(letter)){
                correctLetter.push(letter);
                displayWord();
            }
            else{
                showNotification();
            }
        }
        else{
            if(!wrongLetter.includes(letter)){
                wrongLetter.push(letter);
                updateWrongLetterEl();
            }
        }
    }
}
function removeAllSvgMark(){
    figureParts.forEach(svg =>{
        svg.style.display = 'none';
    })
}
playAgainButton.addEventListener('click',()=>{
    correctLetter.splice(0);
    wrongLetter.splice(0);
    seletctedWord = words[Math.floor(Math.random()* words.length)];
    updateWrongLetterEl();
    checkWrong = 0;
    displayWord();
    removeAllSvgMark();
    popup.style.display = 'none';

    window.addEventListener('keydown',typeWords,false);
})
window.addEventListener('keydown',typeWords,false);
displayWord()
