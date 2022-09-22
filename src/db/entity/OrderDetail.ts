import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('OrderDetails')
export default class OrderDetail extends BaseEntity {
  @PrimaryGeneratedColumn()
    OrderID?: number;

  @Column()
    ProductID?: number;

  @Column('float')
    UnitPrice?: number;

  @Column('int')
    Quantity?: number;

  @Column('real')
    Discount?: number;
}
