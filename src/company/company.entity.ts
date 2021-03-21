
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column()
  cnpj: string;

  @Column()
  companyName: string;

  @Column()
  adress: string;

  @Column()
  phone: string;

  @Column()
  password: string;
}
