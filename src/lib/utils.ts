// eslint-disable-next-line import/prefer-default-export
export const convertTimestampToDate = (time: number, format: string): Date => {
  const newDate = new Date(time);
  const resultDate = new Date();

  if (format.includes('Y')) resultDate.setFullYear(newDate.getFullYear());
  if (format.includes('M')) resultDate.setMonth(newDate.getMonth());
  if (format.includes('D')) resultDate.setDate(newDate.getDay());
  if (format.includes('H')) resultDate.setHours(newDate.getHours());
  if (format.includes('M')) resultDate.setMinutes(newDate.getMinutes());
  if (format.includes('S')) resultDate.setSeconds(newDate.getSeconds());

  return resultDate;
};
