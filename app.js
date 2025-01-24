let cookies = 10000;
let cps = 0;
let clickValue = 1;
let displayedCookies;
cookies = localStorage.getItem("cookies") || 0;
cookies = Number(cookies);
cps = Number(localStorage.getItem("cps")) || 0;

const cookieDisplay = document.getElementById("cookieDisplay");
const shopContainer = document.getElementById("shopContainer");
const cpsDisplay = document.getElementById("cpsDisplay");
const bigCookie = document.getElementById("bigCookie");
const resetGame = document.getElementById("resetGame");

cpsDisplay.innerText = `Your cps is: ${cps}`;

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
    const clickSound = new Audio("assets/buySound.mp3");
    clickSound.play();
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
  localStorage.setItem("cps", cps);
}, 1000);

bigCookie.addEventListener("click", function () {
  cookies += clickValue;
  const clickSound = new Audio("assets/clickSound.mp3");
  clickSound.play();
});

fetchUpgrades();

function gameReset() {
  cookies = 0;
  cps = 0;
  cpsDisplay.innerText = `Your cps is: ${cps}`;
  cookieDisplay.innerText = `You have ${cookies} cookies`;
}

resetGame.addEventListener("click", function () {
  gameReset();
});
