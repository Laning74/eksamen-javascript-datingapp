//Fetch Api

let allUsersArray = [];

async function fetchUsers() {
  let objects = await fetch("https://randomuser.me/api/?results=100");
  userArray = await objects.json();
  allUsersArray = userArray.results;
}

//Registrering og Login
//Upload og Display bilde - Kilde: https://www.youtube.com/watch?v=lzK8vM_wdoY
// Kan hente inn bilde, men får det ikke hentet inn i api i localStorage på nye brukere
// Så derfor er ikke bilde picture.large definert til og vises

const imageInput = document.querySelector("#image-input");
let uploadedImage = "";

imageInput.addEventListener("change", function () {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    uploadedImage = reader.result;
    document.querySelector(
      "#picture"
    ).style.backgroundImage = `url(${uploadedImage})`;
  });
  reader.readAsDataURL(this.files[0]);
});

// container for og registrere ny bruker
let registerUserContainer = document.querySelector(".register-user-container");
//skjul registrerings container
registerUserContainer.style.display = "none";

// Vis registrerings container ved klikk button
const showRegisterUser = document.querySelector(".register");
showRegisterUser.addEventListener("click", () => {
  registerUserContainer.style.display = "block";
});
// skjul registrerings container ved klikk på exit
let exitBtn = document.querySelector(".exit-btn");
exitBtn.addEventListener("click", () => {
  registerUserContainer.style.display = "none";
});

//saving user

const userForm = document.getElementById("userForm");
const userContainer = document.querySelector(".users");
const nameInput = userForm["name"];
const genderInput = userForm["gender"];
const ageInput = userForm["dob"];
const locationInput = userForm["location"];
const emailInput = userForm["email"];
const passwordInput = userForm["password"];

let listUsers = JSON.parse(localStorage.getItem("users")) || [];

const addUsers = (name, gender, dob, location, email, password) => {
  listUsers.push({
    name: {
      first: name,
    },
    gender,
    dob: {
      age: dob,
    },
    location: {
      city: location,
    },
    email,
    login: {
      password: password,
    },
  });

  localStorage.setItem("users", JSON.stringify(listUsers));

  return { picture, name, gender, dob, location };
};

// Create elements
const createUserElement = ({ name, gender, dob, location }) => {
  const userDiv = document.createElement("div");
  const userName = document.createElement("h2");
  const userGender = document.createElement("h3");
  const userAge = document.createElement("p");
  const userLocation = document.createElement("p");

  userName.innerText = `${name.first}`;
  userGender.innerText = gender;
  userAge.innerText = `${dob.age} years old`;
  userLocation.innerText = `From ${location.city}`;

  userDiv.append(userName, userGender, userAge, userLocation);
  userContainer.appendChild(userDiv);

  userContainer.style.display = allUsersArray.length === 0 ? "none" : "flex";
};

userContainer.style.display = allUsersArray.length === 0 ? "none" : "flex";

listUsers.forEach(createUserElement);

userForm.onsubmit = (e) => {
  e.preventDefault();

  const newUser = addUsers(
    nameInput.value,
    genderInput.value,
    ageInput.value,
    locationInput.value,
    emailInput.value,
    passwordInput.value
  );

  createUserElement(newUser);
  nameInput.value = "";
  genderInput.value = "";
  ageInput.value = "";
  locationInput.value = "";
  emailInput.value = "";
  passwordInput.value = "";
};

fetchUsers(allUsersArray);

// container for login
let loginUserContainer = document.querySelector(".login-user-container");
//skjul login container
loginUserContainer.style.display = "none";

// Vis login container ved klikk button
const showLoginUser = document.querySelector(".login");
showLoginUser.addEventListener("click", () => {
  loginUserContainer.style.display = "block";
});
// skjul login container ved klikk på exit
let exit2Btn = document.querySelector(".exit2-btn");
exit2Btn.addEventListener("click", () => {
  loginUserContainer.style.display = "none";
});

// Funksjon for og logge inn - og du blir sendt til Finn Perfekt Match side

function Login() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  const userCheck = listUsers.find((listUsers) => {
    return email == listUsers.email && password == listUsers.login.password;
  });

  if (userCheck) {
    location.href = "./findYourMatch.html";
  } else {
    alert("Wrong E-mail or password, try again");
  }
}

// Link hvis du allerede har registrert en bruker og vil gå til login
// eller hvis du ikke har registrert deg og vil gå til registreringsskjema

let linkRegister = document.querySelector(".link-register");
linkRegister.addEventListener("click", () => {
  loginUserContainer.style.display = "none";
  registerUserContainer.style.display = "block";
});

let linkLogin = document.querySelector(".link-login");
linkLogin.addEventListener("click", () => {
  registerUserContainer.style.display = "none";
  loginUserContainer.style.display = "block";
});
