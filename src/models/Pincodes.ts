import { BeforeInsert, Column, Entity, PrimaryColumn } from "typeorm";
import { BaseEntity } from "@medusajs/medusa";
import { generateEntityId } from "@medusajs/medusa/dist/utils";

@Entity()
export class Pincode extends BaseEntity {
  @PrimaryColumn()
  id: string;
  
  @Column({ type: "varchar", nullable: true })
  name: string;

  @Column({ type: "varchar" })
  pincode: string;

  @Column({ type: "varchar" })
  district: string;

  // @BeforeInsert()
  // private beforeInsert(): void {
  //   this.id = generateEntityId(this.id, "pin_");
  // }
}
