module.exports = {
  async verificaPaginas(pages) {
    const retorno = [];
    await pages.map(async (data, index) => {
      text = data.Texts;

      fullText = "";
      text.map(data => {
        newText = data.R[0].T + " ";
        // console.log(newText);
        fullText += newText;
      });

      let fim = await this.verificaOrtografia(fullText);

      retorno.push(fim);
    });
    return retorno;
  },
  verificaOrtografia(fullText) {
    // substitui o %20 por " "
    parseText = fullText.split("%20");
    fullText = "";
    parseText.map(data => {
      fullText += data + "";
    });
    // substitui o %C3%A1 por 'á'
    parseText = fullText.split("%C3%A1");
    fullText = "";
    parseText.map(data => {
      fullText += data + "á";
    });
    // substitui o %C3%A9 por 'é'
    parseText = fullText.split("%C3%A9");
    fullText = "";
    parseText.map(data => {
      fullText += data + "é";
    });
    // substitui o %C3%AA por 'ê'
    parseText = fullText.split("%C3%AA");
    fullText = "";
    parseText.map(data => {
      fullText += data + "ê";
    });
    // substitui o %2C por ','
    parseText = fullText.split("%2C");
    fullText = "";
    parseText.map(data => {
      fullText += data + ",";
    });
    // substitui o %C3%A0 por 'à'
    parseText = fullText.split("%C3%A0");
    fullText = "";
    parseText.map(data => {
      fullText += data + "à";
    });
    // substitui o %C3%BA por 'ú'
    parseText = fullText.split("%C3%BA");
    fullText = "";
    parseText.map(data => {
      fullText += data + "ú";
    });
    // substitui o %E2%80%A2 por 'º'
    parseText = fullText.split("%E2%80%A2");
    fullText = "";
    parseText.map(data => {
      fullText += data + "º";
    });
    // substitui o %C3%B3 por 'ó'
    parseText = fullText.split("%C3%B3");
    fullText = "";
    parseText.map(data => {
      fullText += data + "ó";
    });
    // substitui o %C3%A7 por 'ç'
    parseText = fullText.split("%C3%A7");
    fullText = "";
    parseText.map(data => {
      fullText += data + "ç";
    });
    // substitui o %C3%B5 por 'õ'
    parseText = fullText.split("%C3%B5");
    fullText = "";
    parseText.map(data => {
      fullText += data + "õ";
    });
    // substitui o %C3%A3 por 'ã'
    parseText = fullText.split("%C3%A3");
    fullText = "";
    parseText.map(data => {
      fullText += data + "ã";
    });
    // substitui o %2F por '/'
    parseText = fullText.split("%2F");
    fullText = "";
    parseText.map(data => {
      fullText += data + "/";
    });
    // substitui o %E2%80%93 por '-'
    parseText = fullText.split("%E2%80%93");
    fullText = "";
    parseText.map(data => {
      fullText += data + "-";
    });
    // substitui o %C3%AD por 'í'
    parseText = fullText.split("%C3%AD");
    fullText = "";
    parseText.map(data => {
      fullText += data + "í";
    });
    // substitui o %3A por ':'
    parseText = fullText.split("%3A");
    fullText = "";
    parseText.map(data => {
      fullText += data + ":";
    });
    // substitui o %E2%80%94 por '—'
    parseText = fullText.split("%E2%80%94");
    fullText = "";
    parseText.map(data => {
      fullText += data + "—";
    });
    // substitui o %22 por '"'
    parseText = fullText.split("%22");
    fullText = "";
    parseText.map(data => {
      fullText += data + '"';
    });

    return fullText.substr(0, fullText.length - 18);
  }
};
