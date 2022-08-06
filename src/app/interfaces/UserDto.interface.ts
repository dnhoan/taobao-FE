export interface UserDTO {
  id: number;
  fullname: string;
  gender: number;
  phoneNumber: string;
  address: string;
  email: string;
  image: string;
  role: number;
  status: string;
  password?: string;
}
