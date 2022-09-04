const { csv } = require('d3');

async function importCsvFile() {
  return csv('../csv/Users.csv').then((data) => {
    return data;
  });
}

module.exports = importCsvFile;
