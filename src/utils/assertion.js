//@Assertion
//@Assure that there are valid data
//@access Public

//*Assert guide, (assertionFactor,DataToBeReturned,errorMessage,res object)
function assert(assertionFactor, dataToBeReturned, errorMessage, res) {
  if (
    assertionFactor !== undefined &&
    assertionFactor !== null &&
    assertionFactor !== "" &&
    assertionFactor !== [] &&
    assertionFactor !== {}
  ) {
    return dataToBeReturned;
  } else {
    throw new Error(errorMessage);
  }
}

module.exports = assert;
