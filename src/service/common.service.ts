import { AppDataSource } from "src/config/database";
import { Brand } from "src/entity/brand";
import { Category } from "src/entity/category";
import { Country } from "src/entity/country";
import { Role } from "src/entity/role";
import { Shipping } from "src/entity/shipping";
import { Vendor } from "src/entity/vendor";

class CountryServicesClass {
  getList = async () => {
    const countryList = await AppDataSource.manager.find(Country);
    return countryList;
  };
}

export const CountryServices = new CountryServicesClass();

class ShippingServicesClass {
  getList = async () => {
    const shippingList = await AppDataSource.manager.find(Shipping);
    return shippingList;
  };
}

export const ShippingServices = new ShippingServicesClass();

class CategoryServicesClass {
  getList = async () => {
    const categoryList = await AppDataSource.manager.find(Category);
    return categoryList;
  };
}

export const CategoryServices = new CategoryServicesClass();

class BrandServicesClass {
  getList = async () => {
    const brandList = await AppDataSource.manager.find(Brand);
    return brandList;
  };
}

export const BrandServices = new BrandServicesClass();

class RoleServicesClass {
  getRuleObject = async () => {
    const roleList = await AppDataSource.manager.find(Role);
    const roleObject = { administrator: [] as Role[], customer: [] as Role[] };
    roleList.forEach((role) =>
      role.type === "administrator"
        ? roleObject.administrator.push(role)
        : roleObject.customer.push(role)
    );

    return roleObject;
  };
}

export const RoleServices = new RoleServicesClass();

class VendorServicesClass {
  getList = async () => {
    const vendorList = await AppDataSource.manager.find(Vendor);
    return vendorList;
  };
}

export const VendorServices = new VendorServicesClass();
