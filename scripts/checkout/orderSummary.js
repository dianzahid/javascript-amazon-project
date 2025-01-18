import {cart, removeFromCart, updateQuantity, updateDeliveryOption, updateCartQuantity} from "../../data/cart.js"
import {products} from "../../data/products.js"
import {formatCurrency} from "../utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"
import {deliveryOptions} from '../../data/deliveryOptions.js';

export function renderOrderSummary(){

  let orderSummaryHTML = ''
  let totalPrice = 0;

  const paymentsummaryHTML = `        
  
        <div class="payment-summary">
            <div class="payment-summary-title">
              Order Summary
            </div>

            <div class="payment-summary-row">
              <div class = "js-items-order-summary">Items (${updateCartQuantity()}):</div>
              <div class="payment-summary-money">$42.25</div>
            </div>

            <div class="payment-summary-row">
              <div>Shipping &amp; handling:</div>
              <div class="payment-summary-money">$4.99</div>
            </div>

            <div class="payment-summary-row subtotal-row">
              <div>Total before tax:</div>
              <div class="payment-summary-money">$47.74</div>
            </div>

            <div class="payment-summary-row">
              <div>Estimated tax (10%):</div>
              <div class="payment-summary-money">$4.77</div>
            </div>

            <div class="payment-summary-row total-row">
              <div>Order total:</div>
              <div class="payment-summary-money">$52.51</div>
            </div>

            <button class="place-order-button button-primary">
              Place your order
            </button>
          </div>`


  cart.forEach((cartItem)=>{
  const productId = cartItem.productID;

  let deliveryOptionmatchingProduct; 
  let matchingProduct; 

  products.forEach((product)=>{

    if(product.id === productId){
  matchingProduct = product;

  const deliveryOptionId = cartItem.deliveryOptionID;

  let deliveryOption;

  deliveryOptions.forEach((option)=>{

    if(option.id === deliveryOptionId){
      deliveryOption = option; 

      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');

      const dateString = deliveryDate.format(
        'dddd, MMMM D'
      );



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
        $${formatCurrency(matchingProduct.priceCents)}
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
  document.querySelector('.js-order-summary').innerHTML = paymentsummaryHTML + orderSummaryHTML;



  const cartQuantity = updateCartQuantity();
  document.querySelector('.js-number-of-items').innerHTML = `${cartQuantity} items`

  }
    
  });

  }})})

  function deliveryOptionsHTML(matchingProduct, cartItem) {

    let html = '';

    deliveryOptions.forEach((deliveryOptions)=>{
      const today = dayjs();
      const deliveryDate = today.add(deliveryOptions.deliveryDays, 'days');

      const dateString = deliveryDate.format(
        'dddd, MMMM D'
      );

      const priceString = deliveryOptions.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOptions.priceCents)} -`;

      const isChecked = deliveryOptions.id === cartItem.deliveryOptionID;

      html +=
      `<div class="delivery-option js-delivery-option"
      data-product-id = "${matchingProduct.id}"
      data-delivery-option-id = "${deliveryOptions.id}" >
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
    const cartQuantity = updateCartQuantity()
    document.querySelector('.js-number-of-items').innerHTML = `${cartQuantity} items`
    document.querySelector('.js-items-order-summary').innerHTML = `items (${cartQuantity})`
 
  })
  })

  document.querySelectorAll('.js-update-link').forEach((link)=>[
    link.addEventListener(('click'),()=>{
    const {productId} = link.dataset
    const cartItemContainerElement = document.querySelector(`.js-cart-item-container-${productId}`)
    cartItemContainerElement.classList.add("is-editing-quantity");

    })
  ])

  document.querySelectorAll('.js-save-link').forEach((link)=>{
    link.addEventListener(('click'),()=>{
    const {productId} = link.dataset
    const cartItemContainerElement = document.querySelector(`.js-cart-item-container-${productId}`)
    cartItemContainerElement.classList.remove("is-editing-quantity");
    

    const inputElement = document.querySelector(`.js-quantity-input-${productId}`)
  const newQuantity = Number(inputElement.value);
  updateQuantity(productId,newQuantity);
  const cartQuantity = updateCartQuantity()
    document.querySelector('.js-number-of-items').innerHTML = `${cartQuantity} items`

   document.querySelector(`.js-quantity-label-${productId}`).innerHTML = `${inputElement.value}`

  })})


  document.querySelectorAll('.js-delivery-option').forEach((element)=>{
    element.addEventListener('click',()=>{
      const {productId, deliveryOptionId} = element.dataset;
      updateDeliveryOption(productId,deliveryOptionId);
      renderOrderSummary();
  });
});
}



