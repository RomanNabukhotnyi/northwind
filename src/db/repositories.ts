import dataSource from './db';
import Supplier from './entity/Supplier';
import Product from './entity/Product';
import Order from './entity/Order';
import Employee from './entity/Employee';
import Customer from './entity/Customer';

export const SupplierRepository = dataSource.getRepository(Supplier);
export const ProductRepository = dataSource.getRepository(Product);
export const OrderRepository = dataSource.getRepository(Order);
export const EmployeeRepository = dataSource.getRepository(Employee);
export const CustomerRepository = dataSource.getRepository(Customer);
