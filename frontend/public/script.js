function main() {
  fetchPizzas();
  createFilterInputAndShoppingButton();
  createForm();
  displayCartContentWhenClickCartButton();
}

let cart = [];
let form = {
  pizzas:  cart,
  date: {
    year: 0,
    month: 0,
    day: 0,
    hour: 0,
    minute: 0,
  },
  customer: {
    name: '',
    email: '',
    address: {
      city: '',
      street: '',
    },
  },
};
const rootElement = document.getElementById('root');
rootElement.insertAdjacentHTML('afterbegin', `<div id="form"></div>`);
let formElement = document.getElementById('form');

function createFilterInputAndShoppingButton() {
  rootElement.insertAdjacentHTML(
    'beforeend',
    `
<div id="fixed" class="main"><div id="headline" class="main">


    


        <div class="container">
        <input list="filter" name="allergens" id="allergens" onfocus="this.value=''" onchange="this.blur();" placeholder="choose material">
        <datalist id="filter"></datalist>
        <h2 class="title">
          <span class="title-word title-word-1">Very</span>
          <span class="title-word title-word-2">premium</span>
          <span class="title-word title-word-3">useful</span>
          <span class="title-word title-word-4">gadgets</span>
        </h2>
        <span id="cart" class="material-symbols-outlined">shopping_cart</span></br>
        </div>




</div>
</div>
<div id="pizzas" class="main"></div>
<div id="footer" class="main"></div>
`
  );
}

function createForm() {
  formElement.insertAdjacentHTML(
    'beforeend',
    `
<form id="packageForm" class="packageForm" name="packageForm">
<div id="orderFormTitle">Checkout</div>
<div><input id="customerName" type="text" name="customerName" placeholder="name" required></div>
<div><input id="email" type="email" name="email" placeholder="email" required></div>
<div id="address">
Address
<div><input id="city" type="text" name="city" placeholder="city" required></div>
<div><input id="street" type="text" name="street" placeholder="street" required></div>
</div>
<div><input id="orderBtn" type="submit" value="Order"/></div>
</form>`
  );
}
main();

const packageFormElement = document.getElementById('packageForm');

const elementOfAllThePizzas = document.getElementById('pizzas');
let customerNameElement = document.getElementById('customerName');
let emailElement = document.getElementById('email');
let cityElement = document.getElementById('city');
let streetElement = document.getElementById('street');

let itemsInCart = [];

function createElementForPizza(pizza) {
  elementOfAllThePizzas.insertAdjacentHTML(
    'beforeend',
    `<div class="item" id="${pizza.name}">
        <div class="name">${pizza.name}</div>
        <div id="add"></div>
        <div id="add">
        
        <span id="${pizza.name}Amount" class="amount-span">0</span>
        <span id="${pizza.name}MinusBtn" class="material-symbols-outlined minusBtn">remove</span>
        <span id="${pizza.name}AddBtn" class="material-symbols-outlined addBtn">add</span>
        </div>
        
        
    </div>`
  );

  document
    .getElementById(`${pizza.name}AddBtn`)
    .addEventListener('click', function () {
      handleAddToCart(pizza.id, pizza.name, pizza.price);
    });

  document
    .getElementById(`${pizza.name}MinusBtn`)
    .addEventListener('click', function () {
      handleSubtractToCart(pizza.id, pizza.name);
    });
}

function displayCartContentWhenClickCartButton() {
  document.getElementById('cart').addEventListener('click', function () {
    packageFormElement.classList.remove('packageForm');
    console.log('cart', cart);
    itemsInCart.push(cart);
    formElement.insertAdjacentHTML(
      'afterbegin',
      `<div id="cartContent" class="cartContent"><div id="cartTitle">Shopping Cart</div></div>`
    );
    const cartContentElement = document.getElementById('cartContent');
    itemsInCart[0].forEach((item) => {
      cartContentElement.insertAdjacentHTML(
        'beforeend',
        `
    <div id="itemName">item: <b>${item.name}</b><div>
    <div id="itemAmount">amount: <b>${item.amount}</b></div>
    <div id="priceInCart">price: <b>${item.price} € * ${item.amount}</b></div>`
      );
    });

    const prices = [];
    itemsInCart[0].forEach((item) => prices.push(item.price));
    const totalPrice = prices.reduce((a, b) => a + b);
    cartContentElement.insertAdjacentHTML(
      'beforeend',
      `<div id="totalPrice"><div id="totalPriceTitle">Total price</div><div id="total"><b>${totalPrice} €</b></div></div>`
    );

    const mainElements = document.getElementsByClassName('main');
    console.log(mainElements);
    Array.from(mainElements).forEach((el) => {
      el.style.display = 'none';
    });
  });
}

const cartContentElement = document.getElementById('cartContent');
console.log(cartContentElement);

function createElementForPizzaAllergents(allergen, pizzaId) {
  document
    .getElementById(pizzaId)
    .insertAdjacentHTML('beforeend', `<div class="material">${allergen}</div>`);
}

function createOptionsForAllergens(allergen) {
  document
    .getElementById('filter')
    .insertAdjacentHTML('beforeend', `<option value="${allergen}">`);
}

function createDivForAddedItems(addedItem) {
  document
    .getElementById('itemName')
    .insertAdjacentHTML('beforeend', `<div id="${addedItem}"></div>`);
}

function createElementForImage(pizzaId, url) {
  document
    .getElementById(pizzaId)
    .insertAdjacentHTML(
      'afterbegin',
      `<div class="image"><img src="${url}" width="200" height="300"></div>`
    );
}

function handleAddToCart(pizzaId, pizzaName, pizzaPrice) {
  let cartItemList = cart.filter((item) => item.id === pizzaId); // ez nem finddal kellett volna ink?
  let itemAmountElement = document.getElementById(`${pizzaName}Amount`);
  if (cartItemList.length === 0) {
    cart.push({ id: pizzaId, name: pizzaName, amount: 1, price: pizzaPrice });
    itemAmountElement.innerHTML = 1;
  } else {
    cartItemList[0].amount += 1;
    itemAmountElement.innerHTML = parseInt(itemAmountElement.innerHTML) + 1;
  }
}

function handleSubtractToCart(pizzaId, pizzaName) {
  let itemAmountElement = document.getElementById(`${pizzaName}Amount`);
  for (let i = 0; i < cart.length; i++) {
    //mappal
    if (cart[i].id === pizzaId) {
      cart[i].amount--;
      if (cart.length > 0) {
        itemAmountElement.innerHTML = parseInt(itemAmountElement.innerHTML) - 1;
      }
      if (cart[i].amount === 0) {
        cart.splice(i, 1);
      }
      break;
    }
  }
}

function generateCurrentDate() {
  const currentDate = new Date().toJSON().slice(0, 10);
  const currentMinSec = new Date().toJSON().slice(11, 16);
  let split = currentDate.split('-');
  let splitMinSec = currentMinSec.split(':');
  const date = {
    year: split[0],
    month: split[1],
    day: split[2],
    hour: splitMinSec[0],
    minute: splitMinSec[1],
  };
  return date;
}

async function fetchPizzas() {
  const response = await fetch('http://127.0.0.1:9001/api/pizza');
  const pizzas = await response.json();

  const res = await fetch('http://127.0.0.1:9001/api/allergen');
  const allergens = await res.json();

  pizzas.forEach((pizza) => {
    createElementForPizza(pizza);
    createElementForImage(pizza.name, pizza.imgUrl);
    document
      .getElementById(`${pizza.name}`)
      .insertAdjacentHTML(
        `beforeend`,
        `<div id="price">${pizza.price} €</div>`
      );
    allergens.forEach((allerg) => {
      if (pizza.allergens.includes(allerg.id)) {
        createElementForPizzaAllergents(allerg.name, pizza.name);
      }
    });
  });

  allergens.forEach((allergen) => {
    createOptionsForAllergens(allergen.name);
  });

  function filterPizzasByAllergent() {
    document
      .getElementById('allergens')
      .addEventListener('change', function (event) {
        allergens.forEach((allergen) => {
          if (allergen.name === event.target.value) {
            console.log('allergen.name', allergen.name);
            console.log('event.target.value', event.target.value);
            document.getElementById('pizzas').replaceChildren();
            pizzas.filter((pizza) => {
              if (pizza.allergens.includes(allergen.id)) {
                createElementForPizza(pizza);
                createElementForImage(pizza.name, pizza.imgUrl);
                allergens.forEach((allerg) => {
                  if (pizza.allergens.includes(allerg.id)) {
                    console.log('tartalmazza');
                    document
                      .getElementById(pizza.name)
                      .insertAdjacentHTML(
                        'beforeend',
                        `<div class="name">${allerg.name}</div>`
                      );
                  }
                });
              }
            });
          }
        });
      });
  }
  filterPizzasByAllergent();
}

packageFormElement.addEventListener('submit', function (event) {
  event.preventDefault();

  form.date = generateCurrentDate();
  form.customer.name = customerNameElement.value;
  form.customer.email = emailElement.value;
  form.customer.address.city = cityElement.value;
  form.customer.address.street = streetElement.value;
  sendFormData();

  rootElement.replaceChildren();
  rootElement.insertAdjacentHTML(
    'beforeend',
    `<div id="thanksMessage">
  <span class="text1"> Thank you </span>
  <span class="text2"> for ordering! </span>
  </div>`
  );
});

async function sendFormData() {
  const res = await fetch('http://127.0.0.1:9001/api/order', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  });
  const response = await res.json();
}
