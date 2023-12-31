import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({}, [
      rules.email(),

    ]),

    password: schema.string({}, [
      
    ])
  });

  public messages: CustomMessages = {
    'email.required': 'O campo email é obrigatório',
    'password.required': 'O campo senha é obrigatório'
  };

};

