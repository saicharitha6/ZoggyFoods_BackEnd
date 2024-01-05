import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "@medusajs/medusa";
import { generateEntityId } from "@medusajs/medusa/dist/utils";

@Entity()
export class DeliveryLocation extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  
  @Column({ type: "varchar", nullable: true })
  area: string;

  @Column({ type: "varchar" })
  pincode: string;

  @Column({ type: "varchar" })
  district: string;

  @Column({ type: "boolean", default: false }) // New column for tracking selected areas
  is_deliverable: boolean;

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, "dl_");
  }
}
