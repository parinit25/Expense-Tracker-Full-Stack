export function formatDate(dateString) {
  const date = new Date(dateString);

  // Get day, month, and year
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-indexed
  const year = date.getFullYear().toString();

  // Return formatted date in dd-mm-yyyy format
  return `${day}-${month}-${year}`;
}
