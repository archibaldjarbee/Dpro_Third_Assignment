const priceElement = document.getElementById("product");
const numberElement = document.getElementById("number");
let purchases = [];

// Product information database
const products = {
  "500": { name: "Original Blend 200g", price: 500 },
  "900": { name: "Original Blend 500g", price: 900 },
  "700": { name: "Special Blend 200g", price: 700 },
  "1200": { name: "Special Blend 500g", price: 1200 }
};

function add() {
  const price = parseInt(priceElement.value);
  const number = parseInt(numberElement.value);
  const product = products[price];
  
  if (!product || !number) {
    window.alert("Please select both a product and quantity.");
    return;
  }
  
  let purchase = {
    name: product.name,
    price: price,
    number: number
  };
  purchases.push(purchase);
  window.alert(`Added to cart:\n${display()}\nSubtotal: ${subtotal()} yen`);
}

function display() {
  let string = "";
  for (let i = 0; i < purchases.length; i++) {
    string += `${purchases[i].name}: ${purchases[i].price} yen × ${purchases[i].number} items\n`;
  }
  return string;
}

function subtotal() {
  let sum = 0;
  for (let i = 0; i < purchases.length; i++) {
    sum += purchases[i].price * purchases[i].number;
  }
  return sum;
}

function calc() {
  if (purchases.length === 0) {
    window.alert("No items in cart. Please add items first.");
    return;
  }
  
  const sum = subtotal();
  const postage = calcPostageFromPurchase(sum);
  
  let message = "Order Summary:\n\n";
  message += display();
  message += `\nSubtotal: ${sum} yen`;
  message += `\nShipping fee: ${postage} yen`;
  message += `\n\nTotal Amount: ${sum + postage} yen`;
  
  window.alert(message);
  
  // Clear the cart after showing total
  purchases = [];
  priceElement.value = "0";
  numberElement.value = "";
}

function calcPostageFromPurchase(sum) {
  if (sum == 0 || sum >= 3000) {
    return 0;
  } else if (sum < 2000) {
    return 500;
  } else {
    return 250;
  }
}