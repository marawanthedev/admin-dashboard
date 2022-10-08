function exportToCsv({ fileName, data }) {
  if (data !== undefined && data !== null && data.length !== 0) {
    let csvContent = 'data:text/csv;charset=utf-8,';

    const csvString = [Object.keys(data[0]), ...data.map((item) => Object.values(item))]
      .map((e) => e.join(','))
      .join('\n');

    csvContent += csvString;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', fileName);

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  }
  return null;
}

const csvFileToArray = (string) => {
  const csvHeader = string.slice(0, string.indexOf('\n')).split(',');
  const csvRows = string.slice(string.indexOf('\n') + 1).split('\n');

  const array = csvRows.map((i) => {
    const values = i.split(',');
    const obj = csvHeader.reduce((object, header, index) => {
      object[header] = values[index];
      return object;
    }, {});
    return obj;
  });

  return array;
};

const csvService = {
  exportToCsv,
  csvFileToArray,
};

export default csvService;
