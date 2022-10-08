import csvService from './csv';

const handleCsvFileUpload = async (e, callback) => {
  const filePath = e.target.files[0];
  const fileReader = new FileReader();

  fileReader.readAsText(filePath);
  fileReader.onload = (event) => {
    const csvText = event.target.result;
    const csvData = csvService.csvFileToArray(csvText);
    if (callback) callback(csvData);
  };
};

const handleFileExport = (csvExportName, items) => {
  csvService.exportToCsv({ fileName: csvExportName, data: items });
};

const fileService = {
  handleFileExport,
  handleCsvFileUpload,
};

export default fileService;
