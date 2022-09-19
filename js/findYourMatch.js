//fetching api
let allUsersArray = [];

async function fetchUsers() {
  let objects = await fetch("https://randomuser.me/api/?results=100");
  userArray = await objects.json();
  allUsersArray = userArray.results;
}

//søk etter brukere i søkefeltet
const searchBar = document.querySelector(".searchbar");

searchBar.addEventListener("keyup", (e) => {
  let searchString = e.target.value.toLowerCase();
  if (e.target.value === "") {
    userList.innerHTML = "";
  } else {
    let filteredUsers = allUsersArray.filter((user) => {
      return (
        user.name.first.toLowerCase().includes(searchString) ||
        user.name.last.toLowerCase().includes(searchString) ||
        user.location.city.toLowerCase().includes(searchString) ||
        user.location.country.toLowerCase().includes(searchString)
      );
    });
    displayUsers(filteredUsers);
  }
});

let userList = document.querySelector(".user-list");
let infoContainer = document.querySelector(".info-container");

// Vis brukerne på siden

const displayUsers = (allUsersArray) => {
  userList.innerHTML = "";
  for (let i = 0; i < allUsersArray.length; i++) {
    let user = document.createElement("div");
    user.classList.add("user");
    let image = document.createElement("img");
    image.classList.add("image");
    let nameUser = document.createElement("h2");
    let genderUser = document.createElement("h3");
    let ageUser = document.createElement("p");
    let locationUser = document.createElement("p");
    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    let likeBtn = document.createElement("button");
    likeBtn.classList.add("like-btn");

    image.src = allUsersArray[i].picture.large;
    nameUser.innerHTML = `${allUsersArray[i].name.first} ${allUsersArray[i].name.last}`;
    genderUser.innerHTML = allUsersArray[i].gender;
    ageUser.innerHTML = allUsersArray[i].dob.age;
    locationUser.innerHTML = `From ${allUsersArray[i].location.city} in ${allUsersArray[i].location.country}`;
    deleteBtn.innerHTML = "DELETE";
    likeBtn.innerHTML = "&#10084; LIKE";
    user.append(
      image,
      nameUser,
      genderUser,
      ageUser,
      locationUser,
      deleteBtn,
      likeBtn
    );
    userList.append(user);

    // Button for liker og delete

    let allDeleteBtn = document.querySelectorAll(".delete-btn");
    allDeleteBtn[i].addEventListener("click", () => {
      deleteUser(allUsersArray, i);
    });
    let likeMatchBtn = document.querySelectorAll(".like-btn");
    likeMatchBtn[i].addEventListener("click", () => {
      likeMatchUsers(allUsersArray, i);
    });
  }
};

//Søk etter jenter, gutter eller begge deler ved og trykke på symbolbilde knapper

let femaleCard = document.querySelector("#female-btn");
femaleCard.addEventListener("click", () => {
  femaleData();
});

let maleFemaleCard = document.querySelector("#male-female-btn");
maleFemaleCard.addEventListener("click", () => {
  maleFemaleData();
});

let maleCard = document.querySelector("#male-btn");
maleCard.addEventListener("click", () => {
  maleData();
});

let femaleMembers = [];

function femaleData() {
  femaleMembers = allUsersArray.filter(function (data) {
    return data.gender == "female";
  });
  displayUsers(femaleMembers);
  console.log("Female", femaleMembers);
}

function maleFemaleData() {
  filteredUsers = allUsersArray.filter(function (data) {
    return data.gender == "gender";
  });
  displayUsers(allUsersArray);
  console.log("gender", allUsersArray);
}

let maleMembers = [];

function maleData() {
  maleMembers = allUsersArray.filter(function (data) {
    return data.gender == "male";
  });
  displayUsers(maleMembers);
}

//Funksjon for og slette bruker

function deleteUser(allUsersArray, index) {
  let userConfirm = prompt("Do you want to delete this person? yes/no");
  if (userConfirm == "yes") {
    allUsersArray.splice(index, 1);
    console.log(allUsersArray);
  } else {
    alert("The person is not deleted");
  }
  displayUsers(allUsersArray);
}

//Funksjon for pushe likeMatch til nytt array

let likeMatchArray = [];
function likeMatchUsers(allUsersArray, i) {
  likeMatchArray.push(allUsersArray[i]);
}

//Funksjon for og vise likeMatch

let showLikeMatch = document.querySelector(".show-like-match");
showLikeMatch.addEventListener("click", () => {
  showMatch();
});

function showMatch() {
  if (likeMatchArray == "") {
    alert("You have no matches on Date Night");
  } else {
    displayUsers(likeMatchArray);
  }
}

fetchUsers();
