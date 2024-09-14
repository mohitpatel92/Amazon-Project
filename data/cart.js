export let cart = JSON.parse(localStorage.getItem("cart"));

if (!cart) {
  cart = [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      deliveryOptionsId : '1'
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      deliveryOptionsId : '2'
    },
    {
      productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
      quantity: 3,
      deliveryOptionsId : '3'
    },
  ];
}

function savetostorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId) {
  let matchingItem;

  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    }
  });
  console.log("produt id", productId);

  if (matchingItem) {
    matchingItem.quantity = 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionsId : '1'
    });
  }
  savetostorage();
}

export function removeFromCart(productId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  console.log("removred from cart", productId);
  savetostorage();
}

export function calculateCartQuantity() {
  let cartQunatity = 0;

  cart.forEach((item) => {
    cartQunatity += item.quantity;
  });
  return cartQunatity;
}

export function updateQuantity(productId, newQuantity) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.quantity = newQuantity;

  savetostorage();
}
