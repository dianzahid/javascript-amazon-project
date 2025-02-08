import { renderOrderSummary } from "./checkout/orderSummary.js";
// import '../data/cart-class.js'
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
//import { loadProducts } from "../data/products.js";
// import '../data/backend-practice.js';

/*
new Promise((resolve)=>{
  console.log('start')
  loadProducts(()=>{
    resolve();
  });
}).then(()=>{
  console.log('next')
})
*/

renderOrderSummary();
renderPaymentSummary();


