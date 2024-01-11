import { Entity, Column, JoinColumn, OneToOne } from "typeorm";
import { Order as MedusaOrder } from "@medusajs/medusa";

@Entity()
export class Order extends MedusaOrder {
  @Column({ type: "timestamp", nullable: true })
  delivery_date: Date;
  
}