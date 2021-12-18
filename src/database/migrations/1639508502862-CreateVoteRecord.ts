import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateVoteRecord1639508502862 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table(
        {
          name: 'vote_records',
          columns: [
            {
              name: 'id_vote_record',
              type: 'uuid',
              generationStrategy: "uuid",
              isPrimary: true,
              isUnique: true,
              default: 'uuid_generate_v4()'
            },
            {
              name: 'type_vote',
              type: 'boolean'
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
      ));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('vote_records');
    }

}
