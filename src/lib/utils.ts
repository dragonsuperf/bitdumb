// eslint-disable-next-line import/prefer-default-export
export const convertTimestampToDateString = (time: number, format: string): string => {
  const newDate = new Date(time);
  let resultDate = '';

  if (format.includes('Y')) resultDate += newDate.getFullYear().toString();
  if (format.includes('M')) resultDate += newDate.getMonth().toString();
  if (format.includes('D')) resultDate += newDate.getDay().toString();
  if (format.includes('H')) resultDate += newDate.getHours().toString();
  if (format.includes('M')) resultDate += newDate.getMinutes().toString();
  if (format.includes('S')) resultDate += newDate.getSeconds().toString();

  return resultDate;
};
