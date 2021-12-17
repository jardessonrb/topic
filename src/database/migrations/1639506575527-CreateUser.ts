import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUser1639506575527 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'users',
        columns: [
          {
            name: 'id_user',
            type: 'uuid',
            generationStrategy: "uuid",
            isPrimary: true,
            isUnique: true,
            default: 'uuid_generate_v4()'
          },
          {
            name: 'name_user',
            type: 'varchar'
          },
          {
            name: 'password_user',
            type: 'varchar'
          },
          {
            name: 'email_user',
            type: 'varchar',
            isUnique: true
          },
          {
            name: "created_at",
            type: "Date",
            isNullable: false,
            default: "NOW()"
          }
        ]
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('users');
    }

}
