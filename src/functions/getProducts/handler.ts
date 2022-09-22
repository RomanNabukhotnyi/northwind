import 'reflect-metadata';
import middyfy from '../../libs/lambda';
import { ProductRepository } from '../../db/repositories';
import dataSource from '../../db/db';

const getProducts = async () => {
  if (!dataSource.isInitialized) {
    await dataSource.initialize();
  }
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
    .getRawMany();
  return products;
};

// eslint-disable-next-line import/prefer-default-export
export const main = middyfy(getProducts);
