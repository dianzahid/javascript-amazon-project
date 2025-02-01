import {formatCurrency} from "../scripts/utils/money.js";

describe('test suite: formatCurrency', ()=>{

  it('convert cents into dollars', ()=>{
    expect(formatCurrency(2095)).toEqual('20.95');
  });

  it('works with 0', ()=>{
    expect(formatCurrency(0)).toEqual('0.00');
   });

   it('rounds up the nearest cent', ()=>{
    expect(formatCurrency(200.5)).toEqual('2.01');
   })


})





