import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ length: 255, select: false })
  password: string;

  @Column({ default: true })
  isActive?: boolean;

  @CreateDateColumn({ select: false })
  created_at?: Date;

  @UpdateDateColumn({ select: false })
  updated_at?: Date;

  constructor(
    name: string,
    email: string,
    password: string,
    isActive?: boolean,
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.isActive = isActive || true;
  }
}
