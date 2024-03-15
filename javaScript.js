const Base_url ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";
const dropdown =  document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Access the data that i.s country list from another File(country.js)
for( let select of dropdown){
    for (currcode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText=currcode; 
        newOption.value= currcode;
        if (select.name === "from" && currcode === "USD"){
            newOption.selected = "selected";
        }else if(select.name === "to" && currcode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt) =>{
        updateflag(evt.target);
    });
}
// function for assign the value 1
const uptaeExchangeRate = async()=>{
    let amount = document.querySelector(".amount input");
    let amtvalue = amount.value;
    if(amtvalue ==="" || amtvalue <1){
        amtvalue = 1;
       amtvalue.value ="1"
    }


    let URL = `${Base_url}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];
    let finalAmount = amtvalue*rate;
    msg.innerText = `${amtvalue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`

}

const updateflag=(element) =>{
    let currcode = element.value;
    let counrtycode = countryList[currcode]; // IN ,EU
    let newsrc = `https://flagsapi.com/${counrtycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
};


btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    uptaeExchangeRate();
});

window.addEventListener("load",()=>{
    uptaeExchangeRate();
});
