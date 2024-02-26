// TOTAL SUM RENDER
function renderCartSum() {
    const totalSum = calculateTotal();
    const subTotal = calculateSubTotal();
    const container = document.getElementById('shoppingCart');

    container.innerHTML += generateCartSumHTML(totalSum, subTotal);
}

// RENDER CART CONTENT
function renderCart() {
    let container = document.getElementById('shoppingCart');

      if (!container.classList.contains('shopping-cart-mobile')) {
        container.classList.remove('shopping-cart-mobile');
    }

    container.innerHTML = '';
    container.innerHTML += generateCartHeaderHTML();

    for (let i = 0; i < cart.length; i++) {
        container.innerHTML += generateCartMainHTML(i); 
    }

    if (cart.length > 0) {
        renderCartSum();
    }else{
        container.innerHTML += generateCartEmptyHTML();
    }
}

// RENDER MAIN CONTENT
function render() {
    let foodContainer = document.getElementById('food');
    let displayedCategories = {};

    for (let i = 0; i < foods.length; i++) {
        const category = categories[i];
        
        if (!displayedCategories[category]) {
            foodContainer.innerHTML += generateFoodContainerHeaderHTML(i);
            displayedCategories[category] = true;
        }
        foodContainer.innerHTML += generateFoodContainerMainHTML(i);
    }
    foodContainer.innerHTML += generateFoodContainerFooterHTML();
    renderCart();
}

// RENDER HTML ELEMENTS -----------------------------------------------------------------------------------------------------------
function generateCartSumHTML(totalSum, subTotal) {
    return /*html*/ `
    <div class='cart-item'>
        <div class='cart-sum'>
            <h3>Zwischensumme: ${subTotal} Kr.</h3>
            <p>Versandkosten: 2 Kr.</p>
            <h2>Gesamtpreis: ${totalSum} Kr.</h2>
        </div>
    </div>
    <div class='order-section'>
        <div class='order-now'>
            <button onclick="orderNow()" class='order-btn'>Jetzt Bestellen</button>
        </div>
    </div>`;
}

function generateCartHeaderHTML(){
    return /*html*/ `
    <button class='close-btn d-none' onclick="closeCart()"><img src="./icons/close.png" alt="Close"></button>
        <div class='cart-header'>
            <h2>Warenkorb</h2>
            <div class='cart-delivery'>
                <button class='delivery-info'>
                    <img src="./icons/horse.png" alt="Delivery">
                    <div class='cart-delivery-text'>
                        <h3>Lieferung</h3>
                        <p>30 min</p>
                    </div>
                </button>
            </div>
        </div>`;
}

function generateCartMainHTML(i){
    const food = cart[i];
    const priceIndex = foods.indexOf(food);
    const price = prices[priceIndex].toFixed(2).replace('.', ',');
    const amount = amounts[i];

    return /*html*/ `
    <div class='cart-item'>
        <div class='cart-text'>
            <img onclick="updateCart(${i})" src="./icons/plus.png" alt="Add To Cart">
            <img onclick="removeFromCart(${i})" src='./icons/minus.png' alt='Remove From Cart'>
            ${amount}x ${food}  
            <div class='cart-price'>
                ${price} Kr. 
            </div>
        </div>
    </div>`;
}

function generateCartEmptyHTML(){
    return /*html*/ `
    <div class='cart-item'>
        <div class='cart-empty'>
            <img src="./icons/bag.png" alt="Bag">
            <h2>Der Warenkorb ist leer</h2>
            <p>Füge jetzt schmackhafte Gerichte hinzu</p>
        </div>
        
    </div>`;
}

function generateFoodContainerHeaderHTML(i){
    const category = categories[i];
    const imageURL = categoryImages[category];

    return /*html*/ `
    <div class='food-item'>
        <div class='food-img'>
            <img src='${imageURL}' alt='${category}'>
        </div>
        <h2 id="category${i}">${category}</h2>
    </div>`;
}

function generateFoodContainerMainHTML(i){
    const food = foods[i];
    const price = prices[i].toFixed(2).replace('.', ',');
    const description = descriptions[i];

    return /*html*/ `
    <div class='food-item'>
        <div class='food-text'>
            <div class='headlines'>
                <h2>${food}</h2>
                <h2>${price} Kr.</h2>
            </div>
            <div class='description'>
                <p>${description}</p>
            </div>
            <div class="add-basket">
                <img onclick="addToCart(${i})" src='./icons/plus.png' alt='Add To Cart'>
            </div>
        </div>
    </div>
    <button id="openCartBtn" onclick="openCart()" class="order-btn open-btn d-none">Zum Warenkorb (${cart.length})</button>`;
}

function generateFoodContainerFooterHTML(){
    return /*html*/ `
    <div class='back-to-top'>
        <a href="#top"><img src="./icons/top.png" alt="Back To Top"></a>
    </div>`;
}

// ORDER NOW BUTTON
function orderNow(){
    let container = document.getElementById('shoppingCart');
    container.innerHTML = '';
    container.innerHTML += /*html*/ `
    <div class='order-complete'>
        <h2>Bestellung abgeschlossen!</h2>
        <p>Vielen Dank für Ihre Bestellung!</p>
        <button class='order-btn back-btn' onclick="closeCart()">Zurück</button>
    </div>`;

    localStorage.clear();

    setTimeout(function(){
        window.location.reload();
    }, 2000);
}