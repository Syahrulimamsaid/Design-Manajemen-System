export function convertStringToDate(dateString: string) {
    const [dayStr, monthStr, yearStr] = dateString.split('/');

    const day = parseInt(dayStr, 10);
    const month = parseInt(monthStr, 10);
    const year = parseInt(yearStr, 10);

    const date = new Date(year, month - 1, day);

    
    return date;
  }