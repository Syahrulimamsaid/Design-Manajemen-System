export function FormatDate(date: string | Date) {
  const dates = new Date(date);

  const year = dates.getFullYear();
  const month = String(dates.getMonth() + 1).padStart(2, '0');
  const day = String(dates.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export const formattedDate = (tanggal: string) => {
  const date = new Date(tanggal).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });
  return date;
};

export const dateFormatID = (tanggal: string) => {
  const date = new Date(tanggal).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  return date;
};
