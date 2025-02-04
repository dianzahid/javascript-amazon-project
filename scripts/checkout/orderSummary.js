import {cart, removeFromCart, updateQuantity, updateDeliveryOption, updateCartQuantity} from "../../data/cart.js"
import {products, getProduct} from "../../data/products.js"
import {formatCurrency} from "../utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"
import {deliveryOptions, getDeliveryOption, calculateDeliveryDate} from '../../data/deliveryOptions.js';
import {renderPaymentSummary} from "./paymentSummary.js";
import { renderCheckoutheader } from "../../styles/pages/checkout/checkoutHeader.js";

export function renderOrderSummary(){

  renderCheckoutheader();

  let orderSummaryHTML = ''
  let totalPrice = 0;

  cart.forEach((cartItem)=>{

  const productId = cartItem.productID;

  const matchingProduct = getProduct(productId); 
    
  const deliveryOptionId = cartItem.deliveryOptionID;

  const deliveryOption = getDeliveryOption(deliveryOptionId);

 const dateString = calculateDeliveryDate(deliveryOption);

  let html = `   
  <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
    <div class="delivery-date">
      Delivery date: ${dateString}
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${matchingProduct.image}">

      <div class="cart-item-details">
        <div class="product-name">
        ${matchingProduct.name}
        </div>
        <div class="product-price">
        $${matchingProduct.getPrice()}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">
            ${cartItem.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
            Update
          </span>
          <input class="quantity-input js-quantity-input-${matchingProduct.id}"><span class = "save-quantity-link js-save-link link-primary" data-product-id="${matchingProduct.id}">Save</span>
          <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
      ${deliveryOptionsHTML(matchingProduct, cartItem)}
      </div>
    </div>
  </div>`

  orderSummaryHTML += html;
  document.querySelector('.js-order-summary').innerHTML = orderSummaryHTML;

})

  function deliveryOptionsHTML(matchingProduct, cartItem) {

    let html = '';

    deliveryOptions.forEach((deliveryOption)=>{

      const dateString = calculateDeliveryDate(deliveryOption);

      const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionID;

      html +=
      `<div class="delivery-option js-delivery-option"
      data-product-id = "${matchingProduct.id}"
      data-delivery-option-id = "${deliveryOption.id}" >
          <input type="radio"
          ${isChecked ? 'checked': ''}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
            ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>`


    });
    return html;

  }
  document.querySelectorAll('.js-delete-link').forEach((link)=>{
  link.addEventListener('click',()=>{
    const {productId} = link.dataset
    
    removeFromCart(productId);
    
    const container = document.querySelector(`.js-cart-item-container-${productId}`)
    container.remove();
    renderPaymentSummary();
    renderOrderSummary();

  })
  })

  document.querySelectorAll('.js-update-link').forEach((link)=>{
    link.addEventListener(('click'),()=>{
    const {productId} = link.dataset
    const cartItemContainerElement = document.querySelector(`.js-cart-item-container-${productId}`)
    cartItemContainerElement.classList.add("is-editing-quantity");
    })
})

  document.querySelectorAll('.js-save-link').forEach((link)=>{
    link.addEventListener(('click'),()=>{
    const {productId} = link.dataset
    const cartItemContainerElement = document.querySelector(`.js-cart-item-container-${productId}`)
    cartItemContainerElement.classList.remove("is-editing-quantity");

    const inputElement = document.querySelector(`.js-quantity-input-${productId}`)
  const newQuantity = Number(inputElement.value);
  if(newQuantity === 0){

    const {productId} = link.dataset
    
    removeFromCart(productId);
    
    const container = document.querySelector(`.js-cart-item-container-${productId}`)
    container.remove();
  }
  else{
  updateQuantity(productId,newQuantity);
   document.querySelector(`.js-quantity-label-${productId}`).innerHTML = `${inputElement.value}`
  }
  renderPaymentSummary();
  renderOrderSummary();
  })})

  document.querySelectorAll('.js-delivery-option').forEach((element)=>{
    element.addEventListener('click',()=>{
      const {productId, deliveryOptionId} = element.dataset;
      updateDeliveryOption(productId,deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
  });
});

}

renderOrderSummary();
renderPaymentSummary();



