// export function manaStatus() {
export const getStatusClass = (
  status: string,
  tanggapan_customer?: number | null,
) => {
  switch (status) {
    case '2':
      return 'bg-[#10c735] text-[#10c735]';
    case '3':
      return 'bg-slate-500 text-slate-500';
    case '4':
      return 'bg-[#0f91f5] text-[#0f91f5]';
    case '5':
      return tanggapan_customer != null && tanggapan_customer == 1
        ? 'bg-danger text-danger'
        : // ? 'bg-sky-700 text-sky-700'
          'bg-[#f2780c] text-[#f2780c]';
    case '6':
      return tanggapan_customer != null && tanggapan_customer == 2
        ? 'bg-[#10c735] text-[#10c735]'
        : 'bg-[#9c07f2] text-[#9c07f2]';
    case '0':
      return 'bg-warning text-warning';
    case '1':
      return 'bg-danger text-danger';
    default:
      return 'bg-warning text-warning';
  }
};

export const getStatusText = (
  status: string,
  tanggapan_customer?: number | null,
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
      return tanggapan_customer != null && tanggapan_customer == 2
        ? 'Diterima Customer'
      :'Selesai'
    case '0':
      return 'Pemeriksaan';
    case '1':
      return 'Belum Terjadwal';
    default:
      return 'Tidak Terdefinisi';
  }
};
// }
