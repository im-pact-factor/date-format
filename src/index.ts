interface DateInfo {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  yyyy: string;
  MM: string;
  dd: string;
  hh: string;
  mm: string;
  ss: string;
}

export function formate(
  date: Date,
  formatter: string | ((dateInfo: DateInfo) => string),
  isPad = false
): string {
  const getPad = (value: number): string => {
    return isPad && value < 10 ? "0" + value : "" + value;
  };

  const dateInfo: DateInfo = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),
    yyyy: "" + date.getFullYear(),
    MM: getPad(date.getMonth() + 1),
    dd: getPad(date.getDate()),
    hh: getPad(date.getHours()),
    mm: getPad(date.getMinutes()),
    ss: getPad(date.getSeconds()),
  };

  if (typeof formatter === "function") {
    return formatter(dateInfo);
  }

  const formatMap: { [key: string]: string } = {
    "date": "yyyy-MM-dd",
    "datetime": "yyyy-MM-dd hh:mm:ss"
  };

  const formatPattern = formatMap[formatter] || formatter;

  return formatPattern
    .replace("yyyy", dateInfo.yyyy)
    .replace("MM", dateInfo.MM)
    .replace("dd", dateInfo.dd)
    .replace("hh", dateInfo.hh)
    .replace("mm", dateInfo.mm)
    .replace("ss", dateInfo.ss);
}
