export default function parseDate(date_str: string) {
  const [date, hour] = date_str.split("T");
  const [year, month, day] = date.split("-");
  
  const [completeHour, minute, second] = hour.split(":");
  const [realSecond] = second.split(".");
  const [milisecond] = second.split(".")[1].split("Z");

  const dateObj = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day), Number(completeHour), Number(minute), Number(realSecond), Number(milisecond)));

  const yearOption: "2-digit" | "numeric" | undefined = "2-digit";

  const monthOption: "2-digit" | "numeric" | "short" | undefined = "short";
  
  const dayOption: "2-digit" | "numeric" | undefined = "2-digit";

  const hourOption: "2-digit" | "numeric" | undefined = "2-digit";

  const minuteOption: "2-digit" | "numeric" | undefined = "2-digit";

  const options = { year: yearOption, month: monthOption, day: dayOption, hour: hourOption, minute: minuteOption };

  const parsedDate = new Intl.DateTimeFormat("pt-BR", options).format(dateObj);

  return parsedDate;
}