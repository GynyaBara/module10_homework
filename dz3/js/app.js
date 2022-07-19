const input = document.querySelector("input");
const btnSend = document.querySelector(".btn-send");
const btnGeolacation = document.querySelector(".btn-geolacation");
const mes = document.querySelector(".messeg");

const geoLocation = document.querySelector(".geo-lacation");
const url = " wss://echo-ws-service.herokuapp.com";

let websocket;

function writeToScreen(message) {
  let par = document.createElement("p");
  par.innerHTML = message;
  mes.appendChild(par);
}

websocket = new WebSocket(url);
websocket.onmessage = function (evt) {
  writeToScreen("Сервер: " + evt.data);
};
btnSend.addEventListener("click", () => {
  const message = input.value;
  writeToScreen("Отправитель: " + message);
  websocket.send(message);
});

btnGeolacation.addEventListener("click", () => {
  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    geoLocation.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    geoLocation.textContent = "Ссылка на карту";
  };
  geoLocation.href = "";
  geoLocation.textContent = "";
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success);
  }
});
