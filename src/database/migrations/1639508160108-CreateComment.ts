import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateComment1639508160108 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table(
        {
          name: 'comments',
          columns: [
            {
              name: 'id_comment',
              type: 'uuid',
              generationStrategy: "uuid",
              isPrimary: true,
              isUnique: true,
              default: 'uuid_generate_v4()'
            },
            {
              name: 'body',
              type: 'varchar'
            },
            {
              name: 'id_user',
              type: 'uuid'
            },
            {
              name: 'id_topic',
              type: 'uuid'
            },
            {
              name: "created_at",
              type: "timestamp",
              isNullable: false,
              default: "NOW()"
            }
          ]
        }
      ))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('comments');
    }

}
