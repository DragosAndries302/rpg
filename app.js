// ==========================================
// 1. PLAYER VARIABLES
// ==========================================

let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let currentMonster = 0;
let monsterHealth = 0;

// ==========================================
// 2. HTML ELEMENTS
// ==========================================

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const button4 = document.querySelector("#button4");

const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");

const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

const image = document.querySelector("#img");
const attackSound = document.querySelector("#attackSound"); // SOUND
const breakSound = document.querySelector("#breakSound"); // SOUND
const defendSound = document.querySelector("#defendSound"); // SOUND
const fightSound = document.querySelector("#fightSound"); // SOUND

// ==========================================
// 3. WEAPONS
// ==========================================

const weapons = [
  { name: "Laser Pistol", power: 5 },
  { name: "Plasma Blaster", power: 30 },
  { name: "Pulse Rifle", power: 50 },
  { name: "Ion Cannon", power: 100 },
  { name: "Railgun", power: 300 },
  { name: "Antimatter Cannon", power: 400 }
];

// ==========================================
// 4. MONSTERS
// ==========================================

const monsters = [
  {
    name: "Francisco",
    picture: "monster_3.png",
    level: 2,
    health: 15
  },
  {
    name: "Andres",
    picture: "monster_4.png",
    level: 10,
    health: 100
  },
  {
    name: "Hakan",
    picture: "monster_2.png",
    level: 50,
    health: 400
  },
  {
    name: "Alejandro",
    picture: "monster_1.png",
    level: 100,
    health: 1000
  }
];

// ==========================================
// 5. LOCATIONS
// ==========================================

const locations = {

  spaceship: {
    buttonText: ["Go to Shop", "Go to Planet", "Go to Galaxy", "Fight Final Boss"],
    buttonFunctions: [goShop, goPlanet, goGalaxy, fightAlejandro],
    text: "Welcome to your RPG adventure! You are in your spaceship. Where do you want to go? Use the buttons above.",
    picture: "spaceship.png"
  },

  shop: {
    buttonText: ["Buy Health (10 gold)", "Buy Weapon (50 gold)", "Go to Spaceship", "Go to Spaceship"],
    buttonFunctions: [buyHealth, buyWeapon, goSpaceship, goSpaceship],
    text: "Welcome to the space shop!",
    picture: "shop.png"
  },

  planet: {
    buttonText: ["Fight Francisco", "Go to Galaxy", "Go to Shop", "Go to Spaceship"],
    buttonFunctions: [fightFrancisco, goGalaxy, goShop, goSpaceship],
    text: "You land on the planet. You see Francisco!",
    picture: "planet.png"
  },

  galaxy: {
    buttonText: ["Fight Andres", "Fight Hakan", "Fight Alejandro", "Go to Spaceship"],
    buttonFunctions: [fightAndres, fightHakan, fightAlejandro, goSpaceship],
    text: "You enter the galaxy. Your radar detects three monsters!",
    picture: "galaxy.png"
  },

  fight: {
    buttonText: ["Attack", "Dodge", "Block", "Run"],
    buttonFunctions: [attack, dodge, block, goSpaceship],
    text: "You are fighting a monster."
  },

  defeated: {
    buttonText: ["Go to Spaceship", "Go to Spaceship", "Go to Spaceship", "Go to Spaceship"],
    buttonFunctions: [goSpaceship, goSpaceship, goSpaceship, goSpaceship],
    text: "The monster has been defeated! You gain XP and gold.",
    picture: "defeated.png"
  },

  lose: {
    buttonText: ["Replay", "Replay", "Replay", "Replay"],
    buttonFunctions: [restart, restart, restart, restart],
    text: "You have been defeated!",
    picture: "gameOver.png"
  },

  win: {
    buttonText: ["Replay", "Replay", "Replay", "Replay"],
    buttonFunctions: [restart, restart, restart, restart],
    text: "Congratulations! You defeated Alejandro, the final boss! You win!",
    picture: "victory.png"
  }

};

// ==========================================
// 6. UPDATE THE GAME SCREEN
// ==========================================

// This function changes the buttons, text and picture.

function update(location) {

  monsterStats.style.display = "none";

  button1.innerText = location.buttonText[0];
  button2.innerText = location.buttonText[1];
  button3.innerText = location.buttonText[2];
  button4.innerText = location.buttonText[3];

  button1.onclick = location.buttonFunctions[0];
  button2.onclick = location.buttonFunctions[1];
  button3.onclick = location.buttonFunctions[2];
  button4.onclick = location.buttonFunctions[3];

  text.innerText = location.text;

  if (location.picture && image) {
    image.src = location.picture;
  }
}

// ==========================================
// 7. MOVEMENT BETWEEN LOCATIONS
// ==========================================

function goSpaceship() {
  update(locations.spaceship);
}

function goShop() {
  update(locations.shop);
}

function goPlanet() {
  update(locations.planet);
}

function goGalaxy() {
  update(locations.galaxy);
}

// ==========================================
// 8. SHOP FUNCTIONS
// ==========================================

function buyHealth() {

  if (gold >= 10) {

    gold -= 10;
    health += 10;

    updateStats();

    text.innerText = "You bought 10 health!";

  } else {

    text.innerText = "You do not have enough gold!";

  }
}

function buyWeapon() {

  if (currentWeapon < weapons.length - 1 && gold >= 50) {

    gold -= 50;
    currentWeapon++;

    updateStats();

    text.innerText = "You bought a " + weapons[currentWeapon].name + "!";

  } else if (currentWeapon === weapons.length - 1) {

    text.innerText = "You already have the best weapon!";

  } else {

    text.innerText = "You do not have enough gold!";

  }
}

// ==========================================
// 9. STARTING A FIGHT
// ==========================================

function fightFrancisco() {
  startFight(0);
}

function fightAndres() {
  startFight(1);
}

function fightHakan() {
  startFight(2);
}

function fightAlejandro() {
  startFight(3);
}

function startFight(monsterIndex) {

  currentMonster = monsterIndex;

  monsterHealth = monsters[currentMonster].health;

  update(locations.fight);
  fightSound.currentTime = 0; // SOUND
  fightSound.play(); // SOUND

  monsterStats.style.display = "block";

  monsterName.innerText = monsters[currentMonster].name;
  monsterHealthText.innerText = monsterHealth;

  if (image) {
    image.src = monsters[currentMonster].picture;
  }

}

// ==========================================
// 10. ATTACK FUNCTION
// ==========================================

function attack() {

  const weapon = weapons[currentWeapon];
  attackSound.currentTime = 0; // SOUND
  attackSound.play(); // SOUND

  // Player attacks monster.

  monsterHealth -= weapon.power;

  text.innerText = "You attack " + monsters[currentMonster].name +
    " with your " + weapon.name + "!";

  // Check whether monster has been defeated.

  if (monsterHealth <= 0) {

    defeatMonster();
    return;

  }

  // Monster attacks player.

  const damage = monsters[currentMonster].level * 2;

  health -= damage;

  text.innerText += " The monster attacks you for " + damage + " damage.";

  // Update the screen.

  updateStats();
  monsterHealthText.innerText = monsterHealth;

  if (health <= 0) {
    lose();
  }

}

// ==========================================
// 11. DODGE FUNCTION
// ==========================================

function dodge() {

  defendSound.currentTime = 0; // SOUND
  defendSound.play(); // SOUND
  text.innerText = "You dodge the monster's attack!";

}

// ==========================================
// 12. BLOCK FUNCTION
// ==========================================

function block() {

  const damage = monsters[currentMonster].level * 2;

  const reducedDamage = Math.ceil(damage / 2);
  defendSound.currentTime = 0; // SOUND
  defendSound.play(); // SOUND

  health -= reducedDamage;

  text.innerText = "You block the attack and only take " +
    reducedDamage + " damage!";

  updateStats();

  if (health <= 0) {
    lose();
  }

}

// ==========================================
// 13. DEFEATING A MONSTER
// ==========================================

function defeatMonster() {

  const monster = monsters[currentMonster];
  breakSound.currentTime = 0; // SOUND
  breakSound.play(); // SOUND

  xp += monster.level;

  gold += monster.level * 10;

  updateStats();

  // The final monster wins the game.

  if (currentMonster === 3) {

    update(locations.win);

  } else {

    update(locations.defeated);

  }

}

// ==========================================
// 14. LOSING THE GAME
// ==========================================

function lose() {

  update(locations.lose);

}

// ==========================================
// 15. RESTARTING THE GAME
// ==========================================

function restart() {

  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  currentMonster = 0;
  monsterHealth = 0;

  updateStats();

  goSpaceship();

}

function updateStats() {
  xpText.innerText = xp;
  healthText.innerText = health;
  goldText.innerText = gold;
}

// ==========================================
// 16. START THE GAME
// ==========================================

updateStats();
goSpaceship();
