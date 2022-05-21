import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddCarsDailyRate1653169207771 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'cars',
      new TableColumn({
        name: 'daily_rate',
        type: 'numeric',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('cars', 'daily_rate');
  }
}
