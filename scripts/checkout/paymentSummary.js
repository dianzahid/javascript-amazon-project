import { cart, updateCartQuantity } from "../../data/cart.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { products, getProduct } from "../../data/products.js";
import formatCurrency from "../utils/money.js";

export function renderPaymentSummary() {

  let priceCents = 0;
  let totalProductPrice = 0;
  let deliveryPrice = 0;
  let totalDeliveryPrice = 0;

  cart.forEach((cartItem)=>{
   const product = getProduct(cartItem.productID)

      priceCents += cartItem.quantity * product.priceCents
      totalProductPrice = formatCurrency(priceCents);
     const deliveryOption = getDeliveryOption(cartItem.deliveryOptionID);
     deliveryPrice += deliveryOption.priceCents;
     totalDeliveryPrice = formatCurrency(deliveryPrice);

    }
  )
const totalPreTax = Number(totalDeliveryPrice) + Number(totalProductPrice);
console.log(totalPreTax)
const tempTotalTaxPrice = 0.1 * totalPreTax
const totalTaxPrice = Number(tempTotalTaxPrice.toFixed(2))
console.log(totalTaxPrice);

const totalPrice = Number(totalPreTax) + Number(totalTaxPrice);
console.log (totalPrice);

const paymentsummaryHTML = `        

<div class="payment-summary-title">
              Order Summary
            </div>

            <div class="payment-summary-row">
              <div class = "js-items-order-summary">Items (${updateCartQuantity()}):</div>
              <div class="payment-summary-money">$${totalProductPrice}</div>
            </div>

            <div class="payment-summary-row">
              <div>Shipping &amp; handling:</div>
              <div class="payment-summary-money">$${totalDeliveryPrice}</div>
            </div>

            <div class="payment-summary-row subtotal-row">
              <div>Total before tax:</div>
              <div class="payment-summary-money">$${totalPreTax}</div>
            </div>

            <div class="payment-summary-row">
              <div>Estimated tax (10%):</div>
              <div class="payment-summary-money">$${totalTaxPrice}</div>
            </div>

            <div class="payment-summary-row total-row">
              <div>Order total:</div>
              <div class="payment-summary-money">$${totalPrice}</div>
            </div>

            <button class="place-order-button button-primary">
              Place your order
            </button>
`;

document.querySelector('.js-payment-summary').innerHTML = paymentsummaryHTML;
}