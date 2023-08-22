const content = document.getElementById('Welcome')

const initialText = 'Dress good, feel good, work good!'
let currentIndex = 0

function updateText(){
    content.initialText = initialText.slice(0, currentIndex)
    currentIndex = (currentIndex+1)%(initialText.length+1)
}

setInterval(updateText, 3000)