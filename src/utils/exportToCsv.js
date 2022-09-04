export default function exportToCsv({ fileName, data }) {
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
