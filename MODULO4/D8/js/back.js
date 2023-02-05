const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2RhYjg0ODJiMDAxNTAwMTU5YThiNjgiLCJpYXQiOjE2NzUyNzg0MDgsImV4cCI6MTY3NjQ4ODAwOH0.zHhKdPwEWPfkAyPzNF1mmucurKPTcZs7lQqBlhVKoaw';
const api = 'https://striveschool-api.herokuapp.com/api/product/';
const submitProduct = document.getElementById('submitProduct');
const putBtn = document.getElementById('patchProduct-btn');
const addForm = document.getElementById('addProductForm');
const putForm = document.getElementById('put-form');
const putSelect = document.getElementById('select-p');
const deleteSelect = document.getElementById('del-select');
const deleteButton = document.getElementById('delProduct-btn');
const nameIn = document.getElementById('name-p');
const descriptIn = document.getElementById('description-p');
const brandIn = document.getElementById('brand-p');
const imageIn = document.getElementById('image-p');
const priceIn = document.getElementById('price-p');
const alertDiv = document.getElementById('alert');

//CALL THE API
const getRequest = async (url) => {
    console.log('func.async.getRequest -> start');
    try {
        const data = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }
        });

        return await data.json();
    }
    catch (error) {
        console.log(error);
    }
}

//POST FUNCTION
const postRequest = async (formData, url) => {
    try{
        const data = await fetch(url, {
            method: 'POST', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }, 
            body: JSON.stringify(formData),
        })

        return await data.json();
    }
    catch(error){
        console.log(error);
    }
}

//PATCH FUNCTION
const putRequest = async (formData, prodID, url) => {
    try{
        const data = await fetch(`${url}${prodID}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }, 
            body: JSON.stringify(formData),
        })
    }
    catch(error){
        console.log(error)
    }
}

//DELETE FUNCTION
const deleteRequest = async (prodID, url) => {
    try{
        const data = await fetch(`${url}${prodID}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            }, 
        })
    }
    catch(error){
        console.log(error)
    }
}

//TAKE RESPONSE FROM API
getRequest(api).then((response) => {
    console.log(response);

    populateSelect(response);
    populateSelectDel(response);
    eventSelect(response);
    eventSelectDel(response);
});

//FUNCTION TO CREATE ELEMENT
const createElement = (tag, attrib, ...children) => {
    const element = document.createElement(tag);

    Object.keys(attrib).forEach((key) => {
        element.setAttribute(key, attrib[key]); // key = chiave + valore + indice
    });

    children.forEach((child) => {
        typeof child === 'string' ? element.appendChild(document.createTextNode(child)) : element.appendChild(child);
    });

    return element;
}

const populateSelect = (response) => {
    response.map((el) => {
        const product = createElement('option', {value: `${el._id}`}, `ID: ${el._id}, Nome: ${el.name}`);
        putSelect.appendChild(product);
    })
}

const populateSelectDel = (response) => {
    response.map((el) => {
        const product = createElement('option', {value: `${el._id}`}, `ID: ${el._id}, Nome: ${el.name}`);
        deleteSelect.appendChild(product);
    })
}

//POPULATE FORM WHEN SELECTED PRODUCT
const eventSelect = (response) => {
    putSelect.addEventListener('change', () => {
        console.log('func.putSelect -> selected -> start');
        console.log('Valore selezionato: ' + putSelect.value);

        const res = response.find(el => el._id === putSelect.value);
        console.log(res);

        nameIn.value = res.name;
        descriptIn.value = res.description;
        brandIn.value = res.brand;
        imageIn.value = res.imageUrl;
        priceIn.value = res.price;
    });    
}

//POPULATE FORM WHEN SELECTED PRODUCT
const eventSelectDel = (response) => {
    deleteSelect.addEventListener('change', () => {
        console.log('func.deleteSelect -> selected -> start');
        console.log('Valore selezionato: ' + deleteSelect.value);
    });    
}

//EVENT THAT CREATE PRODUCT ON SERVER
submitProduct.addEventListener('click', event => {
    event.preventDefault();
    console.log(addForm);
    const formValue = new FormData(addForm);
    const data = Object.fromEntries(formValue.entries())

    data.price = Number(data.price);
    
    postRequest(data, api);

    const text = 'Prodotto inserito con successo!';
    const addClass = 'alert-primary';

    createAlert(text, addClass);

    setTimeout(() => {
        location.reload(); 
    }, 3000)
})

//EVENT THAT MODIFY PRODUCT ON SERVER
putBtn.addEventListener('click', event => {
    event.preventDefault();
    console.log(putForm);
    const formValue = new FormData(putForm);
    const data = Object.fromEntries(formValue.entries())

    data.price = Number(data.price);
    
    const prodID = putSelect.value;
    putRequest(data, prodID, api);

    nameIn.value = '';
    descriptIn.value = '';
    brandIn.value = '';
    imageIn.value = '';
    priceIn.value = '';

    const text = 'Prodotto modificato con successo!';
    const addClass = 'alert-success';

    createAlert(text, addClass);

    setTimeout(() => {
        location.reload(); 
    }, 1000)
})

deleteButton.addEventListener('click', (event) => {
    event.preventDefault();
    const prodID = deleteSelect.value;
    console.log(deleteSelect.value);
    deleteRequest(prodID, api);

    const text = 'Prodotto eliminato con successo!';
    const addClass = 'alert-danger';

    createAlert(text, addClass);

    setTimeout(() => {
       location.reload(); 
    }, 1000)
})

//CREATE ALERT
const createAlert = (text, addClass) => {
    const alert = createElement('div', {class: `alert ${addClass}`, role: 'alert'}, `${text}`);
    alertDiv.appendChild(alert);
}
