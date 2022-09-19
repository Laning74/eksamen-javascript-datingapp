//fetching api

let allUsersArray = [];

async function getRandomUser() {
  let response = await fetch("https://randomuser.me/api/");
  let data = await response.json();
  let user = data.results[0];
  displayUser(user);
}

// container for random user
let userProfileContainer = document.querySelector(".user-profile-container");
//skjul random user container
userProfileContainer.style.display = "none";

// Date Night tittel
let dateNight = document.querySelector(".tittel-date-night");
//skjul date date night
dateNight.style.display = "none";

//Viser random user

function displayUser(user) {
  const name = document.getElementById("name");
  const gender = document.getElementById("gender");
  const age = document.getElementById("age");
  const location = document.getElementById("location");
  const image = document.getElementById("image");

  name.innerText = `${user.name.first} ${user.name.last}`;
  gender.innerText = `${user.gender}`;
  age.innerText = `${user.dob.age} years old`;
  location.innerText = `From ${user.location.city} in ${user.location.country}`;
  image.setAttribute("src", `${user.picture.large}`);
}

// Hover effekt for location

let infoLocation = document.body.querySelectorAll(".profile-top");
for (let location of infoLocation) {
  location.addEventListener("mouseover", function () {
    this.querySelector("#location").style.visibility = "visible";
  });
  location.addEventListener("mouseout", function () {
    this.querySelector("#location").style.visibility = "hidden";
  });
}

//Trykk for og få match på tallet 6

let dice = {
  sides: 6,
  roll: function () {
    let randomNumber = Math.floor(Math.random() * this.sides) + 1;
    return randomNumber;
  },
};
let placeholder = document.getElementById("placeholder");
function printNumber(number) {
  placeholder.innerHTML = number;
}

let button = document.getElementById("button");

button.onclick = function () {
  let result = dice.roll();
  printNumber(result);
  if (result == 6) {
    userProfileContainer.style.display = "block";
  }
};

// Button for delete og Match

let allDeleteBtn = document.querySelector(".delete-btn");
allDeleteBtn.addEventListener("click", () => {
  deleteUser(allUsersArray);
  userProfileContainer.style.display = "none";
});

let matchBtn = document.querySelector(".like-btn");
matchBtn.addEventListener("click", () => {
  showDate(dateNight);
  dateNight.style.display = "block";
});

function showDate() {}

//Funksjon for og slette bruker

function deleteUser(allUsersArray) {
  alert("Sorry you did not like the match, try again, good luck!");
  allUsersArray.splice(1) + getRandomUser(allUsersArray);
  dateNight.style.display = "none";
  placeholder.innerHTML = "?";
}

getRandomUser();

// Hjerter på skjermen - Kilde
// https://medium.com/front-end-weekly/how-to-fill-your-website-with-lovely-valentines-hearts-d30fe66d58eb

let brd = document.createElement("DIV");
document.body.insertBefore(brd, document.getElementById("board"));

const duration = 3000;
const speed = 0.5;
const cursorXOffset = 0;
const cursorYOffset = -5;

let hearts = [];

function generateHeart(x, y, xBound, xStart, scale) {
  let heart = document.createElement("DIV");
  heart.setAttribute("class", "heart");
  brd.appendChild(heart);
  heart.time = duration;
  heart.x = x;
  heart.y = y;
  heart.bound = xBound;
  heart.direction = xStart;
  heart.style.left = heart.x + "px";
  heart.style.top = heart.y + "px";
  heart.scale = scale;
  heart.style.transform = "scale(" + scale + "," + scale + ")";
  if (hearts == null) hearts = [];
  hearts.push(heart);
  return heart;
}

let down = false;
let eventHeart = null;

document.onmousedown = function (e) {
  down = true;
  eventHeart = e;
};

document.onmouseup = function (e) {
  down = false;
};

document.onmousemove = function (e) {
  eventHeart = e;
};

document.ontouchstart = function (e) {
  down = true;
  eventHeart = e.touches[0];
};

document.ontouchend = function (e) {
  down = false;
};

document.ontouchmove = function (e) {
  eventHeart = e.touches[0];
};

let before = Date.now();
let id = setInterval(frame, 5);
let gr = setInterval(check, 100);

function frame() {
  let current = Date.now();
  let deltaTime = current - before;
  before = current;
  for (i in hearts) {
    let heart = hearts[i];
    heart.time -= deltaTime;
    if (heart.time > 0) {
      heart.y -= speed;
      heart.style.top = heart.y + "px";
      heart.style.left =
        heart.x +
        ((heart.direction *
          heart.bound *
          Math.sin((heart.y * heart.scale) / 30)) /
          heart.y) *
          100 +
        "px";
    } else {
      heart.parentNode.removeChild(heart);
      hearts.splice(i, 1);
    }
  }
}

function check() {
  if (down) {
    let start = 1 - Math.round(Math.random()) * 2;
    let scale = Math.random() * Math.random() * 0.8 + 0.2;
    let bound = 30 + Math.random() * 20;
    generateHeart(
      eventHeart.pageX - brd.offsetLeft + cursorXOffset,
      eventHeart.pageY - brd.offsetTop + cursorYOffset,
      bound,
      start,
      scale
    );
  }
}
