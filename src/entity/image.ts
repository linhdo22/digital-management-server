import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./product";

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  file: string;

  @Column()
  url: string;

  @Column({ nullable: true })
  productId: number;

  @ManyToOne(() => Product, (product) => product.images)
  product: Product;

  @ManyToOne(() => Image, (image) => image.thumbs, { nullable: true })
  srcFile: Image;

  @OneToMany(() => Image, (image) => image.srcFile, { nullable: true })
  thumbs: Image[];
}
