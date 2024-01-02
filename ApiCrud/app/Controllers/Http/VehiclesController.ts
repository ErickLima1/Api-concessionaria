import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';
import Vehicle from 'App/Models/Vehicle'
import VehicleUserValidator from 'App/Validators/VehicleUserValidator';

export default class VehiclesController { 
  public async index({ response }: HttpContextContract) { 
    try {
      const vehicle =  await Vehicle.query().preload('user');
      
      if(vehicle.length === 0) {
        return response.status(400).json({ message: 'Não há lista de carros'});
      };

      return vehicle;
      
    } catch (error) {
      return response.status(500).json({ error: 'Ocorreu um Erro ao Buscar a Lista de Veículos'});
    };
  };
  
  //[X] Falta Fazer Validations
  public async store({request, response, auth}: HttpContextContract) { 
    try {
    
      if(!auth.user) {
        // console.log('Usuário Não Autenticado:')
        return response.status(401).json({ error: 'Usuário Não Autheticado'});
      }; 
      
      const body = await request.validate(VehicleUserValidator);

      // console.log('Informações do Veículo Recebidas:', body);

      const vehicle = await Vehicle.create({ userId: auth.user.id, ...body });
      // console.log('Veículo Criado:', vehicle);

      return response.status(200).json({ message: 'Usuário cadastrado com sucesso', vehicle });

    } catch (error) {
      // console.error('Erro ao criar veículo:', error.messages);
      return response.status(500).json({ error: 'Ocorreu um Erro ao Criar o Veiculo', errors:error.messages });
    };

  };
  
  //Apenas um usuario especifio e o seus veiculos
  public async show({ response, params }: HttpContextContract) { 
    try {
      const userId = params.id;
      const user = await User.findOrFail(userId);

      await user.load('vehicles');

      if (user.vehicles.length === 0) {
        return response.status(200).json({
          message: 'Usuário não possui veículo cadastrado.',
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
          },
        });
      };

      return user;

    } catch (error) {
      return response.status(500).json({ error: 'Usuário não encontrado'});

    };
  };
  //[X] Falta Fazer Validations
  public async update({request, response, params, auth}: HttpContextContract) { //[X]Falta TESTAR
    try {
      const vehicleId = params.id;
      const body = await request.validate(VehicleUserValidator);

      const vehicle = await Vehicle.findOrFail(vehicleId);
      

      if(vehicle.userId !== auth.user?.id) {
        return response.status(403).json({ error: 'Sem permissão para atualizar este veículo'});
        
      };
      
      await vehicle.merge(body).save();

      return response.status(200).json({  message: 'Veiculo Atualizado', vehicle});

    } catch (error) {
      // console.error('Erro ao criar veículo:', error.messages);
      return response.status(400).json({error: 'Ouve Um Erro Inesperado !', errors: error.messages });

    };
  };

  public async destroy({ request, response, auth}: HttpContextContract) {
    try {
      const vehicleId = request.param('id');
      const vehicle = await Vehicle.findOrFail(vehicleId);

      await vehicle.delete();

      if(vehicle.userId !== auth.user?.id) {
        return response.status(403).json({ error: 'Sem permissão para Deletar este veículo'})
      };

      return response.status(200).json({ message: 'Veiculo Deletado Com Sucesso.'});

    } catch (error) {
      return response.status(500).json({ error: 'Ocorreu um Erro ao Deletar Usuário.' });
      
    };
  };
};