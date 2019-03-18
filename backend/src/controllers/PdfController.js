const PDFParser = require("pdf2json");
const path = require("path");
const fs = require("fs");
const textFunctions = require("../functions/text");
const LocalStorage = require("node-localstorage").LocalStorage;

const localStorage = new LocalStorage("./scratch");

// Initialize PDF variable
const pdfParser = new PDFParser();

module.exports = {
  // Store the PDF in a local storage
  async storePdf(req, res) {
    // create the file path
    const pathFile = path.resolve(
      __dirname,
      "..",
      "..",
      "tmp",
      "uploads",
      localStorage.getItem("oldFile")
    );

    // Delete the last file
    await fs.unlink(pathFile, err => {
      if (err) {
        console.log({ error: err });
        return res.status(400).json(err);
      }
    });

    console.log("Arquivo salvo!");

    return res.json(req.file);
  },

  // Read the PDF storaged localy
  async readPdf(req, res) {
    // Set the  pdf file path
    const pathFile = path.resolve(
      __dirname,
      "..",
      "..",
      "tmp",
      "uploads",
      localStorage.getItem("lastFile")
    );

    const pathJSon = path.resolve(
      __dirname,
      "..",
      "..",
      "tmp",
      "texts",
      "file.json"
    );

    const fileEst = localStorage
      .getItem("lastFile")
      .split(".")
      .pop();

    if (fileEst === "pdf" || fileEst === "PDF") {
      // State variable
      const state = {};

      // PDF error handling
      pdfParser.on("pdfParser_dataError", errData => {
        if (errData.parserError != null) console.error(errData.parserError);
        return res.status(400).json(errData.parserError);
      });

      //
      await pdfParser.on("pdfParser_dataReady", async pdfData => {
        state.fileName = pdfData.formImage.Agency;
        state.pagesNum = pdfData.formImage.Pages.length;

        const pages = pdfData.formImage.Pages;

        state.texts = await textFunctions.verificaPaginas(pages);

        // console.log("PDF Data -> " + JSON.stringify(pdfData, null, 2));

        // Set the Json file path

        // Write the content of the PDF file into a .json file
        await fs.writeFile(
          pathJSon, // Path
          JSON.stringify(state), // Stored
          err => {
            // Errors
            if (err) {
              req.io.emit("jsonFileCreate", { fileCreate: false });
              return res.status(400).json(err);
            } else {
              console.log("File saved!");
              req.io.emit("jsonFileCreate", { fileCreate: true });
            }
          }
        );
      });

      // PDF Path
      pdfParser.loadPDF(pathFile);
    } else if (fileEst === "txt" || fileEst === "TXT") {
      await fs.readFile(pathFile, async (err, data) => {
        if (err) {
          req.io.emit("jsonFileCreate", { fileCreate: false });
          return res.status(400).json(err);
        }

        state = {
          text: Buffer.from(data).toString("utf8")
        };

        console.log(state);

        await fs.writeFile(
          pathJSon, // Path
          JSON.stringify(state), // Stored
          err => {
            // Errors
            if (err) {
              req.io.emit("jsonFileCreate", { fileCreate: false });
              return res.status(400).json(err);
            } else {
              console.log("File saved!");
              req.io.emit("jsonFileCreate", { fileCreate: true });
            }
          }
        );
      });
    }

    // read the stored file
    const rest = await fs.readFileSync(
      path.join(__dirname, "..", "..", "tmp", "texts", "file.json"),
      { encoding: "utf8" }
    );

    console.log("Arquivo criado!");

    return res.json(JSON.parse(rest));
  },

  // Read the PDF storaged localy
  async readPdf2(req, res) {
    // State variable
    const state = {};

    // Set the  pdf file path
    const pathFile = path.resolve(
      __dirname,
      "..",
      "..",
      "tmp",
      "uploads",
      localStorage.getItem("lastFile")
    );

    const fileEst = localStorage
      .getItem("lastFile")
      .split(".")
      .pop();

    console.log(fileEst);

    console.log("Arquivo criado!");

    return res.json();
  }
};
