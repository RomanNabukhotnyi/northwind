import 'reflect-metadata';
import type { Handler } from 'aws-lambda';
import type { FromSchema } from 'json-schema-to-ts';
import schema from './schema';
import middyfy from '../../libs/lambda';
import { EmployeeRepository } from '../../db/repositories';
import dataSource from '../../db/db';

const getEmployee: Handler<FromSchema<typeof schema>> = async (event) => {
  if (!dataSource.isInitialized) {
    await dataSource.initialize();
  }
  const { Id } = event.queryStringParameters;
  const employee = await EmployeeRepository
    .createQueryBuilder('Employees')
    .select('Employees.EmployeeID', 'Id')
    .addSelect('Employees.LastName', 'LastName')
    .addSelect('Employees.FirstName', 'FirstName')
    .addSelect('Employees.Title', 'Title')
    .addSelect('Employees.TitleOfCourtesy', 'TitleOfCourtesy')
    .addSelect('Employees.BirthDate', 'BirthDate')
    .addSelect('Employees.HireDate', 'HireDate')
    .addSelect('Employees.Address', 'Address')
    .addSelect('Employees.City', 'City')
    .addSelect('Employees.Region', 'Region')
    .addSelect('Employees.PostalCode', 'PostalCode')
    .addSelect('Employees.Country', 'Country')
    .addSelect('Employees.HomePhone', 'HomePhone')
    .addSelect('Employees.Extension', 'Extension')
    .addSelect('Employees.Photo', 'Photo')
    .addSelect('Employees.Notes', 'Notes')
    .addSelect('Employees.ReportsTo', 'ReportsTo')
    .addSelect('Employees.PhotoPath', 'PhotoPath')
    .addSelect('Reports.EmployeeID', 'ReportId')
    .addSelect('Reports.LastName', 'ReportLastName')
    .addSelect('Reports.FirstName', 'ReportFirstName')
    .leftJoin('Employees', 'Reports', 'Reports.EmployeeID = Employees.ReportsTo')
    .where('Employees.EmployeeID = :Id', { Id })
    .getRawOne();
  return employee;
};

// eslint-disable-next-line import/prefer-default-export
export const main = middyfy(getEmployee, schema);
