// Récupération des données de l'api et incorporation dans la page

const pageId = new URL(location.href).searchParams.get("id")
const url = 'http://localhost:3000/api/cameras/' + pageId

let productImage = document.getElementById('productImage')
let productTitle = document.getElementById('productTitle')
let productText = document.getElementById('productText')
let productPrice = document.getElementById('productPrice')
let lenseChoice = document.getElementsByClassName('lenseChoice')
const selectDiv = document.getElementById('selectDiv')


fetch(url)
    .then(res => res.json())
    .then(data => {
        // récupération données
        productImage.src = data.imageUrl;
        productTitle.innerText = data.name;
        productText.innerText = data.description;
        productPrice.innerText = data.price / 1000 + '€';
        // adaptation taille select lenses
        for (let i = 0; i < data.lenses.length; i++) {
            let option = document.createElement('option');
            option.className = 'lenseChoice';
            option.value = 'validChoice';
            option.innerText = data.lenses[i];
            selectDiv.appendChild(option);
        }
    }
    )
    .catch(err => {
        let mainCard = document.getElementById('doNotDisplayIf404')
        let insideMainCard = document.getElementById('insideContainer')
        mainCard.removeChild(insideMainCard)

        let wrongId = document.createElement('h1');
        wrongId.id = 'wrongId';
        wrongId.className = 'mt-5 text-center'
        mainCard.appendChild(wrongId);

        let wrongIdMessage = document.getElementById('wrongId');
        wrongIdMessage.innerText = "PAGE INTROUVABLE (404) !";

        const footer = document.getElementById('footer')
        footer.classList.add('fixed-bottom')
    })

// fonction animation ajout panier

function animationAdded() {
    let animation = document.getElementById('addToCartAnimId');
    let delay = 1500;

    animation.className = 'addToCartAnimated';
    setTimeout(function () {
        animation.className = 'addToCartAnim';
    }, delay)
}

// Ajout du produit dans le panier + ajustement quantité dans panier

let quantityTotal = parseInt(window.localStorage.getItem('quantityTotal'))
document.getElementById('quantityTotal').innerText = quantityTotal

let products = JSON.parse(localStorage.getItem('products'));

const cart = document.getElementById('form');

cart.addEventListener('submit', (e) => {

    e.preventDefault();

    let defaultChoice = document.getElementById('selectDiv').value
    objIndex = products.findIndex((obj => obj._id == pageId));

    if (defaultChoice == "lensesChoice") {

        alert("Choississez une lentille");

    } else if (objIndex >= 0) {

        products[objIndex].quantity = products[objIndex].quantity + 1;
        localStorage.setItem('products', JSON.stringify(products));

        quantityTotal = quantityTotal + 1;
        window.localStorage.setItem('quantityTotal', quantityTotal);
        document.getElementById('quantityTotal').innerText = quantityTotal

        animationAdded()

    } else {

        products.push({
            _id: pageId,
            quantity: 1
        })

        localStorage.setItem('products', JSON.stringify(products));

        quantityTotal = quantityTotal + 1;
        window.localStorage.setItem('quantityTotal', quantityTotal);
        document.getElementById('quantityTotal').innerText = quantityTotal

        animationAdded()
    }

})