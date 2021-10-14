setTimeout(ThanksPage, 1000);

function ThanksPage () {

    // récupération de l'order ID et attribution dans l'HTML
    
    orderId = window.localStorage.getItem('orderId')
    document.getElementById('orderId').innerText = orderId
    
    // récupération du prix total et attribution dans l'HTML
    
    orderPrice = window.localStorage.getItem('orderPrice')
    document.getElementById('orderPrice').innerText = orderPrice
    
    // Suppression des données du panier dans le localStorage
    
    window.localStorage.removeItem('orderId')
    window.localStorage.removeItem('orderPrice')
    window.localStorage.removeItem('products')
    window.localStorage.removeItem('quantityTotal')

}
