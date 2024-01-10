import { Entity, Column, JoinColumn, OneToOne } from "typeorm";
import { Customer as MedusaCustomer } from "@medusajs/medusa";
import { DeliveryLocation } from './DeliveryLocation';

@Entity()
export class Customer extends MedusaCustomer {
  @Column({ nullable: true })
  dl_id: string;

  @OneToOne(() => DeliveryLocation)
  @JoinColumn({ name: "dl_id", referencedColumnName: "id" })
  deliveryLocation: DeliveryLocation;
}