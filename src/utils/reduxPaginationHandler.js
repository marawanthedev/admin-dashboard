export default function ReduxPaginationHandler({ statePropTarget, action }) {
  if (action.payload.length > 0) {
    if (statePropTarget.length > 0) {
      return [...statePropTarget, ...action.payload];
    }
    return [...action.payload];
  }
  return [...statePropTarget];
}
