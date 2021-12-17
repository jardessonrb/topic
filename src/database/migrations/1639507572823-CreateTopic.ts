import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTopic1639507572823 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table(
        {
          name: 'topics',
          columns: [
            {
              name: 'id_topic',
              type: 'uuid',
              generationStrategy: "uuid",
              isPrimary: true,
              isUnique: true,
              default: 'uuid_generate_v4()'
            },
            {
              name: 'title',
              type: 'varchar'
            },
            {
              name: 'body',
              type: 'varchar',
              width: 400,
            },
            {
              name: 'positiveVotes',
              type: 'integer'
            },
            {
              name: 'negativeVotes',
              type: 'integer'
            },
            {
              name: 'is_closed',
              type: 'boolean',
              default: 'false'
            },
            {
              name: 'id_user',
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
      await queryRunner.dropTable('topics');
    }

}
