const exchangeRate = document.querySelector(".exchangeRate");
const inputAmount = document.querySelector(".enterAmount");
const button = document.querySelector(".enterButton");
const from = document.querySelector(".from");
const to = document.querySelector(".to");
const value = document.querySelector(".value");
const country = document.querySelectorAll(".country select");
const exchangeItem = document.querySelector(".exchangeItem");

let dateObj = new Date();
let month = String(dateObj.getMonth() + 1).padStart(2, "0");
let day = String(dateObj.getDate()).padStart(2, "0");
let year = dateObj.getFullYear();
let output = year + "-" + month + "-" + day;

for (let select of country) {
  for (let key in countryList) {
    let newOpt = document.createElement("option");
    newOpt.innerHTML = key;
    newOpt.value = key;
    if (
      (select.className === "from" && key === "USD") ||
      (select.className === "to" && key === "INR")
    ) {
      newOpt.selected = "selected";
    }
    select.append(newOpt);
  }
  select.addEventListener("click", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (evt) => {
  let currCode = evt.value;
  let countryCode = countryList[currCode];
  const url = `https://flagsapi.com/${countryCode}/flat/64.png`;
  const img = evt.parentElement.querySelector("img");
  img.src = url;
};
//get result on btn click
button.addEventListener("click", () => {
  let inputAmt = inputAmount.value;
  info(inputAmt);
});
//get result on enter
inputAmount.addEventListener("keydown", (evt) => {
  if (evt.code == "Enter") {
    let inputAmt = inputAmount.value;
    info(inputAmt);
  }
});

async function info(inputAmt) {
  if (inputAmt == "" || inputAmt <= 0) {
    inputAmt = 1;
  }
  const fromCode = from.value.toLowerCase();
  const toCode = to.value.toLowerCase();
  const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${output}/v1/currencies/${fromCode}.json`;
  let response = await fetch(url);
  var data = await response.json();
  exchangeRate.innerHTML = data[`${fromCode}`][`${toCode}`];
  value.innerHTML = `${inputAmt} ${from.value} =${
    data[`${fromCode}`][`${toCode}`] * inputAmt
  } ${to.value}`;
}
//refresh
info(0);
//interchange
const interChange = () => {
  console.log("change");
  let newFrom = to.value;
  to.value = from.value;
  from.value = newFrom;
  updateFlag(from);
  updateFlag(to);
};
exchangeItem.addEventListener("click", () => {
  interChange();
  info(inputAmount.value);
});
