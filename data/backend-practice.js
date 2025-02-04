const xhr = new XMLHttpRequest();

//wait for response to load to show in console
xhr.addEventListener('load',()=>{
console.log(xhr.response);
});

//send get request from the url 
xhr.open('GET', 'https://supersimplebackend.dev/products/first');
xhr.send();
