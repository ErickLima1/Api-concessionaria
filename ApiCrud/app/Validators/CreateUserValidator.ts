import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    username: schema.string({}, [
      rules.unique({table: 'users', column: 'username'})
    ]),
    
    email: schema.string({}, [
      rules.email(),
      rules.unique({table: 'users', column: 'email'})

    ]),

    password: schema.string({}, [
      
    ])
  });

  public messages: CustomMessages = {
    'username.required': 'O campo nome de usuário é obrigatório',
    'username.unique': 'O nome de usuário já está em uso',
    'email.required': 'O campo email é obrigatório',
    'email.unique': 'O email já está em uso',
    'password.required': 'O campo senha é obrigatório'
  };

};

