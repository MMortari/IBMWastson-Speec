# IBM Test

Name : Matheus Mortari <br>
Date : 18/03/2019 <br>
Contact : bmortari2000@gmail.com <br>
Objective:

- Create a application using any IBM Watson service

## How to install and run

- First, make sure that you have NodeJs installed on your computer:<br> `node -v`;
- Download the project on GitHub;
- Go to `backend/src/configs/watson.js`and put your IBM Watson credentials;
  ```javascript
  module.exports = {
    iam_apikey: "YOUR_APIKEY",
    url: "YOUR_URL"
  };
  ```
- With the terminal opened, write the following code:<br>
  `cd backend` to get into the back-end folder<br>
  `npm install` to install all dependencies<br>
  `npm start` to start the NodeJs project;
- If you want to use it as a web page, open the `index.html` file in frontend folder
- If you want to use it as a API, just make the request through `localhost:3000`

## The project

My idea basically was to create a PDF or a Text file reader, then take the text inside of him and transform it into audio through IBM Watson Text to Speech.

## The technology

- In the **back-end** I used the NodeJs, I thought it would be more challenging because for me it's a new stack that I've learning;
- In the **front-end** I used HTML, CSS and Javascript because I was looking for something simple and easy to implement;

## Next features

Somethings that I would like the fix and add in the project:

- Fix some problems transforming the PDF into Text;
- Fix some problems when the file is returned;
- Add a language translation into the text before transforming it into Audio;

## How it works

I divided the project into 3 parts: **PDF or Text**, **IBM Watson** and **Frontend**

### PDF or Tex

To take the text inside the PDF file, I used the `pdf2json` module, he was not what I was looking for and I'm having a lot of problems with him but he made his job.
To take the text inside the Text file, I used the `fs` module, he works really well.

### IBM Watson

When I first saw the documentation I've got a little scared but when I start using it, it was getting prettier easier!

First I created a **controller** and a **configuration** file:

In the **configuration** file have the API KEY and the URL;

```javascript
module.exports = {
  iam_apikey: "API_KEY",
  url: "URL"
};
```

In the **controller** file, have the `watson-developer-cloud` module and the configuration file, there's also have the Watson connect and the Speech synthesis module that creates the audio file.

```javascript
const watson = require("watson-developer-cloud/text-to-speech/v1");
const watsonConfig = require("../configs/watson");

// Watson connect
const textToSpeech = new watson(watsonConfig);

// Create the audio
await textToSpeech.synthesize(synthesizeParams, async (err, data) => {
  if (err) console.log(err);
  await fs.writeFile(
    path.resolve(__dirname, "..", "..", "tmp", "audios", `file.wav`),
    data,
    err => {
      if (err) console.log(err);
      else console.log(`wav file created`);
    }
  );
});
```

### Frontend

In the front-end I decided to use the basic, HTML, CSS and Javascript, and make something really simple. To make requests to the back-end, I used `Axios` module;

## API

To use it as an API the base URL to make the requests is `localhost:3000`;

### Text to Speech

The request URL id `http://localhost:3000/watson/text`, you must pass a JSON into the request body:

```javascript
{
	"text": "Olá pessoal, tudo bêm?",
	"voice": "pt-BR_IsabelaVoice"
}
```

If you got till here, thank you!
