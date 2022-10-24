export default function compareDates({ startDate, endDate }) {
  const date1 = new Date(startDate).getTime();
  const date2 = new Date(endDate).getTime();

  if (date1 < date2) {
    return true;
  }
  return false;
}
