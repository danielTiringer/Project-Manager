interface IUser {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

export type UserType = {
  user?: IUser;
};
