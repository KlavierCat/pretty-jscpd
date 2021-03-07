const handleFileLoaded = (file, resultProcessor) => {
  const reader = new FileReader();
  reader.addEventListener('load', (event) => {
    const { result } = event.target;
    resultProcessor(JSON.parse(result));
    if (localStorage) {
      localStorage.setItem('pretty-jscpd', result);
    }
  });
  reader.readAsText(file);
};

const listenToFileUpload = (resultProcessor) => {
  const inputElement = document.getElementById('file-input');

  inputElement.addEventListener(
    'change',
    (event) => {
      const fileList = event.target.files;
      handleFileLoaded(fileList[0], resultProcessor);
    },
    false,
  );
};

const initWithResultProcessor = (resultProcessor) => {
  const existingReport = localStorage && localStorage.getItem('pretty-jscpd');
  if (existingReport) {
    resultProcessor(JSON.parse(existingReport));
  }
  listenToFileUpload(resultProcessor);
};
