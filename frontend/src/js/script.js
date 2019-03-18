// Configuration
const port = 3000;

// Socket.io
const socket = io.connect(`http://localhost:${port}`);
const baseURL = `http://localhost:${port}`;
// Axios connect
const api = axios.create({
  baseURL,
  headers: { "Content-Type": "multipart/form-data" }
});
const apiJson = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" }
});

// Socket.io receive data
socket.on("audioFileCreate", function(data) {
  if (data.fileCreate) {
    runAudio();
  } else {
    $("#alert")
      .text("Erro ao criar áudio!")
      .attr("class", "btn btn-danger float-right");
  }
});
socket.on("jsonFileCreate", function(data) {
  if (data.fileCreate) {
    // readFile();
  } else {
    $("#alert")
      .text("Erro ao criar arquivo!")
      .attr("class", "btn btn-danger float-right");
  }
});

// Function to send the file to the back-end
function sendFile() {
  $("#alert")
    .text("Enviando arquivo!")
    .attr("class", "btn btn-light float-right");
  const file = event.target.files[0];
  const data = new FormData(file);

  data.append("file", file);

  api
    .post("/pdf/send", data)
    .then(function(response) {
      event.preventDefault();
      if (response.status == 200) {
        console.log("File Sended");
        readFile();
        $("#alert")
          .text("Arquivo enviado")
          .attr("class", "btn btn-light float-right");
      } else {
        console.log("Error on send file!");
      }
    })
    .catch(function(err) {
      console.log(err);
    });

  event.preventDefault();
}

// Take the text inside the PDF through the back-end
function readFile() {
  const textarea = $("textarea");
  $("#alert")
    .text("Lendo arquivo!")
    .attr("class", "btn btn-light float-right");

  api
    .get("/pdf/read")
    .then(function(response) {
      const data = response.data;

      if (response.status == 200) {
        $("#alert")
          .text("Arquivo lido!")
          .attr("class", "btn btn-light float-right");

        if (data.hasOwnProperty("texts")) {
          text = "";
          data.texts.map(function(data) {
            text += data;
          });
          textarea.val(text);
        } else if (data.hasOwnProperty("text")) {
          textarea.val(data.text);
        }
      }
    })
    .catch(function(err) {
      if (err) console.log(err);
    });

  event.preventDefault();
}

// Send the information to make the audio file
function openAudio() {
  const audio = $("audio");
  const textarea = $("textarea").val();

  // console.log(`Tamanho do texto -> ${textarea.length}`);

  if (textarea.length <= 0) {
    $("#alert")
      .text("Insira um texto!")
      .attr("class", "btn btn-danger float-right");

    return;
  }

  if (textarea.length <= 2350) {
    const data = {
      text: textarea,
      voice: "pt-BR_IsabelaVoice"
    };

    apiJson
      .post("/watson/text", data)
      .then(function(response) {
        $("#alert")
          .text("Transformando em áudio")
          .attr("class", "btn btn-light float-right");
      })
      .catch(function(err) {
        console.log(err);
      });
  } else {
    $("#alert")
      .text("Texto muito grande!")
      .attr("class", "btn btn-danger float-right");
  }
}

// Take the audio file
function runAudio() {
  axios({
    url: `http://localhost:${port}/watson/audio`,
    method: "GET",
    responseType: "blob"
  }).then(response => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.getElementsByTagName("audio")[0];
    link.src = url;
    $("#alert")
      .text("Feito!")
      .attr("class", "btn btn-success float-right");
  });
}