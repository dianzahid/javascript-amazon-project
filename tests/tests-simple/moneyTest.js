import {formatCurrency} from "../../scripts/utils/money.js";

console.log('test suite: formatCurrency')

// *Test Case* 

console.log('convert cents to dollars');

if(formatCurrency(2095) == '20.95'){
  console.log('pass')
}
else{
  console.log('fail');
}

// **Edge cases**

console.log('works with 0');

if(formatCurrency(0) == '0.00'){
  console.log('pass')
}
else{
  console.log('fail');
}

console.log('Rounding up nearest cent');

if(formatCurrency(200.5) == '2.01'){
  console.log('pass')
}
else{
  console.log('fail');
}

console.log('Rounding down nearest cent');

if(formatCurrency(200.4) == '2.00'){
  console.log('pass')
}
else{
  console.log('fail');
}



