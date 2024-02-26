let foods = ['Hexer Suppe', 'Troll Tapas', 'Elfen Salat', 'Geralt´s Gegrilltes', 'Wyvern Wrap', 'Drachen Steaks', 'Einhorn Eisbecher',
    'Hexenherz Kuchen', 'Feen Fruchttarte', 'Elixier des Lebens', 'Einhorn Trank', 'Barden Bier', 'Troll Schluck']

let categories = ['Vorspeisen', 'Vorspeisen', 'Vorspeisen', 'Hauptspeisen', 'Hauptspeisen', 'Hauptspeisen', 'Desserts', 'Desserts', 'Desserts', 'Getränke',
    'Getränke', 'Getränke', 'Getränke']

let categoryImages = {
    'Vorspeisen': './img/vorspeisen.jpg',
    'Hauptspeisen': './img/hauptspeisen.jpg',
    'Desserts': './img/dessert.jpg',
    'Getränke': './img/drinks.jpg'
};

let descriptions = ['eine herzhafte Suppe mit versch. Wurzeln und Kräutern', 'gegrillte Gemüsehäppchen mit Wildfleisch',
    'frischer Salat mit exotischen Früchten und Nüssen, serviert mit einem Zaubertrank-Dressing',
    'saftiges Fleisch, gegrillt über einem offenen Feuer mit Beilagen nach Wahl',
    'Tortilla gefüllt mit gewürztem Fleisch, Gemüse und einer scharfen Sauce',
    'gebratene Drachenfilets mit Beilage aus gerösteten Pastinaken',
    'hausgemachtes Eis in verschiedenen magischen Aromen, serviert mit einer Prise Glitzerstaub',
    'ein reichhaltiger Schokoladenkuchen mit einer Füllung aus Beeren und einem Hauch von Zimt',
    'eine fruchtige Tarte mit exotischen Früchten, serviert mit einer Vanille-Jus',
    'ein erfrischender Fruchtcocktail mit geheimnisvollen Kräutern (nur für Hexer empfohlen)',
    'ein sprudelndes Getränk mit einem Hauch von Magie, Zitrone und Stachelbeeren',
    'ein kräftiges, dunkles Bier, gebraut nach altem Rezept',
    'ein würziger Schnaps, der mutig macht und die Seele wärmt']

let prices = [4.99, 4.99, 7.95, 18, 14.5, 25, 6.5, 9.99, 5.99, 5.5, 3.95, 4.5, 5]
let cart = [];
let amounts = [];
let itemPrices = [];

// SHOPPING CART SCROLLING
window.onscroll = function () {
    let shoppingCart = document.getElementById('shoppingCart');
    if (window.scrollY > 0) {
        shoppingCart.style = 'top: 0';
    } else {
        shoppingCart.style = 'top:64px';
    }
};

// ADD ITEMS TO CART
function addToCart(index) {
    const food = foods[index];
    const priceIndex = prices[index];
    let existingIndex = cart.indexOf(food);

    if (existingIndex == -1) {
        cart.push(food);
        amounts.push(1);
        itemPrices.push(priceIndex);
    } else {
        amounts[existingIndex]++;
        itemPrices[existingIndex] = itemPrices[existingIndex] + priceIndex;
    }

    saveCart();
    renderCart();
}

// CALCULATE SUBTOTAL
function calculateSubTotal() {
    let subtotal = 0;

    for (let i = 0; i < cart.length; i++) {
        const food = cart[i];
        const priceIndex = foods.indexOf(food);
        subtotal += prices[priceIndex] * amounts[i];
    }
    return subtotal.toFixed(2).replace('.', ',');
}

// CALCULATE TOTAL SUM
function calculateTotal() {
    let total = 0;
    let shipping = 2;

    for (let i = 0; i < cart.length; i++) {
        const food = cart[i];
        const priceIndex = foods.indexOf(food);
        total += prices[priceIndex] * amounts[i];
    }
    total += shipping;
    return total.toFixed(2).replace('.', ',');
}

// REMOVE ITEMS FROM CART
function removeFromCart(index) {
    if (amounts[index] > 1) {
        amounts[index]--;
    } else {
        cart.splice(index, 1);
        amounts.splice(index, 1);
        itemPrices.splice(index, 1);
    }
    saveCart();
    renderCart();
}

// UPDATE CART
function updateCart(index) {
  amounts[index]++;
  
  saveCart();
  renderCart();
}

// SAVE CART TO LOCAL STORAGE
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('amounts', JSON.stringify(amounts));
    localStorage.setItem('itemPrices', JSON.stringify(itemPrices));
}

// LOAD CART FROM LOCAL STORAGE
window.onload = function () {
    let classList = document.getElementById('shoppingCart').classList;
    if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
    }
    if (localStorage.getItem('amounts')) {
        amounts = JSON.parse(localStorage.getItem('amounts'));
    }
    if (localStorage.getItem('itemPrices')) {
        itemPrices = JSON.parse(localStorage.getItem('itemPrices'));
    }
    if (classList.contains('shopping-cart-mobile')) {
        closeCart();
    }
    render();
};

// RENDER CART MOBILE VERSION
function openCart() {
    let shoppingCartMobile = document.getElementById('shoppingCart');
    shoppingCartMobile.classList.add('shopping-cart-mobile');
}

function closeCart() {
    let shoppingCartMobile = document.getElementById('shoppingCart');
    shoppingCartMobile.classList.remove('shopping-cart-mobile');
}