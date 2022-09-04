import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterRental1662322516209 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'rentals',
      'updated_at',
      new TableColumn({
        name: 'updated_at',
        type: 'timestamp',
        isNullable: true,
        default: 'now()',
        onUpdate: 'now()',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'rentals',
      'updated_at',
      new TableColumn({
        name: 'updated_at',
        type: 'timestamp',
        isNullable: true,
      }),
    );
  }
}
