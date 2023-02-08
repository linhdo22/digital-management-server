import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Country {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    nullable: true,
  })
  active_currency: string;

  @Column()
  code: string;

  @Column()
  code3: string;

  @Column()
  country: string;

  @Column()
  currency_id: string;

  @Column()
  enabled: boolean;

  @Column()
  is_fraudlent: boolean;
}
