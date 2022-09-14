const generateTableHead = (names) => {
  const tableHead = [];

  names.forEach((name) => {
    const displayName = [...name];
    displayName[0] = displayName[0].toUpperCase();
    tableHead.push({ id: name, label: displayName, alignRight: false });
  });

  return tableHead;
};

const tableHeadService = {
  generateTableHead,
};
export default tableHeadService;
