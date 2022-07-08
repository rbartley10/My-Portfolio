let numOne;
let numTwo;
let numThree;

let max;
let min;
let avg;
let median;
let range;



function calc()
{
  numOne = parseInt(document.getElementById("num1").value);
  numTwo = parseInt(document.getElementById("num2").value);
  numThree = parseInt(document.getElementById("num3").value);


  if(!isNaN(numOne) && !isNaN(numTwo) && !isNaN(numThree))
  {
  ///////////max median min/////////////
  if(numOne >= numTwo)
  {
    max = numOne;
    min = numTwo;
    if(max >= numThree && min <= numThree)
    {
      median = numThree;
    }
    else if(numThree>max)
    {
      max=numThree;
      median=numOne;
    }
    else
    {
      min=numThree;
      median=numTwo;
    }
  }
  else
  {
    max = numTwo;
    min = numOne;

    if(max >= numThree && min <= numThree)
    {
      median = numThree;
    }
    else if(numThree>max)
    {
      max=numThree;
      median=numTwo;
    }
    else
    {
      min=numThree;
      median=numOne;
    }
  }
  ///////////max median min/////////////


  /////avg////////
  avg=(parseFloat(numOne+numTwo+numThree)/3.0).toFixed(2);;
  /////range/////
  range=max-min;


  document.getElementById("max_span").innerHTML=max;
  document.getElementById("min_span").innerHTML=min;
  document.getElementById("med_span").innerHTML=median;
  document.getElementById("avg_span").innerHTML=avg;
  document.getElementById("range_span").innerHTML=range;


 }
  else
  {


   document.getElementById("max_span").innerHTML="";
   document.getElementById("min_span").innerHTML="";
   document.getElementById("med_span").innerHTML="";
   document.getElementById("avg_span").innerHTML="";
   document.getElementById("range_span").innerHTML="";

   setTimeout(function()
   {
     alert("Invlid input! Please enter three numbers");
   } , 100)






    //alert(numOne);
 }
}
