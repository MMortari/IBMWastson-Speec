const path = require("path");
const fs = require("fs");
const watson = require("watson-developer-cloud/text-to-speech/v1");
const watsonConfig = require("../configs/watson");

module.exports = {
  async text2Speech(req, res) {
    console.log("Inicio");
    const { text, voice } = req.body;

    // Watson configs
    const textToSpeech = new watson(watsonConfig);

    // Create the audio file
    var synthesizeParams = {
      text,
      accept: `audio/mp3`,
      voice
    };

    // Create the audio
    await textToSpeech.synthesize(synthesizeParams, async (err, data) => {
      if (err) {
        console.log(err);
        req.io.emit("audioFileCreate", { fileCreate: false });
        return;
      }
      await fs.writeFile(
        path.resolve(__dirname, "..", "..", "tmp", "audios", `file.mp3`),
        data,
        err => {
          if (err) {
            console.log(err);
            req.io.emit("audioFileCreate", { fileCreate: false });
          } else {
            console.log(`mp3 file created`);
            req.io.emit("audioFileCreate", { fileCreate: true });
          }
        }
      );
    });

    console.log("Final");

    return res.json(textToSpeech);
  },

  showAudio(req, res) {
    return res.sendFile(
      path.resolve(__dirname, "..", "..", "tmp", "audios", `file.mp3`)
    );
  },

  async listVoices(req, res) {
    // Watson configs
    const textToSpeech = new watson(watsonConfig);

    // list all watson voices available
    await textToSpeech.listVoices(null, (error, voices) => {
      if (error) {
        console.log(error);
        return res.status(400).json(error);
      } else {
        console.log("Getting voices");
        return res.json(voices);
      }
    });
  }
};
