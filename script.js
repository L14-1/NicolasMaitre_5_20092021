let products = []


fetch('http://localhost:3000/api/cameras')
.then(res => res.json())
.then(data => { 
    for (let i = 0; i < data.length; i++) {

        const mainContainer = document.getElementById('mainContainer')
        let itemLink = document.createElement('a');
        itemLink.className = 'card mb-5 aLink';
        mainContainer.appendChild(itemLink);

        let cardImage = document.createElement('img');
        cardImage.className = 'card-img-top';
        itemLink.appendChild(cardImage);

        let cardBody = document.createElement('div');
        cardBody.className = 'card-body';
        itemLink.appendChild(cardBody);

        let cardTitle = document.createElement('h5');
        cardTitle.className = 'card-title';
        cardBody.appendChild(cardTitle);

        let cardText = document.createElement('p');
        cardText.className = 'card-text';
        cardBody.appendChild(cardText);

        let cardPrice = document.createElement('h5');
        cardPrice.className = 'card-price';
        cardBody.appendChild(cardPrice);

        let itemImage = document.getElementsByClassName('card-img-top')
        let itemPrice = document.getElementsByClassName('card-price')
        let itemTitle = document.getElementsByClassName('card-title')
        let itemText = document.getElementsByClassName('card-text')
        let itemId = document.getElementsByClassName('card')
    
        itemImage[i].src = data[i].imageUrl;
        itemPrice[i].innerText = data[i].price / 1000 + '€';
        itemTitle[i].innerText = data[i].name;
        itemText[i].innerText = data[i].description;
        itemId[i].href = 'product.html?id=' + data[i]._id;

    }
    

})


// setting localStorage
function settingLocalStorage () {

    let productsLocaleStorage = Boolean(localStorage.getItem('products'));
    
    let quantityTotal = 0
    
    if ( !productsLocaleStorage ) {
        localStorage.setItem('products', JSON.stringify(products));
        window.localStorage.setItem('quantityTotal', quantityTotal);
    }

}


// affichage de la quantité d'articles dans le panier

quantityTotal = window.localStorage.getItem('quantityTotal')
document.getElementById('quantityTotal').innerText = quantityTotal;


settingLocalStorage ();