import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = "Calculator"; // title at top of calculator.
  subText = '';  // upper part display text of the calculator.
  mainText = ''; // Lower part (bigger) display text of calculator.
  tempText = ''; // temp var to store data for evalution for main display
  calculationString = ''; //final string for evalution.
  answered = false; // flag to check if answer has been provided or not.
  operatorSet = false; // flag to check that two operator are together or not
  stringLimit = 15; // limit the number of entered number or operators in the main display, also keep checks on decimals.

  //Function called when every numeric or operator key is pressed.
  //This function also checks that 2 operators are not entered together.
  pressKey(key: string) {
    if(this.answered)this.answered=false;
    if(this.mainText==="ERROR" || this.mainText==="NaN")this.allClear();
    if (key === '/' || key === '*' || key === '-' || key === '+' || key === '%') {
      const lastKey =  this.mainText[this.mainText.length - 1]; // last recent char in main text.
      if (lastKey === '/' || lastKey === '*' || lastKey === '-' || lastKey === '+' || lastKey === '%')  {
        this.operatorSet = true; // two operators together
      }
      if ((this.operatorSet) || (this.mainText === '')) {
        return; //do nothing if 2 operators together
      }
    }
    if(this.mainText.length < this.stringLimit && this.mainText.length>=0){
      this.subText="";
    }
    else if(this.mainText.length>= this.stringLimit){
      this.subText="Too much Numbers!";
      return;
    }
    this.mainText += key; // adding the char to main text
  }

  //function to delete 1 character from maindisplay field, when 'Del.' is pressed.
  del() {
    if(this.answered){
      this.allClear();
      this.answered=false;
    }
    else{
      this.mainText = this.mainText.substring(0, this.mainText.length - 1);
      if(this.mainText.length<this.stringLimit)this.subText="";
      if(this.mainText.length===0){this.operatorSet = false; this.subText="Nothing to delete!"} // display when field is clear
                                                                                                // still pressing 'Del.' key
    } 
    
  }

  //function to clear all fields. It is called when 'AC' is pressed.
  allClear() {
    this.mainText = '';
    this.subText = '';
    this.operatorSet = false;
  }

  //function to round off to 6 decimal places if encounterd any float type number
  precise_round(num:number, dec:number){ 
    var num_sign = num >= 0 ? 1 : -1;
    return (Math.round((num*Math.pow(10,dec))+(num_sign*0.0001))/Math.pow(10,dec)).toFixed(dec);
  }

  //This function is called when '=' button is pressed.
  getAnswer() {
    this.subText=this.mainText;
    this.tempText=eval(this.mainText).toString();
    if(this.tempText.length>this.stringLimit){
      if(this.tempText.includes('.')){ // condition to handle decimal points.
        this.tempText =this.precise_round(parseFloat(this.tempText),6).toString();
        if(this.tempText.length>this.stringLimit){ //still length is greather than stringLimit(let 9) example 3333.333333 
          this.tempText = 'ERROR';
          this.subText = 'Range Exceeded';
        }
      }
      else{ //withouth decimal and length is greather than stringLimit.
        this.tempText = 'ERROR';
        this.subText = 'Range Exceeded';
      }
    }
    this.mainText=this.tempText; // Finally display on main display
    this.answered = true; //  setting flag to esure answer have been evaluted and updated
  }
}