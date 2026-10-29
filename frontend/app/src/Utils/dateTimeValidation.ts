export function dateTimeValidation(datetime: string) {
  // Source - https://stackoverflow.com/a/41659388
  // Posted by John, modified by community. See post 'Timeline' for change history
  // Retrieved 2026-10-28, License - CC BY-SA 4.0

  const date = new Date(datetime); // had to remove the colon (:) after the T in order to make it work
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();
  const myFormattedDate = day + "/" + (monthIndex + 1);

  return myFormattedDate;
}
