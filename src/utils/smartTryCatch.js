//  *smartTryCatch guide, ({callback,callbackParams,rejectionObject})

export default async function smartTryCatch({ callback, callbackParams, rejectionObject }) {
  try {
    return await callback(callback(callbackParams));
  } catch (error) {
    const message = (error.response && error.res.data && error.res.data.message) || error.message || error.toString();

    if (rejectionObject) {
      return rejectionObject.rejectWithValue(message);
    }
    return message;
  }
}
