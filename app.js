let cookies = 10000;
let cps = 0;
let clickValue = 1;
let displayedCookies;

const cookieDisplay = document.getElementById("cookieDisplay");
const shopContainer = document.getElementById("shopContainer");
const cpsDisplay = document.getElementById("cpsDisplay");
const bigCookie = document.getElementById("bigCookie");

async function fetchUpgrades() {
  const response = await fetch(
    "https://cookie-upgrade-api.vercel.app/api/upgrades"
  );
  const upgrades = await response.json();
  console.log(upgrades);
  generateUpgrages(upgrades);
}

function generateUpgrages(parameters) {
  for (let i = 0; i < parameters.length; i++) {
    let upgradeContainer = document.createElement("div");
    upgradeContainer.classList.add("upgradeBoxes");
    shopContainer.appendChild(upgradeContainer);
    let name = document.createElement("p");
    name.innerText = parameters[i].name;
    let cost = document.createElement("p");
    cost.innerText = parameters[i].cost;
    let cpsIncrease = document.createElement("p");
    cpsIncrease.innerText = parameters[i].increase;
    let buyButton = document.createElement("button");
    buyButton.classList.add(`buyButtons`);
    buyButton.innerText = "Buy";
    buyButton.addEventListener("click", function () {
      buyUpgrade(parameters[i]);
    });
    upgradeContainer.appendChild(name);
    upgradeContainer.appendChild(cost);
    upgradeContainer.appendChild(cpsIncrease);
    upgradeContainer.appendChild(buyButton);
  }
}

function buyUpgrade(upgrading) {
  if (cookies >= upgrading.cost) {
    cookies -= upgrading.cost;
    cps += upgrading.increase;
    cpsDisplay.innerText = `Your cps is: ${cps}`;
  } else if (cookies < upgrading.cost) {
    alert("You can't afford that!");
  }
}

function cpsCalculator() {}

setInterval(() => {
  cookies += cps;
  displayedCookies = cookies;
  displayedCookies = Math.round(displayedCookies);
  cookieDisplay.innerText = `You have ${displayedCookies} cookies`;
  localStorage.setItem("cookies", cookies);
}, 1000);

bigCookie.addEventListener("click", function () {
  cookies += clickValue;
});

fetchUpgrades();

// onload = () => {
//   cookies = localStorage.getItem("cookies") || 0;
// };
