export class RegisterDto {
  email: string;
  password: string;
  role?: string; // opsional: MAHASISWA, ADMIN, DOSEN
}
