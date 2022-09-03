//*smartTryCatch guide, (callback,callbackParams,rejectionObject)

export default async function smartTryCatch(
  callback,
  callbackParams,
  rejectionObject
) {
  try {
    return await callback(arguments.length === 3 ? callbackParams : null);
  } catch (error) {
    const message =
      (error.response && error.res.data && error.res.data.message) ||
      error.message ||
      error.toString();

    if (rejectionObject) {
      return arguments.length === 3
        ? rejectionObject.rejectWithValue(message)
        : arguments[2].rejectWithValue(message);
    }
    return message;
  }
}
