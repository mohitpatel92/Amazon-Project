import {
  cart,
  removeFromCart,
  calculateCartQuantity,
  updateQuantity,
} from "./../data/cart.js";
import { formatCurrency } from "./utils/money.js";
import { products } from "./../data/products.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions } from "./../data/deleveryOptions.js";

let cartSummaryHTML = "";


cart.forEach((cartitem) => {
  const productId = cartitem.productId;

  let matchingproduct = "";

  products.forEach((product) => {
    if (product.id === productId) {
      matchingproduct = product;
    //  console.log("product", product);
    }
  });

  const deliveryOptionId = cartitem.deliveryOptionsId;
  //console.log("de op id..",deliveryOptionId);
  
  let deleveryOption; 

  deliveryOptions.forEach( (option) => {
      if(option.id === deliveryOptionId){
        deleveryOption = option;
      }
  })

  const today = dayjs();
  const deliverydate = today.add(deleveryOption.deliveryDays,'days')
  console.log("deli date...",deliverydate);  
  const dateString = deliverydate.format('dddd, MMMM  D')

  cartSummaryHTML += `
        <div class="cart-item-container js-cart-item-container-${
          matchingproduct.id
        }">
            <div class="delivery-date">
                Delivery date: ${dateString}
            </div>
          
            <div class="cart-item-details-grid">
                <img class="product-image"
                src="${matchingproduct.image}">

                <div class="cart-item-details">
                <div class="product-name">
                    ${matchingproduct.name}
                </div>
                <div class="product-price">
                    $${formatCurrency(matchingproduct.priceCents)}
                </div>
                <div class="product-quantity">
                    <span>
                     Quantity: <span class="quantity-label js-quantity-label-${
                       matchingproduct.id
                     }">${cartitem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-click" data-product-id="${
                      matchingproduct.id
                    }">
                    Update
                    </span>
                    <input class ="quantity-input js-quantity-input-${
                      matchingproduct.id
                    }">
                    <span class="save-quantity-link link-primary js-save-link" data-product-id="${
                      matchingproduct.id
                    }">Save</span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${
                      matchingproduct.id
                    }">
                    Delete
                    </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                  ${deliveryOptionsHTML(matchingproduct,cartitem)}
              </div>
            </div>
          </div>
          </div>
    `;
});

function deliveryOptionsHTML(matchingproduct,cartitem) {

  let html = '';

  deliveryOptions.forEach((item) => {

    const today = dayjs();
    const deliverydate = today.add(item.deliveryDays,'days')
    const dateString = deliverydate.format('dddd, MMMM  D')
    const priceString = item.priceCents === 0 ? 'Free': `$${formatCurrency(item.priceCents)} - `;
    const isChecked = item.id === cartitem.id

          html += `
          <div class="delivery-option">
                  <input type="radio" ${isChecked ? 'checked' : ''} class="delivery-option-input" 
                    name="delivery-option-${matchingproduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      ${dateString}
                    </div>
                    <div class="delivery-option-price">
                      ${priceString} Shipping
                    </div>
                  </div>
                </div> `;
  });
  return html; 
}

document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

document.querySelectorAll(".js-delete-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productId;
    removeFromCart(productId);
    console.log(cart);

    const containers = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    containers.remove();
    updateCartQuantity();
    //  savatoStoreage();
  });
});

document.querySelectorAll(".js-update-click").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;
    console.log("this is update page.");
    const containers = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    containers.classList.add("is-editing-qunatity");
  });
});

document.querySelectorAll(".js-save-link").forEach((savebtn) => {
  savebtn.addEventListener("click", () => {
    const productId = savebtn.dataset.productId;
    const containers = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    containers.classList.remove("is-editing-qunatity");
    console.log("this is save page.");
    const quntityInput = document.querySelector(
      `.js-quantity-input-${productId}`
    );
    const newQuantity = Number(quntityInput.value);
    if (newQuantity < 0 || newQuantity >= 1000) {
      alert("Qunatity must be at least 0 and less then 1000");
      return;
    }
    updateQuantity(productId, newQuantity);
    const qunaltityLabel = document.querySelector(
      `.js-quantity-input-${productId}`
    );
    qunaltityLabel.innerHTML = newQuantity;
    console.log("newqunatity", newQuantity);
    updateCartQuantity();
  });
});

function updateCartQuantity() {
  const cartQuantity = calculateCartQuantity();
  document.querySelector(
    ".js-return-to-home-link"
  ).innerHTML = `${cartQuantity} items`;
}
updateCartQuantity();
updateQuantity();
