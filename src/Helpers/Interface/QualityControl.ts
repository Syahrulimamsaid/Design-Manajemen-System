interface QualityControl {
  id: number;
  kode: string;
  job_assignment_kode: string;
  petugas_kode: string;
  komentar: string;
  status: number;
  created_at: string;
  updated_at: string;
  job_assignment: JobAssignment;
}
