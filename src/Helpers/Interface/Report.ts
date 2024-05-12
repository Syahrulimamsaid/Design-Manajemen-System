interface Month {
  [month: string]: Report[];
}

interface Report {
  designer: string;
  designer_nama: string;
  belum_diambil: number;
  selesai: number;
  on_progress: number;
  acc: number;
  revisi: number;
  reject_koor: number;
  reject_qc: number;
  reject_customer: number;
}
