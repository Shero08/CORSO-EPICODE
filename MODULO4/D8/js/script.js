const array = [1, 2, 4, 6, 7];




function filterFunction(array, funct){
    const newArray = [];
    for(let i = 0; i < array.length; i++){
        funct();
    }

    return newArray;
}

function test(){
    if(array[i] % 2 === 0){
        newArray.push(array[i]);
    }
}

filterFunction(array, test());