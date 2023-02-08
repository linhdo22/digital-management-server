import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Brand } from "./brand";
import { Category } from "./category";
import { Image } from "./image";
import { Membership } from "./membership";
import { ShippingToZone } from "./shipping";
import { Vendor } from "./vendor";

@Entity()
export class Product {
  [key: string]: any;

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  brand_id: number;

  @OneToOne(() => Brand)
  @JoinColumn()
  brand: Brand;

  @Column()
  arrival_date: Date;

  @Column({ nullable: true })
  condition_id: string;

  @Column()
  created: Date;

  @Column()
  description: string;

  @Column()
  enabled: boolean;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  sku: string;

  @ManyToOne(() => Vendor)
  vendor: Vendor;

  @Column({ nullable: true })
  weight: string;

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];

  @Column({ nullable: true })
  sort_description?: string;

  @ManyToMany(() => Membership, (membership) => membership)
  @JoinTable()
  memberships: Membership[];

  @OneToMany(() => ShippingToZone, (shippingToZone) => shippingToZone.product, {
    cascade: true,
  })
  shipping_to_zones?: ShippingToZone[];

  @Column()
  tax_exempt: boolean;

  @Column()
  participate_sale: boolean;

  @Column({ nullable: true })
  sale_price_type: string;

  @Column()
  sale_price: number;

  @Column({ nullable: true })
  inventory_tracking: string;

  @Column()
  quantity: number;

  @Column()
  og_tags_type: string;

  @Column({ nullable: true })
  og_tags: string;

  @Column()
  meta_desc_type: string; //'A'| 'C'

  @Column({ nullable: true })
  meta_description: string;

  @Column({ nullable: true })
  meta_keywords: string;

  @Column()
  product_page_title: string;

  @Column()
  facebook_marketing_enabled: boolean;

  @Column()
  google_feed_enabled: boolean;

  @OneToMany(() => Image, (image) => image.product)
  images?: Image[];

  @OneToMany(() => Image, (image) => image.product)
  deleted_images?: string[];

  @Column({ nullable: true })
  code: string;

  @Column()
  cleanURL: string;
}
