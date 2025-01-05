export let cart = [{
  productID: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity: 7
},{
  productID: 'eldenringps5-id12345',
  quantity: 1
}];

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

export function removeFromCart(productId){

const newCart = []

cart.forEach((cartItem)=>{

if (cartItem.productID !== productId){
  newCart.push(cartItem);
}

})

cart = newCart;
}