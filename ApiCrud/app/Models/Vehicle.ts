import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Vehicle extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public tipo: string

  @column()
  public ano: number

  @column()
  public cor: string

  @column({ columnName: 'user_id' })
  public userId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
