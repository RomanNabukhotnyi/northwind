import 'reflect-metadata';
import middyfy from '../../libs/lambda';
import { OrderRepository } from '../../db/repositories';
import dataSource from '../../db/db';

const getOrders = async () => {
  if (!dataSource.isInitialized) {
    await dataSource.initialize();
  }
  const orders = await OrderRepository
    .createQueryBuilder('Orders')
    .select('ROUND(SUM(OrderDetails.UnitPrice * OrderDetails.Discount * OrderDetails.Quantity), 1)', 'TotalProductsDiscount')
    .addSelect('ROUND(SUM(OrderDetails.UnitPrice * OrderDetails.Quantity), 1)', 'TotalProductsPrice')
    .addSelect('SUM(OrderDetails.Quantity)', 'TotalProductsItems')
    .addSelect('COUNT(OrderDetails.OrderId)', 'TotalProducts')
    .addSelect('Orders.OrderID', 'Id')
    .addSelect('Orders.CustomerID', 'CustomerId')
    .addSelect('Orders.EmployeeID', 'EmployeeId')
    .addSelect('Orders.OrderDate', 'OrderDate')
    .addSelect('Orders.RequiredDate', 'RequiredDate')
    .addSelect('Orders.ShippedDate', 'ShippedDate')
    .addSelect('Orders.ShipVia', 'ShipVia')
    .addSelect('Orders.Freight', 'Freight')
    .addSelect('Orders.ShipName', 'ShipName')
    .addSelect('Orders.ShipAddress', 'ShipAddress')
    .addSelect('Orders.ShipCity', 'ShipCity')
    .addSelect('Orders.ShipRegion', 'ShipRegion')
    .addSelect('Orders.ShipPostalCode', 'ShipPostalCode')
    .addSelect('Orders.ShipCountry', 'ShipCountry')
    .addSelect('OrderDetails.ProductID', 'ProductId')
    .from('OrderDetails', 'OrderDetails')
    .where('Orders.OrderID = OrderDetails.OrderID')
    .groupBy('Orders.OrderID')
    .getRawMany();
  return orders;
};

// eslint-disable-next-line import/prefer-default-export
export const main = middyfy(getOrders);
