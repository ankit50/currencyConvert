const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies";
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const msg = document.querySelector(".msg");

for(let select of dropdowns){
    for(currCode in countryList){
            let newOption = document.createElement("option");
            newOption.innerHTML = currCode;   
            newOption.value=currCode;
            select.append(newOption);
            if(select.name==="from" && currCode === "USD"){
                    newOption.selected = true;
            }else if(select.name==="to" && currCode === "NPR"){
                    newOption.selected = true;
            }
            select.append(newOption);
    }
select.addEventListener("change", (event)=>{
        let code = event.target.value;
        let ccode = countryList[code];
        let newSrc = `https://flagsapi.com/${ccode}/flat/64.png`;
        let img=event.target.parentElement.querySelector("img");
        img.src = newSrc;
})
}

btn.addEventListener("click", async (event)=>{
        event.preventDefault();
        let amt = document.querySelector(".amount input");
        let amtValue = amt.value;
        if(amtValue ==="" || amtValue<1){
                amtValue=1;
                amt.value="1";
        }
        const url = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
        const response = await fetch(url);
        const data = await response.json();
        const  rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
        let finalAmt = amtValue*rate;
        msg.innerHTML = `${amtValue} ${fromCurr.value}=${finalAmt} ${toCurr.value}`;

})