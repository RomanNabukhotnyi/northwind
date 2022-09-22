import 'reflect-metadata';
import type { Handler } from 'aws-lambda';
import type { FromSchema } from 'json-schema-to-ts';
import schema from './schema';
import middyfy from '../../libs/lambda';
import { ProductRepository } from '../../db/repositories';
import dataSource from '../../db/db';

const getProduct: Handler<FromSchema<typeof schema>> = async (event) => {
  if (!dataSource.isInitialized) {
    await dataSource.initialize();
  }
  const { Id } = event.queryStringParameters;
  const product = await ProductRepository
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
    .where('Products.ProductID = :Id', { Id })
    .getRawOne();
  return product;
};

// eslint-disable-next-line import/prefer-default-export
export const main = middyfy(getProduct, schema);
