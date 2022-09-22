import 'reflect-metadata';
import middyfy from '../../libs/lambda';
import { EmployeeRepository } from '../../db/repositories';
import dataSource from '../../db/db';

const getEmployees = async () => {
  if (!dataSource.isInitialized) {
    await dataSource.initialize();
  }
  const employees = await EmployeeRepository
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
    .getRawMany();
  return employees;
};

// eslint-disable-next-line import/prefer-default-export
export const main = middyfy(getEmployees);
