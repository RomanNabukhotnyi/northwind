import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Products')
export default class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
    ProductID?: number;

  @Column()
    ProductName?: string;

  @Column()
    SupplierID?: number;

  @Column()
    CategoryID?: number;

  @Column()
    QuantityPerUnit?: string;

  @Column()
    UnitPrice?: number;

  @Column()
    UnitsInStock?: number;

  @Column()
    UnitsOnOrder?: number;

  @Column()
    ReorderLevel?: number;

  @Column()
    Discontinued?: string;
}
