import { DataSource } from 'typeorm';
import Supplier from './entity/Supplier';
import Product from './entity/Product';
import Order from './entity/Order';
import Employee from './entity/Employee';
import Customer from './entity/Customer';
import OrderDetail from './entity/OrderDetail';

export default new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
  entities: [Supplier, Product, Order, Employee, Customer, OrderDetail],
  bigNumberStrings: false,
});
