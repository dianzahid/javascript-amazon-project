function Cart(localStorageKey) {

  const cart = {
    cartItems: undefined,
  
     loadFromStorage(){
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey))
    
      if(!this.cartItems || this.cartItems.length === 0 ){
        this.cartItems = [{
        productID: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 7,
        deliveryOptionID: '1'
      },{
        productID: 'eldenringps5-id12345',
        quantity: 1,
        deliveryOptionID: '2'
      }];
      }
    },
  
    saveToStorage(){
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems))
    },
  
    addToCart(productId){
  
      //add the item to the cart
      let matchingItem = '';
    
      const productQuantity = document.querySelector(`.js-quantity-select-${productId}`)
    
      this.cartItems.forEach((cartItem)=>{
    if(productId === cartItem.productID) {
      matchingItem = cartItem;
    }
      });
    
      if(matchingItem) {
        matchingItem.quantity += Number(productQuantity.value);
      }
      else {
        this.cartItems.push({
          productID: productId, 
          quantity: Number(productQuantity.value),
          deliveryOptionID: '1'
      });
      }
      this.saveToStorage();
    },
  
    removeFromCart(productId){
  
      const newCart = []
      
      this.cartItems.forEach((cartItem)=>{
      
      if (cartItem.productID !== productId){
        newCart.push(cartItem);
      }
      })
      
      this.cartItems = newCart;
  
      this.saveToStorage();
      },
  
      updateDeliveryOption(productID,deliveryOptionID){
  
        let matchingItem;
      
        this.cartItems.forEach((cartItem)=>{
          if(cartItem.productID === productID){
            matchingItem = cartItem;
          }
        })
      
        matchingItem.deliveryOptionID = deliveryOptionID;
      
        this.saveToStorage();
      
      },
  
      updateCartQuantity(){
  
        // update the cart quantity at the top right of the page
        let cartQuantity = 0;
        this.cartItems.forEach((cartItem)=>{
          cartQuantity += cartItem.quantity;
        })
        return cartQuantity;
      },
  
      updateQuantity(productId, newQuantity) {
        let matchingItem;
      
        this.cartItems.forEach((cartItem) => {
          if (productId === cartItem.productID) {
            matchingItem = cartItem;
          }
        });
      
        matchingItem.quantity = newQuantity;
      
        this.saveToStorage();
      }
  
  };

  return cart;
}

const cart = Cart('cart-oop');

const businessCart = Cart('cart-business');

cart.loadFromStorage();

businessCart.loadFromStorage();

console.log(cart)

console.log(businessCart)









 


