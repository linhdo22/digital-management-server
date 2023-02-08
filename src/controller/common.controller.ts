import { Request, Response } from "express";
import {
  BrandServices,
  CategoryServices,
  CountryServices,
  RoleServices,
  ShippingServices,
  VendorServices,
} from "src/service/common.service";

class CountryControllerClass {
  async getAll(req: Request, res: Response) {
    const countryList = await CountryServices.getList();
    res.jsonp({ data: countryList });
  }
}

export const CountryController = new CountryControllerClass();

class ShippingControllerClass {
  async getAll(req: Request, res: Response) {
    const shippingList = await ShippingServices.getList();
    shippingList.unshift({
      id: null as any,
      name: "Select new zone",
      zone_name: "",
    });
    res.jsonp(shippingList);
  }
}

export const ShippingController = new ShippingControllerClass();

class CategoryControllerClass {
  async getAll(req: Request, res: Response) {
    const categoryList = await CategoryServices.getList();
    res.jsonp({ data: categoryList });
  }
}

export const CategoryController = new CategoryControllerClass();

class BrandControllerClass {
  async getAll(req: Request, res: Response) {
    const brandList = await BrandServices.getList();
    res.jsonp({ data: brandList });
  }
}

export const BrandController = new BrandControllerClass();

class RoleControllerClass {
  async getAll(req: Request, res: Response) {
    const roleObject = await RoleServices.getRuleObject();
    res.jsonp({ data: roleObject });
  }
}

export const RoleController = new RoleControllerClass();

class VendorControllerClass {
  async getAll(req: Request, res: Response) {
    const vendorList = await VendorServices.getList();
    res.jsonp({ data: vendorList });
  }
}

export const VendorController = new VendorControllerClass();

class ConditionControllerClass {
  async getAll(req: Request, res: Response) {
    res.jsonp({ data: [{ id: null, name: "Condition" }] });
  }
}

export const ConditionController = new ConditionControllerClass();
