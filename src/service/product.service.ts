import { AppDataSource } from "src/config/database";
import { Category } from "src/entity/category";
import { Image } from "src/entity/image";
import { Product } from "src/entity/product";
import { ShippingToZone } from "src/entity/shipping";
import { Vendor } from "src/entity/vendor";
import { IFilterProduct } from "src/interface/product.interface";
import { Brackets, In } from "typeorm";

class ProductServices {
  create = async (productDetail: Omit<Product, "shipping_to_zones">) => {
    const storedProduct = await AppDataSource.manager.findOne(Product, {
      where: { id: productDetail.id },
      relations: { images: true },
    });
    const newProduct = storedProduct ? storedProduct : new Product();
    const vendorQuery = AppDataSource.manager.findOne(Vendor, {
      where: { id: productDetail.vendor as unknown as number },
    });
    const categoriesQuery = AppDataSource.manager.find(Category, {
      where: { id: In(productDetail.categories as unknown as string[]) },
    });
    const [vendor, categories] = await Promise.all([
      vendorQuery,
      categoriesQuery,
    ]);

    Object.keys(productDetail).forEach((key) => {
      newProduct[key] = productDetail[key];
    });

    delete newProduct.shipping_to_zones;
    newProduct.created = new Date();
    newProduct.arrival_date = new Date();
    newProduct.price = Number(productDetail.price);
    newProduct.amount = productDetail.quantity;
    newProduct.sale_price = productDetail.sale_price || 0;
    newProduct.cleanURL = "";
    newProduct.sale_price_type = newProduct.sale_price_type || "";
    newProduct.inventory_tracking = "";
    newProduct.meta_description = newProduct.meta_description || "";
    newProduct.weight = "";
    newProduct.sort_description = newProduct.sort_description || "";
    if (vendor) newProduct.vendor = vendor;
    if (categories.length) newProduct.categories = categories;
    await AppDataSource.manager.save(newProduct);

    if (newProduct.deleted_images && newProduct.deleted_images.length) {
      await AppDataSource.manager.delete(Image, newProduct.deleted_images);
    }

    const shippingToZones = productDetail.shipping_to_zones.map(
      (shippingToZone: { id: number; price: number }) => {
        if (!shippingToZone.id) return null;
        const newShippingToZone = new ShippingToZone();
        newShippingToZone.price = shippingToZone.price;
        newShippingToZone.productId = newProduct.id;
        newShippingToZone.shippingId = shippingToZone.id;
        return newShippingToZone;
      }
    );

    let newShipping = false;
    for (let i = 0; i < shippingToZones.length; i++) {
      if (!shippingToZones[i]) continue;
      newShipping = true;
      await AppDataSource.manager.save(shippingToZones[i]);
    }

    if (newShipping) newProduct.shipping_to_zones = shippingToZones;
    await AppDataSource.manager.save(newProduct);

    return newProduct;
  };
  update = async (params: { id: number; enable?: 1 | 0; delete?: 1 }[]) => {
    const productIds = params.map((product) => product.id);

    if (params?.[0].delete) {
      await AppDataSource.manager.delete(Product, productIds);
    } else {
      const a = AppDataSource.manager
        .getRepository(Product)
        .createQueryBuilder()
        .update(Product)
        .set({ enabled: () => (params?.[0].enable === 1 ? "true" : "false") })
        .where("product.id In (:...productIds)", { productIds });

      await a.execute();
    }
  };
  get = async (productId: number) => {
    const productDetail = await AppDataSource.manager.findOne(Product, {
      where: { id: productId },
      relations: {
        shipping_to_zones: true,
        images: true,
        vendor: true,
        categories: true,
      },
    });
    return productDetail;
  };
  getList = async (filter: IFilterProduct) => {
    const {
      count,
      page,
      order_by,
      sort,
      stock_status,
      search,
      vendor,
      search_type,
      category,
      availability,
    } = filter;

    const searchTypes = search_type.split(",");

    let queryProduct = AppDataSource.getRepository(Product)
      .createQueryBuilder("product")
      .leftJoinAndSelect("product.vendor", "vendor")
      .leftJoinAndSelect("product.categories", "categories")
      .where("product.name like :productName", { productName: `%${search}%` })
      .andWhere(
        new Brackets((qr) => {
          qr.where("vendor.name like :vendorName", {
            vendorName: `%${vendor}%`,
          });
          if (vendor === "") {
            qr = qr.orWhere(`vendor.name is null`);
          }
        })
      );

    if (category !== "0" && category) {
      const filterProductQuery = AppDataSource.getRepository(Product)
        .createQueryBuilder()
        .distinctOn(["product.id"])
        .from(Product, "product")
        .leftJoinAndSelect("product.categories", "categories")
        .where("categories.id = :category")
        .select("product.id");

      queryProduct = queryProduct.andWhere(
        `product.id IN (${filterProductQuery.getQuery()})`,
        {
          category,
        }
      );
    }
    if (stock_status !== "all") {
      if (stock_status === "in") {
        queryProduct = queryProduct.andWhere("product.amount > :amount", {
          amount: 100,
        });
      } else if (stock_status === "low") {
        queryProduct = queryProduct.andWhere(
          "product.amount between :lowAmount and :highAmount",
          {
            lowAmount: 1,
            highAmount: 100,
          }
        );
      } else {
        queryProduct = queryProduct.andWhere("product.amount = 0");
      }
    }
    if (availability !== "all") {
      queryProduct = queryProduct.andWhere("product.enabled = :isEnabled", {
        isEnabled: availability === "1" ? "true" : "false",
      });
    }
    if (searchTypes.length) {
      searchTypes.forEach((type) => {
        if (!type) return;
        queryProduct = queryProduct.andWhere(
          `product.${type} like :searchType${type}`,
          {
            [`searchType${type}`]: `%${type}%`,
          }
        );
      });
    }

    const totalCountQuery = queryProduct.clone();

    queryProduct = queryProduct
      .skip((page - 1) * count)
      .take(count)
      .orderBy(`product.${sort}`, order_by);

    const [data, recordCount] = await Promise.all([
      queryProduct.getMany(),
      totalCountQuery.getCount(),
    ]);
    return { data, recordCount };
  };
  uploadImage = async (productId: number, fileInfo: Express.Multer.File) => {
    const product = await AppDataSource.manager.findOne(Product, {
      where: { id: productId },
    });
    if (!product) {
      return;
    }
    const newImage = new Image();
    newImage.file = fileInfo.filename;
    newImage.productId = product.id;
    newImage.url = "http://localhost:8000/uploads/" + fileInfo.filename;
    await AppDataSource.manager.save(newImage);
  };
}

export default new ProductServices();
