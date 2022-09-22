import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Employees')
export default class Employee extends BaseEntity {
  @PrimaryGeneratedColumn()
    EmployeeID?: number;

  @Column()
    LastName?: string;

  @Column()
    FirstName?: string;

  @Column()
    Title?: string;

  @Column()
    TitleOfCourtesy?: string;

  @Column()
    BirthDate?: string;

  @Column()
    HireDate?: string;

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
    HomePhone?: string;

  @Column()
    Extension?: string;

  @Column()
    Photo?: Buffer;

  @Column()
    Notes?: string;

  @Column()
    ReportsTo?: number;

  @Column()
    PhotoPath?: string;
}
