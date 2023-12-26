import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import CreateUserValidator from 'App/Validators/CreateUserValidator';
import User from 'App/Models/User';

export default class UsersController {
    
    public async index({response}:HttpContextContract) { //Aqui vai fazer a lista de Todos usuarios tem. 
        try {
            const users = await User.all();  
            
            return users;   

        } catch (error) {
            return response.status(500).json({ message: 'Ocorreu um Erro em Buscar Lista de usuarios.'});
        };
    };
    
    public async store({ request, response }:HttpContextContract) { //Store = Create OR Register
        try {
            const body = await request.validate(CreateUserValidator);

            const user = await User.create({
              username: body.username,
              email: body.email,
              password: body.password,

            });
            
            return response.status(200).json({ message: 'Usuário cadastrado com sucesso', user });

          } catch (error) {
            return response.status(400).json({ error: 'Erro na validação dos dados', errors: error.messages });
        };
    };

    public async show({ response, request }:HttpContextContract) {
        try {
            const userId = request.param('id');
            const users = await User.findOrFail(userId);  
            
            return users;   
            
        } catch(error) {
            return response.status(500).send({ error: 'Ocorreu um Erro em Buscar Lista de usuarios.'});

        };
    };

    public async update({ request, response }: HttpContextContract) {
        try {
            const userId = request.param('id');
            const body = await request.validate(CreateUserValidator);

            const user = await User.findOrFail(userId);
            await user.merge(body).save();

            return user;

        } catch (error) {
            if (error.messages) {
                return response.status(400).json({ error: 'Erro na validação dos dados', errors: error.messages });
            } else {
                console.log(error);
                return response.status(500).json({ error: 'Ocorreu um Erro na Atualização.' });
            };
        };
    };
    
    public async destroy({ request, response }:HttpContextContract) {
        try {
            const userId = request.param('id');
            const user = await User.findOrFail(userId)
    
            await user.delete();

            return response.status(200).json({ error: 'Usuário Deletado Com Sucesso.'});
            
        } catch (error) {
            return response.status(500).json({ error: 'Ocorreu um Erro ao Deletar Usuário.' });
            
        };

    };

};
