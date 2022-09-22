import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Customers')
export default class Customer extends BaseEntity {
  @PrimaryGeneratedColumn()
    CustomerID?: number;

  @Column()
    CompanyName?: string;

  @Column()
    ContactName?: string;

  @Column()
    ContactTitle?: string;

  @Column()
    Address?: string;

  @Column()
    City?: string;

  @Column()
    Region?: string;

  @Column()
    PostalCode?: string;

  @Column()
    Country?: string;

  @Column()
    Phone?: string;

  @Column()
    Fax?: string;
}
