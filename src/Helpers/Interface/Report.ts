interface Month {
  [month: string]: Report[];
}

interface Report {
  designer: string;
  designer_nama: string;
  revisi: number;
  selesai: number;
  belum_selesai: number;
  tidak_diambil: number;
  rata_pengerjaan: number;
}
