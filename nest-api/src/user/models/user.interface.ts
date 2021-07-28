export interface UserI {
  id: number;
  name: string;
  email: string;
  password?: string;
  isActive?: boolean;
  created_at?: Date;
  updated_at?: Date;
}
