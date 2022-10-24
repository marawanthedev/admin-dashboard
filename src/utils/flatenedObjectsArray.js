// This is used to extract object props from a given array then
// flatten the data at one level to be displayed as a string

export default function FlattenObjectArray({ array, targetProp }) {
  let flattenString = '';

  array?.forEach((item, index) => {
    if (item[targetProp]) flattenString += item[targetProp];
    if (index !== array.length - 1) flattenString += ',';
  });

  return flattenString;
}
