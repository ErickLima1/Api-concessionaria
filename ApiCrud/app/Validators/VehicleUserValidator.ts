import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class VehicleUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    tipo: schema.string({}, [

    ]),
    ano: schema.number([

    ]),
    cor: schema.string({}, [

    ]),
  })

  public messages: CustomMessages = {
    'tipo.required': 'O Campo tipo de carro está em branco.',
    'ano.required': 'O Campo ano do carro está em branco.',
    'ano.integer': 'O Campo ano do carro deve ser um número inteiro.',
    'cor.required': 'O Campo cor do carro está em branco.',
  };
}
