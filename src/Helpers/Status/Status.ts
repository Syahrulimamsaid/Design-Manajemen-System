// export function manaStatus() {
export const getStatusClass = (
  status: string,
  tanggapan_customer: number | null,
) => {
  switch (status) {
    case '2':
      return 'bg-slate-500 text-slate-500';
    case '3':
      return 'bg-primary text-primary';
    case '4':
      return 'bg-purple-500 text-purple-500';
    case '5':
      return tanggapan_customer != null && tanggapan_customer == 1
        ? 'bg-sky-700 text-sky-700'
        : 'bg-danger text-danger';
    case '6':
      return 'bg-success text-success';
    case '0':
      return 'bg-pink-800 text-pink-800';
    case '0':
      return 'bg-emerald-700 text-emerald-700';
    default:
      return 'bg-warning text-warning';
  }
};

export const getStatusText = (
  status: string,
  tanggapan_customer: number | null,
) => {
  switch (status) {
    case '2':
      return 'Terjadwal';
    case '3':
      return 'Pengerjaan';
    case '4':
      return 'Dikumpulkan';
    case '5':
      return tanggapan_customer != null && tanggapan_customer == 1
        ? 'Ditolak Customer'
        : 'Revisi';
    case '6':
      return 'Selesai';
    case '0':
      return 'Pemeriksaan';
    case '1':
      return 'Belum Terjadwal';
    default:
      return 'Tidak Terdefinisi';
  }
};
// }
