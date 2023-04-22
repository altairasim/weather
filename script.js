const apiKey = "881797d47c82892bfbf7fbce6df7d0fb";
var long;
var lat;
const textInput = document.getElementById("textinput");
const dataList = document.getElementById("city");

function getLoc() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        lat = position.coords.latitude;
        long = position.coords.longitude;
        console.log(long, lat);
        fetchData();
      },
      (error) => {
        console.log(`error geting the location ${error.message}`);
      }
    );
  } else {
    console.log("location is not supported by this browser");
  }
}

function fetchData() {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error("network faild");
      }
      return res;
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      return data;
    })
    .then((data) => {
      const temp = document.getElementById("temp");
      temp.textContent = `${data.main.temp}\u00B0C`;
      const place = document.getElementById("place");
      place.innerText = data.name;
      const conditation = document.getElementById("condition");
      conditation.innerText = data.weather[0].main;
    })
    .catch((error) => console.log(error));
}
getLoc();
