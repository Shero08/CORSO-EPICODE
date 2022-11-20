let total = 0;
let operation = false;
let lastNumber;

function readInput(numX){
    let ts = document.getElementById('totalScore');
    ts.value = numX;
    lastNumber = numX;
    if(operation) {
        add();
    }
    operation = false;
}

function add(){
    console.log('add');
    total = total + parseInt(lastNumber);
    console.log('add: ' + total);    
    operation = true;
}

function division(){
    console.log('division');
}

function result() {
    console.log('result', total);
    let ts = document.getElementById('totalScore');
    ts.value = total;
}

function mClear() {
    console.log('clear');
    total = 0;
    operation = false;
    let ts = document.getElementById('totalScore');
    ts.value = "";
}

////////////////////////////////

function n(dato){ 
    document.getElementById("operazioni").value += dato;
 }
 
 function operazione() { 
 document.getElementById("operazioni").value = eval(document.getElementById("operazioni").value); 
 }
 
 function cancella() { 
  document.getElementById("operazioni").value = ""; 
 }

