import { Request, Response } from "express";
import { AppDataSource } from "src/config/database";
import { IFilterProduct } from "src/interface/product.interface";
import productService from "src/service/product.service";

class ProductController {
  async createNewProduct(req: Request, res: Response) {
    const { productDetail } = req.body;
    const parsed = JSON.parse(productDetail);

    const result = await productService.create(parsed);
    res.jsonp({ data: result.id });
  }
  async getOne(req: Request, res: Response) {
    const { id } = req.body;
    const product = await productService.get(id);
    // console.log(product);
    const categories = product?.categories.map((category) => category.id);

    res.jsonp({
      data: { ...product, vendor_id: product?.vendor?.id, categories },
    });
  }
  async editProduct(
    req: Request<
      any,
      any,
      any,
      { params: { id: number; enabled?: 1 | 0; delete?: 1 }[] }
    >,
    res: Response
  ) {
    const { params } = req.body;
    await productService.update(params);
    res.json({ data: true });
  }
  async uploadPhoto(req: Request, res: Response) {
    const { order, productId } = req.body;
    const file = req.file;
    if (file) await productService.uploadImage(productId, file);
    res.jsonp({ data: true });
  }
  async getList(req: Request, res: Response) {
    const filter: IFilterProduct = req.body;
    const { data, recordCount } = await productService.getList(filter);
    const result = data.map((product) => ({
      ...product,
      vendor: product?.vendor?.name,
    }));

    res.jsonp({ data: result, recordsTotal: recordCount });
  }
}

export default new ProductController();
