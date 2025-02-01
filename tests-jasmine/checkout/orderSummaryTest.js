import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import {loadFromStorage } from "../../data/cart.js";

describe('test suite: renderOrderSummary', ()=>{
  it('display the cart', ()=>{
    document.querySelector('.js-test-container').innerHTML = `
    <div class="js-order-summary"></div> 
    <div class ="js-number-of-items"></div>
    `

  spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productID: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 7,
        deliveryOptionID: '1'
      },{
        productID: 'eldenringps5-id12345',
        quantity: 1,
        deliveryOptionID: '2'
      }]);
    });
    loadFromStorage();

    console.log

    renderOrderSummary();

    
  })
})