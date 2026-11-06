// export function dateTimeValidation(datetime: string) {
//   // Source - https://stackoverflow.com/a/41659388
//   // Posted by John, modified by community. See post 'Timeline' for change history
//   // Retrieved 2026-10-28, License - CC BY-SA 4.0

//   const date = new Date(datetime);
//   const day = date.getDate();
//   const month = date.getMonth();
//   // const year = date.getFullYear();

//   // const current_year = date.getFullYear();
//   // const current_month = date.getMonth();
//   // const current_day = date.getDate();

//   const now = new Date();

//   const msPerDay = 24 * 60 * 60 * 1000;
//   const daysDiff = Math.round((now.getTime() - date.getTime()) / msPerDay);

//   if (daysDiff > 3) return day + "/" + (month + 1);

//   if (daysDiff == 0) return "Today";
//   if (daysDiff == 1) return "Yesterday";
//   if (daysDiff == 2) return "2 days ago";
//   else return "3 days ago";
// }

export function dateTimeValidation(datetime: string) {
  // Source - https://stackoverflow.com/a/41659388
  // Posted by John, modified by community. See post 'Timeline' for change history
  // Retrieved 2026-10-28, License - CC BY-SA 4.0

  const date = new Date(datetime);
  // from utc+1 to utc
  date.setHours(date.getHours() - 1);

  const cleandate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const msperday = 24 * 60 * 60 * 1000;

  if (cleandate.getTime() === today.getTime()) return "Today";
  if (cleandate.getTime() === today.getTime() - msperday) return "Yesterday";
  if (cleandate.getTime() === today.getTime() - 2 * msperday)
    return "2 days ago";
  if (cleandate.getTime() === today.getTime() - 3 * msperday)
    return "3 days ago";

  const day = date.getDate();
  const month = date.getMonth();

  return day + "/" + (month + 1);
}
