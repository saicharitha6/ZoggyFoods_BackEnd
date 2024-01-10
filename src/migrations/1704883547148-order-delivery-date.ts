import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class OrderDeliveryDate1704883547148 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "order", // Name of the table
            new TableColumn({
                name: "delivery_date",
                type: "timestamp",
                isNullable: true,
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("order", "delivery_date");
    }
}
