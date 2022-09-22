import 'reflect-metadata';
import type { Handler } from 'aws-lambda';
import type { FromSchema } from 'json-schema-to-ts';
import schema from './schema';
import middyfy from '../../libs/lambda';
import { OrderRepository, ProductRepository } from '../../db/repositories';
import dataSource from '../../db/db';

const getOrder: Handler<FromSchema<typeof schema>> = async (event) => {
  if (!dataSource.isInitialized) {
    await dataSource.initialize();
  }
  const { Id } = event.queryStringParameters;
  const order = await OrderRepository
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
    .addSelect('Shippers.CompanyName', 'ShipViaCompanyName')
    .from('OrderDetails', 'OrderDetails')
    .from('Shippers', 'Shippers')
    .where('Orders.OrderID = OrderDetails.OrderID')
    .andWhere('Orders.ShipVia = Shippers.ShipperID')
    .andWhere('Orders.OrderID = :Id', { Id })
    .groupBy('Orders.OrderID')
    .getRawOne();

  const products = await ProductRepository
    .createQueryBuilder('Products')
    .select('Products.ProductID', 'Id')
    .addSelect('Products.ProductName', 'ProductName')
    .addSelect('Products.SupplierID', 'SupplierId')
    .addSelect('Products.CategoryID', 'CategoryId')
    .addSelect('Products.QuantityPerUnit', 'QuantityPerUnit')
    .addSelect('Products.UnitPrice', 'UnitPrice')
    .addSelect('Products.UnitsInStock', 'UnitsInStock')
    .addSelect('Products.UnitsOnOrder', 'UnitsOnOrder')
    .addSelect('Products.ReorderLevel', 'ReorderLevel')
    .addSelect('Products.Discontinued', 'Discontinued')
    .addSelect('OrderDetails.OrderID', 'OrderId')
    .addSelect('OrderDetails.UnitPrice', 'OrderUnitPrice')
    .addSelect('OrderDetails.Quantity', 'Quantity')
    .addSelect('OrderDetails.Discount', 'Discount')
    .from('OrderDetails', 'OrderDetails')
    .where('Products.ProductID = OrderDetails.ProductID')
    .andWhere('OrderDetails.OrderID = :Id', { Id })
    .getRawMany();
  return {
    order,
    products,
  };
};

// eslint-disable-next-line import/prefer-default-export
export const main = middyfy(getOrder, schema);
