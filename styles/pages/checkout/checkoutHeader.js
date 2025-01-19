import { updateCartQuantity } from "../../../data/cart.js";

export function renderCheckoutheader(){
      const cartQuantity = updateCartQuantity();
      document.querySelector('.js-number-of-items').innerHTML = `${cartQuantity} items`
}