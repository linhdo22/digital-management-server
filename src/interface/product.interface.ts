import { Brand } from "src/entity/brand";
import { Category } from "src/entity/category";
import { Image } from "src/entity/image";
import { Shipping } from "src/entity/shipping";

const productResult = {
  user: { profile_id: "7126", login: "admin.training@powergatesoftware.com" },
  data: {
    id: "2182",
    vendor_id: "1433",
    name: "(22-in-1)  Card Reader + 22 in 1 Memory Card Case",
    sku: "ss-1426",
    sort_description: "",
    description:
      "<p>PULUZ Card Reader + 22 in 1 Memory Card Case for 1Standard SIM + 2Micro-SIM + 2Nano-SIM + 3CF + 7SD + 6TF + 1CARD PIN</p>",
    enabled: "1",
    quantity: "50",
    price: "29.0000",
    participate_sale: "0",
    sale_price: "0.0000",
    tax_exempt: "0",
    arrival_date: "1579910400",
    facebook_marketing_enabled: "1",
    google_feed_enabled: "1",
    og_tags_type: "0",
    meta_desc_type: "C",
    meta_keywords: "",
    meta_description: "PULUZ Card Reader and 22-in-1 memory card case",
    product_page_title: "",
    code: "en",
    weight: "0.0000",
    inventory_tracking: "0",
    og_tags:
      '<meta property="og:title" content="(22-in-1)  Card Reader + 22 in 1 Memory Card Case" />\n<meta property="og:type" content="product" />\n<meta property="og:url" content="[PAGE_URL]" />\n<meta property="og:site_name" content="Gear Focus" />\n<meta property="og:description" content="PULUZ Card Reader + 22 in 1 Memory Card Case for 1Standard SIM + 2Micro-SIM + 2Nano-SIM + 3CF + 7SD + 6TF + 1CARD PIN" />\n<meta property="og:locale" content="en_US" />\n<meta property="og:image" content="[IMAGE_URL]" />\n<meta property="og:image:width" content="600" />\n<meta property="og:image:height" content="600" />\n<meta property="fb:app_id" content="2178824512245106" />\n<meta property="product:availability" content="instock" />\n<meta property="product:category" content="Memory Cards" />\n<meta property="product:condition" content="new" />\n<meta property="product:price:amount" content="29" />\n<meta property="product:price:currency" content="USD" />',
    sale_price_type: "$",
    brand_id: "52",
    condition_id: "262",
    shipping: [
      { id: "1", zone_name: "Continental U.S.", price: "0.0000" },
      { id: "57", zone_name: "Everywhere Else", price: "0.0000" },
    ],
    categories: [],
    images: [
      {
        id: "4980",
        file: "PULUZ-Card-Reader-22-in-1-Memory-Card-Case-for-1Standard-SIM-2Micro-SIM-2Nano-SIM.jpg_640x640.jpg",
        thumbs: [
          "https://files.gearfocus.com/var/images/product/122.122/PULUZ-Card-Reader-22-in-1-Memory-Card-Case-for-1Standard-SIM-2Micro-SIM-2Nano-SIM.jpg_640x640.jpg",
          "https://files.gearfocus.com/var/images/product/244.244/PULUZ-Card-Reader-22-in-1-Memory-Card-Case-for-1Standard-SIM-2Micro-SIM-2Nano-SIM.jpg_640x640.jpg",
          "https://files.gearfocus.com/var/images/product/460.460/PULUZ-Card-Reader-22-in-1-Memory-Card-Case-for-1Standard-SIM-2Micro-SIM-2Nano-SIM.jpg_640x640.jpg",
        ],
      },
      {
        id: "4981",
        file: "PULUZ-Card-Reader-22-in-1-Memory-Card-Case-for-1Standard-SIM-2Micro-SIM-2Nano-SIM.jpg",
        thumbs: [
          "https://files.gearfocus.com/var/images/product/122.122/PULUZ-Card-Reader-22-in-1-Memory-Card-Case-for-1Standard-SIM-2Micro-SIM-2Nano-SIM.jpg",
          "https://files.gearfocus.com/var/images/product/244.244/PULUZ-Card-Reader-22-in-1-Memory-Card-Case-for-1Standard-SIM-2Micro-SIM-2Nano-SIM.jpg",
          "https://files.gearfocus.com/var/images/product/460.460/PULUZ-Card-Reader-22-in-1-Memory-Card-Case-for-1Standard-SIM-2Micro-SIM-2Nano-SIM.jpg",
        ],
      },
      {
        id: "4982",
        file: "HTB1uv0IasfrK1RkSmLyq6xGApXa7.jpg",
        thumbs: [
          "https://files.gearfocus.com/var/images/product/122.122/HTB1uv0IasfrK1RkSmLyq6xGApXa7.jpg",
          "https://files.gearfocus.com/var/images/product/244.244/HTB1uv0IasfrK1RkSmLyq6xGApXa7.jpg",
          "https://files.gearfocus.com/var/images/product/460.460/HTB1uv0IasfrK1RkSmLyq6xGApXa7.jpg",
        ],
      },
    ],
    memberships: [],
  },
  success: true,
  errors: false,
};

interface IShippingParams {
  id: Shipping["id"];
  price: string;
  zone_name?: Shipping["name"];
}

export interface INewProduct {}

export interface IParamsProduct {
  vendor_id: string;
  name: string;
  brand_id: Brand["id"];
  condition_id: string;
  categories:
    | Category["id"][]
    | { category_id: string | number; name: string }[];
  description: string;
  sort_description?: string;
  enabled: boolean;
  memberships: [];
  shipping_to_zones?: IShippingParams[];
  taxExempt?: boolean;
  price: number;
  participate_sale: number;
  sale_price_type: string;
  sale_price: number;
  arrival_date: Date | string;
  inventory_tracking: number | string;
  quantity: number | string;
  sku: string;
  og_tags_type: "0" | "1"; // 0:auto, 1: cutsom
  og_tags: string;
  enableOffers?: string;
  meta_desc_type: "C" | "A";
  meta_description: string;
  meta_keywords: string;
  product_page_title: string;
  facebook_marketing_enabled: boolean;
  google_feed_enabled: boolean;
  imagesInfo?: Image[];
  imagesOrder?: string[];
  images?: Image[];
  id?: string;
  deleted_images?: string[];
  code?: string;
  weight?: number | string;
  cleanURL?: string;
}

export type IStockStatus = "all" | "in" | "low" | "out";

export interface IFilterProduct {
  availability: "all" | "1" | "0";
  category: Category["id"] | "0";
  search: string;
  search_type: string; //"sku,name"
  sort: "name" | "sku" | "price" | "amout" | "vendor" | "arrivalDate";
  stock_status: IStockStatus;
  vendor: string;
  count: number;
  order_by: "ASC" | "DESC";
  page: number;
}
