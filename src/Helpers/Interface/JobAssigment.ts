interface JobAssignment {
  job_assignment: any;
  id: number;
  kode: string;
  designer: User;
  user:User;
  job: Job;
  tanggal_pengumpulan: string;
  status: number;
  qc :QualityControl;
}
