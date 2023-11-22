// <!-- Powered by Ahmedraza https://ahmedrazabaloch.netlify.app -->
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/serviceworker.js")
      .then((res) => console.log(res, "service worker registered"))
      .catch((err) => console.log("service worker not registered", err));
  });
}
window.addEventListener("load", () => {
  Notification.requestPermission((result) => {
    if (result === "granted") {
      // displayConfirmNotification();
    }
  });
});
// Logout
const logoutBtn = document
  .getElementById("logoutBtn")
  .addEventListener("click", () => {
    location.href = "index.html";
  });
// Namaz & Task Section Show Hide
const namaz = document.querySelector(".namaz"),
  hideSection = document.querySelector(".sectionBox"),
  userSelect = document.querySelector(".hide"),
  hidehoja = document.querySelector("#hidehoja");
setTimeout(() => {
  namaz.style.display = "block";
}, 1500);

function newTask() {
  namaz.style.display = "none";
  hideSection.style.display = "block";
  userSelect.style.display = "block";
  hideinnher.style.display = "flex";
}
function namazR() {
  hideinnher.style.display = "none";
  namaz.style.display = "block";
  hideSection.style.display = "none";
  userSelect.style.display = "none";
}
// >>>>>> Main Page Code <<<<<<
// Set date on top of the display
let date = document.getElementById("date"),
  clockDate = moment().format("ll");
date.innerHTML = clockDate;

// Set Timer on top of the display
const timerClock = document.getElementById("time");
setInterval(() => {
  let currentTime = moment().format("LTS");
  timerClock.innerHTML = currentTime;
}, 1000);
// Namaz Timing
const fajar = "5:30am",
  zuhar = "12:30pm",
  asar = "3:45pm",
  magrib = "6:15pm",
  esha = "8:30pm";

let timeClock;
let notification;
setInterval(function () {
  const currentDate = new Date();
  const currentHours = currentDate.getHours();
  let currentMinutes = currentDate.getMinutes();
  // Set minutes
  currentMinutes = currentMinutes < 10 ? `0${currentMinutes}` : currentMinutes;
  // Create formatted time
  timeClock = moment(`${currentHours}:${currentMinutes}`, "HH:mm").format(
    "h:mma"
  );
  // Check if the current time matches any prayer time
  if (fajar == timeClock) {
    notification = new Notification("Fajar Prayer Time");
  }
  if (zuhar == timeClock) {
    notification = new Notification("Zuhar Prayer Time");
  }
  if (asar == timeClock) {
    notification = new Notification("Asar Prayer Time");
  }
  if (magrib == timeClock) {
    notification = new Notification("Magrib Prayer Time");
  }
  if (esha == timeClock) {
    notification = new Notification("Esha Prayer Time");
  }
}, 1000);

// Getting Data from User
let userTitles = document.getElementById("userTitle"),
  userDiscerption = document.getElementById("userDis"),
  inputTime = document.getElementById("setTime"),
  inputDate = document.getElementById("setDate"),
  formattedTime;
// Set & Show Data
let hideinnher = document.getElementById("hideinnher");
let flag = false;
function saveData() {
  // Validation
  if (userTitles.value.trim() === "") {
    Swal.fire({
      title: "Title Can't be empty",
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `,
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `,
      },
    });
  } else {
    if (userDiscerption.value.trim() === "") {
      Swal.fire({
        title: "Discerption Can't be empty",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `,
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `,
        },
      });
    } else {
      formattedTime = moment(inputTime.value, "HH:mm").format("h:mm a");
      //Set Reminder
      hideinnher.innerHTML += `
  <div class="sectionBox animate__animated animate__fadeInLeft">
    <div class="secDisply">
      <div class="alarm">
        <p>Time: <span id="alramSet">${formattedTime || "03:00"}</span></p>
        <span> | </span>
        <p>Date: <span id="dateSet">${inputDate.value || "Every-Day"}</span></p>
        </div>
        <div class="reminderValue">
         <p id="titles">${userTitles.value}</p>
         <p id="discerption">${userDiscerption.value}</p>
        </div>
      </div>
    </div>
  `;
      userTitles.value = "";
      userDiscerption.value = "";
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "set alarm",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  }
  // Matching Time & send notification
  flag = true;
  setInterval(function () {
    if (flag) {
      const currentDate = new Date();
      const currentHours = currentDate.getHours();
      let currentMinutes = currentDate.getMinutes();
      // Create formatted time string
      timeClock = moment(`${currentHours}:${currentMinutes}`, "HH:mm").format(
        "h:mm a"
      );
      if (formattedTime == timeClock) {
        if (!("Notification" in window)) {
          alert("This browser does not support desktop notification");
        } else if (Notification.permission === "granted") {
          const notification = new Notification("Reminder! Time's up");
        } else if (Notification.permission !== "denied") {
          Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
              const notification = new Notification(
                "Notification Permission Granted"
              );
            }
          });
        }
        flag = false;
      }
    }
  }, 1000);
}
