import { cart, updateCartQuantity } from "../../data/cart.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { products, getProduct } from "../../data/products.js";
import formatCurrency from "../utils/money.js";

export function renderPaymentSummary() {

  let priceProductCents = 0;
  let deliveryPriceCents = 0;

  cart.forEach((cartItem)=>{
   const product = getProduct(cartItem.productID)

      priceProductCents += cartItem.quantity * product.priceCents
     const deliveryOption = getDeliveryOption(cartItem.deliveryOptionID);
     deliveryPriceCents += deliveryOption.priceCents;

    }
  )
const totalPreTax = Number(deliveryPriceCents) + Number(priceProductCents);

const totalTaxPrice = 0.1 * totalPreTax

const totalPrice = Number(totalPreTax) + Number(totalTaxPrice);

const paymentsummaryHTML = `        

<div class="payment-summary-title">
              Order Summary
            </div>

            <div class="payment-summary-row">
              <div class = "js-items-order-summary">Items (${updateCartQuantity()}):</div>
              <div class="payment-summary-money">$${formatCurrency(priceProductCents)}</div>
            </div>

            <div class="payment-summary-row">
              <div>Shipping &amp; handling:</div>
              <div class="payment-summary-money">$${formatCurrency(deliveryPriceCents)}</div>
            </div>

            <div class="payment-summary-row subtotal-row">
              <div>Total before tax:</div>
              <div class="payment-summary-money">$${formatCurrency(totalPreTax)}</div>
            </div>

            <div class="payment-summary-row">
              <div>Estimated tax (10%):</div>
              <div class="payment-summary-money">$${formatCurrency(totalTaxPrice)}</div>
            </div>

            <div class="payment-summary-row total-row">
              <div>Order total:</div>
              <div class="payment-summary-money">$${formatCurrency(totalPrice)}</div>
            </div>

            <button class="place-order-button button-primary">
              Place your order
            </button>
`;

document.querySelector('.js-payment-summary').innerHTML = paymentsummaryHTML;
}