let products = []

let totalPrice = 0

// Création HTML du panier

products = JSON.parse(localStorage.getItem('products'));

function createPage () {

    for (let i = 0; i < products.length; i++) {
    
        const basket = document.getElementById('basket')
    
        let li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between lh-condensed basketContainer';
        basket.appendChild(li);
    
        let div = document.createElement('div');
        li.appendChild(div);
    
        let div2 = document.createElement('div');
        li.appendChild(div2);
    
        let h6 = document.createElement('h6');
        h6.className = 'my-0 productName';
        div.appendChild(h6);
    
        let small = document.createElement('small');
        small.className = 'text-muted quantity';
        div.appendChild(small);
    
        let productPrice = document.createElement('span');
        productPrice.className = 'text-muted productPrice';
        div2.appendChild(productPrice);
    
        let deleteItem = document.createElement('button');
        deleteItem.className = 'btn btn-danger ml-3 deleteItem';
        deleteItem.type = 'button';
        div2.appendChild(deleteItem);
    
        let divinDiv = document.createElement('div');
        divinDiv.className = 'input-group';
        div.appendChild(divinDiv);
    
        let spanMinus = document.createElement('span');
        spanMinus.className = 'input-group-btn';
        divinDiv.appendChild(spanMinus);
    
        let minusButton = document.createElement('button');
        minusButton.className = 'btn btn-danger minusButton';
        minusButton.type = 'button';
        spanMinus.appendChild(minusButton);
    
        let spanPlus = document.createElement('span');
        spanPlus.className = 'input-group-btn ml-2';
        divinDiv.appendChild(spanPlus);
    
        let PlusButton = document.createElement('button');
        PlusButton.className = 'btn btn-success plusButton';
        PlusButton.type = 'button';
        spanPlus.appendChild(PlusButton);
    
    
        let title = document.getElementsByClassName('productName')
        let quantity = document.getElementsByClassName('quantity')
        let price = document.getElementsByClassName('productPrice')
        let xButton = document.getElementsByClassName('deleteItem')
        let priceTotal = document.getElementById('totalPrice')
        let minusButtonStyle = document.getElementsByClassName('minusButton')
        let plusButtonStyle = document.getElementsByClassName('plusButton')
    
        minusButtonStyle[i].innerText = "-"
        plusButtonStyle[i].innerText = "+"
        xButton[i].innerText = 'X';
        quantity[i].innerText = 'quantité : ' + products[i].quantity;
    
    
        fetch('http://localhost:3000/api/cameras/' + products[i]._id)
            .then(res => res.json())
            .then(data => {
                title[i].innerText = data.name;
                price[i].innerText = (Math.round(products[i].quantity * data.price * 100) / 100) / 1000 + '€';
                totalPrice = totalPrice + products[i].quantity * data.price / 1000;
                totalPrice = Math.round(totalPrice * 100) / 100;
                priceTotal.innerText = totalPrice
            })
    
    
    }

}

createPage ();


// affichage de la quantité d'articles dans le panier

quantityTotal = parseInt(window.localStorage.getItem('quantityTotal'))
document.getElementById('quantityTotal').innerText = quantityTotal;

// Si il n'y pas d'article afficher une message panier vide

function deletePage () {

    let containerChild = document.getElementById('containerChild')
    let container = document.getElementById('container')
    container.removeChild(containerChild);

    let emptyCart = document.createElement('h1');
    emptyCart.id = 'emptyCart';
    emptyCart.className = 'mt-5 text-center'
    container.appendChild(emptyCart);

    let EmptyCartMessage = document.getElementById('emptyCart');
    EmptyCartMessage.innerText = "VOTRE PANIER EST VIDE !";

}

// Bouttons suppréssion d'objet, quantité moins et plus

function deleteAndMinusPlus () {

    let deleting = document.getElementsByClassName('deleteItem')
    let quantity = document.getElementsByClassName('quantity')
    let minusButtonStyle = document.getElementsByClassName('minusButton')
    let plusButtonStyle = document.getElementsByClassName('plusButton')
    let price = document.getElementsByClassName('productPrice')
    let priceTotal = document.getElementById('totalPrice')

    for (let i = 0; i < deleting.length; i++) {

        let button = deleting[i]

        button.addEventListener('click', (e) => {

            products = JSON.parse(localStorage.getItem('products'));

            quantityTotal = quantityTotal - products[i].quantity

            window.localStorage.setItem('quantityTotal', quantityTotal);
            document.getElementById('quantityTotal').innerText = quantityTotal;

            products.splice(i, 1)

            localStorage.setItem('products', JSON.stringify(products));

            e.target.parentElement.parentElement.remove()

            location.reload();
        })

        let minus = minusButtonStyle[i]

        minus.addEventListener('click', (e) => {

            products = JSON.parse(localStorage.getItem('products'));
            if (products[i].quantity > 0) {

                quantityTotal = quantityTotal - 1

                window.localStorage.setItem('quantityTotal', quantityTotal);
                document.getElementById('quantityTotal').innerText = quantityTotal;


                products[i].quantity = products[i].quantity - 1

                quantity[i].innerText = 'quantité : ' + products[i].quantity;
                localStorage.setItem('products', JSON.stringify(products));

                fetch('http://localhost:3000/api/cameras/' + products[i]._id)
                .then(res => res.json())
                .then(data => {
                    price[i].innerText = (Math.round(products[i].quantity * data.price * 100) / 100) / 1000 + '€';
                    totalPrice = totalPrice - data.price / 1000;
                    totalPrice = Math.round(totalPrice * 100) / 100;
                    priceTotal.innerText = totalPrice
                })

            }
        })

        let plus = plusButtonStyle[i]

        plus.addEventListener('click', (e) => {

            products = JSON.parse(localStorage.getItem('products'));

            quantityTotal = quantityTotal + 1

            window.localStorage.setItem('quantityTotal', quantityTotal);
            document.getElementById('quantityTotal').innerText = quantityTotal;

            products[i].quantity = products[i].quantity + 1

            quantity[i].innerText = 'quantité : ' + products[i].quantity;
            localStorage.setItem('products', JSON.stringify(products));

            fetch('http://localhost:3000/api/cameras/' + products[i]._id)
            .then(res => res.json())
            .then(data => {
                price[i].innerText = (Math.round(products[i].quantity * data.price * 100) / 100) / 1000 + '€';
                totalPrice = totalPrice + data.price / 1000;
                totalPrice = Math.round(totalPrice * 100) / 100;
                priceTotal.innerText = totalPrice
            })



        })


    }

}

// Affichage de la page en fonction de la quantité du panier

products = JSON.parse(localStorage.getItem('products'));

if (products.length < 1) { 

    deletePage ();

} else { 

    deleteAndMinusPlus ();

    // création d'un array avec les id des articles dans le panier

    let products_id = []

    for (let i = 0; i < products.length; i++) {
        products_id.push(products[i]._id)
    }

    // validation et envoie du panier au backend

    let commandForm = document.getElementById("commandForm")

    commandForm.addEventListener('submit', (e) => {

        console.log(commandForm)
        if (commandForm.checkValidity() === false) {

            e.preventDefault()
            e.stopPropagation()

        } else {

            e.preventDefault();

            let data = {
                contact: {
                    firstName: document.getElementById('firstName').value,
                    lastName: document.getElementById('lastName').value,
                    address: document.getElementById('address').value,
                    city: document.getElementById('city').value,
                    email: document.getElementById('email').value,

                },

                products: products_id
            }

            fetch("http://localhost:3000/api/cameras/order", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

                .then(function (res) {
                    if (res.ok) {
                        return res.json();
                    }
                })

                .then(data => {
                    //console.log('data result', data.orderId, data)
                    window.localStorage.setItem('orderId', data.orderId);
                })

            window.localStorage.setItem('orderPrice', totalPrice);

            location.href = "thankyou.html";

        }

        commandForm[0].classList.add('was-validated');

    });
}
