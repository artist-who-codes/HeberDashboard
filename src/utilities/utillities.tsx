import { Tasktype } from "@/types/tasktype";

export function ToLocalTime(date: Date) {
  date.setUTCHours(date.getUTCHours() + 5);
  date.setUTCMinutes(date.getUTCMinutes() + 30);
  return date;
}

export function FormatDate(Date1: Date) {
  const now = new Date();
  const date1 = new Date(Date1);
  const nowYear = now.getUTCFullYear();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const date = date1.getUTCDate();
  const month = monthNames[date1.getMonth()];
  const day = days[date1.getDay()];
  const year = date1.getUTCFullYear();
  var formattedDate: string;
  if (nowYear === year) {
    formattedDate = date + " " + month + ", " + day;
  } else {
    formattedDate = date + " " + month + ", " + year;
  }
  return formattedDate;
}



export function TimeDifference(date1: Date, date2: Date) {
    const ms = (date1.getTime() - date2.getTime())
    var hoursleft = Math.floor(ms / 1000 / 60 / 60);
    return hoursleft
}



export function GetDay(date: Date) {
    const now = new Date();
    const deadline = new Date(date);

    // Remove the time component from the dates
    const nowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const deadlineDate = new Date(deadline.getFullYear(), deadline.getMonth(), deadline.getDate());

    // Calculate the difference in days
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const daysDifference = Math.ceil((deadlineDate.getTime() - nowDate.getTime()) / millisecondsPerDay);

    if (daysDifference < 0) {
        return "Crossed Deadline";
    } else if (daysDifference === 0) {
        return "Today";
    } else if (daysDifference === 1) {
        return "Tomorrow";
    } else {
        return FormatDate(deadline);
    }
}


export function getPreviousDate(daysAgo: number) {
    const today = new Date();
    const previousDate = new Date(today);
    previousDate.setDate(today.getDate() - daysAgo);
    return previousDate;
}

export function getNextDate(daysAfter: number) {
    const today = new Date();
    const previousDate = new Date(today);
    previousDate.setDate(today.getDate() + daysAfter);
    return previousDate;
}
export function getThisWeek() {
    const day1 = getPreviousDate(2)
    const day2 = getPreviousDate(1)
    const day3 = new Date()
    const day4 = getNextDate(1)
    const day5 = getNextDate(2)
    const day6 = getNextDate(3)
    const day7 = getNextDate(4)
    const thisweek = [day1, day2, day3, day4, day5, day6, day7]
    return thisweek
}

export function getLeastDeadline(Tasks: Tasktype[]) {
    var deadlines = []
    for (var i = 0; i < Tasks.length; i++) {
        deadlines.push(Tasks[i].task_due)
    }
    // const currentDate = new Date();
    // var nearestDate
    // var minDifference = Infinity

    // for (const date of deadlines) {
    //     const dateObject = new Date(date);
    //     const difference = TimeDifference(dateObject, currentDate)

    //     if (difference < minDifference && difference > 0) {
    //         minDifference = difference;
    //         nearestDate = dateObject;
    //     }
    // }

    return deadlines;
}