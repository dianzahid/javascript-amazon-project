export const cart = [];

export function addToCart(productId){

  //add the item to the cart
  let matchingItem = '';

  const productQuantity = document.querySelector(`.js-quantity-select-${productId}`)
  
  cart.forEach((cartItem)=>{
if(productId === cartItem.productId) {
  matchingItem = cartItem;
}
  });

  if(matchingItem) {
    matchingItem.quantity += Number(productQuantity.value);
  }
  else {
    cart.push({
      productId, 
      quantity: Number(productQuantity.value)
  });
  }

};