import { addToCart, cart, loadFromStorage } from "../../data/cart.js";

describe('test suite: addToCart', ()=>{

  it('adds an existing product to cart', ()=>{

    spyOn(localStorage, 'setItem');

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productID: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionID: '1'
      }]);
    });
    loadFromStorage();


    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productID).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);

  })

  it('adds new product to cart', ()=>{

    spyOn(localStorage, 'setItem');

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });

    console.log(cart);

    loadFromStorage();

    document.querySelector('.js-test-container').innerHTML = `
    <select class="js-quantity-select-e43638ce-6aa0-4b85-b27f-e1d07eb678c6">
      <option value="1" selected>1</option>
    </select>
  `;
  

    console.log(cart);

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productID).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);
  })

});