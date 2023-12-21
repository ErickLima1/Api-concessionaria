import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Vehicle extends BaseSchema {
  protected tableName = 'vehicles';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary(),
      table.string('tipo').notNullable(),
      table.integer('ano').notNullable(),
      table.string('cor').notNullable(),
      table.integer('user_id').references('id')
        .inTable('users').onDelete('CASCADE');
      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
