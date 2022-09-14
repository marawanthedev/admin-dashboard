import csvService from './csv';

const handleFileUpload = async (e, callback) => {
  const filePath = e.target.value;
  const data = await csvService.importCSV(filePath);
  if (callback) callback(data);
};

const handleFileExport = (csvExportName, items) => {
  csvService.exportToCsv({ fileName: csvExportName, data: items });
};

const fileService = {
  handleFileExport,
  handleFileUpload,
};

export default fileService;
