import { MigrationInterface, QueryRunner } from "typeorm"

export class UpdateCustomer1704427776316 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
          "ALTER TABLE \"customer\"" +
          " ADD COLUMN \"dl_id\" VARCHAR(255) NULL"
        );
        await queryRunner.query(
          "ALTER TABLE \"customer\"" +
          " ADD CONSTRAINT \"FK_customer_dl_id\"" +
          " FOREIGN KEY (\"dl_id\") REFERENCES \"delivery_location\"(\"id\")"
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
          "ALTER TABLE \"customer\" DROP COLUMN \"dl_id\""
        );
        await queryRunner.query(
          "ALTER TABLE \"customer\" DROP CONSTRAINT \"FK_customer_dl_id\""
        );
      }
}
