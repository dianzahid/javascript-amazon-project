export let cart;

loadFromStorage();

export function loadFromStorage(){
  cart = JSON.parse(localStorage.getItem('cart'))

  if(!cart || cart.length === 0 ){
  cart = [{
    productID: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 7,
    deliveryOptionID: '1'
  },{
    productID: 'eldenringps5-id12345',
    quantity: 1,
    deliveryOptionID: '2'
  }];
  }
};

function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart))
};

export function addToCart(productId){

  //add the item to the cart
  let matchingItem = '';

  const productQuantity = document.querySelector(`.js-quantity-select-${productId}`)

  cart.forEach((cartItem)=>{
if(productId === cartItem.productID) {
  matchingItem = cartItem;
}
  });

  if(matchingItem) {
    matchingItem.quantity += Number(productQuantity.value);
  }
  else {
    cart.push({
      productID: productId, 
      quantity: Number(productQuantity.value),
      deliveryOptionID: '1'
  });
  }
  saveToStorage();
};

export function removeFromCart(productId){



const newCart = []

cart.forEach((cartItem)=>{

if (cartItem.productID !== productId){
  newCart.push(cartItem);
}
})

cart = newCart;
saveToStorage();
}

export function updateCartQuantity(){

  // update the cart quantity at the top right of the page
  let cartQuantity = 0;
  cart.forEach((cartItem)=>{
    cartQuantity += cartItem.quantity;
  })
  return cartQuantity;
}

export function updateQuantity(productId, newQuantity) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productID) {
      matchingItem = cartItem;
    }
  });

  matchingItem.quantity = newQuantity;

  saveToStorage();
}

export function updateDeliveryOption(productID,deliveryOptionID){

  let matchingItem;

  cart.forEach((cartItem)=>{
    if(cartItem.productID === productID){
      matchingItem = cartItem;
    }
  })

  matchingItem.deliveryOptionID = deliveryOptionID;

  saveToStorage();

};