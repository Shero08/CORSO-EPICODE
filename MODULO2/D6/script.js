
//CHANGE TEXT OF THE TITLE
function changeText(){
    console.log('func.changeText->onmousehover');
    const title = document.getElementById('shop');
    title.innerText = 'Ciao sono Lucia e sono una sirena';
}

//CHANGE PAGE BACKGROUND COLOR
function changeBg(){
    console.log('func.changeBg->onclick');
    const page = document.getElementsByTagName('body')[0];
    page.style.backgroundColor = 'red';
} 

//CHANGE ADDRESS
function changeAddress(){
    console.log('func.changeAddress->onclick');
    const address = document.getElementById('address');
    address.innerText = 'Viale dei Tigli, 44 - 81031 Aversa (CE)';
} 

//ADD CLASS ON LINK AMAZON
function addClass(){
    console.log('func.addClass->onclick');
    const addLink = document.getElementsByTagName('a');

    for (let i = 0; i < addLink.length; i++) {
        addLink.item(i).classList.add('color');
      }
}

//ADD CLASS TO HIDE IMMAGES
function hideImg(){
    console.log('func.hideImg->onclick');
    const hide = document.getElementsByTagName('img');

    for (let i = 0; i < hide.length; i++) {
        hide.item(i).classList.add('hide');
    }
} 

//REMOVE CLASS TO SHOW IMMAGES
function showImg(){
    console.log('func.showImg->onclick');
    const show = document.getElementsByTagName('img');

    for (let i = 0; i < show.length; i++) {
        show.item(i).classList.remove('hide');
    }
} 

//GENERATE RANDOM NUMBER
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//CHANGE COLOR OF THE PRICES
function changeColorPrice(){
    console.log('func.changeColorPrice->onclick');
    const color = ['red', 'blu', 'green', 'yellow', 'grey', 'black'];
    let newColor = color[getRandom(0, 5)];
    console.log(newColor);
    const priceColor = document.getElementsByClassName('price');

    
    
    for (let i = 0; i < priceColor.length; i++) {
            priceColor[i].style.color = newColor;
    }
} 