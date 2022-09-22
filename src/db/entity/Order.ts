import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Orders')
export default class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
    OrderID?: number;

  @Column()
    CustomerID?: number;

  @Column()
    EmployeeID?: number;

  @Column()
    OrderDate?: string;

  @Column()
    RequiredDate?: string;

  @Column()
    ShippedDate?: string;

  @Column()
    ShipVia?: number;

  @Column()
    Freight?: number;

  @Column()
    ShipName?: string;

  @Column()
    ShipAddress?: string;

  @Column()
    ShipCity?: string;

  @Column()
    ShipRegion?: string;

  @Column()
    ShipPostalCode?: string;

  @Column()
    ShipCountry?: string;
}
