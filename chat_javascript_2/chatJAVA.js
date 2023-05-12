const CHANNEL_ID = "Y7d21teUsxwqKqoi";
var drone = new ScaleDrone(CHANNEL_ID);

drone.on("open", function (error) {
  if (error) {
    alert("Error connecting to Scaledrone");
    return console.error(error);
  } else {
    console.log("Successfully connected to ScaleDrone");
  }
  var room = drone.subscribe("general-chat");

  room.on("open", function (error) {
    if (error) {
      alert("Error connecting to room");
      return console.error(error);
    } else {
      console.log("Connected to room");
    }
  });

  room.on("data", addMessageToScreen);
});

function slanjeForme(event) {
  var nameInput = document.querySelector(".input.ime");
  var contentInput = document.querySelector(".input.poruka");
  var date = new Date().toLocaleString();

  if (nameInput.value && contentInput.value) {
    sendMessageToScaleDrone(nameInput.value, contentInput.value, date);
    contentInput.value = "";
  }
}

function sendMessageToScaleDrone(name, content, date) {
  drone.publish({
    room: "general-chat",
    message: {
      name: name,
      content: content,
      date: date,
    },
  });
}

function otvoriFormu() {
  document.querySelector(".otvoriFormu").style.display = "block";
  document.querySelector(".otvaranje").style.display = "none";
  document.querySelector(".input.ime").value = "";
  document.querySelector(".input.poruka").value = "";
}

function resetiranje() {
  location.reload();
  document.querySelector(".input.ime").value = "";
  document.querySelector(".input.poruka").value = "";
}

function addMessageToScreen(message) {
  var input = document.querySelector(".input.ime").value;
  var divLijevo = document.createElement("div");
  var h6Lijevo = document.createElement("h6");
  var pDatumLijevo = document.createElement("p");
  var divDesno = document.createElement("div");
  var h6Desno = document.createElement("h6");
  var pDatumDesno = document.createElement("p");
  var ispisPoruka = document.querySelector(".porukeIspis");
  h6Lijevo.innerHTML = `<b>${message.name}</b>:`;
  divLijevo.innerHTML = message.content;
  pDatumLijevo.innerHTML = message.date;
  h6Desno.innerHTML = `<b>${message.name}</b>:`;
  divDesno.innerHTML = message.content;
  pDatumDesno.innerHTML = message.date;
  divLijevo.classList.add("porukeLijevo");
  h6Lijevo.classList.add("nadimakLijevo");
  pDatumLijevo.classList.add("datumLijevo");
  divDesno.classList.add("porukeDesno");
  h6Desno.classList.add("nadimakDesno");
  pDatumDesno.classList.add("datumDesno");
  if (input !== message.name) {
    ispisPoruka.append(h6Lijevo, divLijevo, pDatumLijevo);
  } else {
    ispisPoruka.append(h6Desno, divDesno, pDatumDesno);
  }
  ispisPoruka.scrollTop = ispisPoruka.scrollHeight;
}
