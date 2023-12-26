import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import AuthUserValidator from 'App/Validators/AuthUserValidator';

export default class AuthController {
    public async login({ auth, request, response }: HttpContextContract) {
        try {
            const { email, password } = await request.validate(AuthUserValidator);

            const token = await auth.use('api').attempt(email, password, {
                expiresIn: '5days',
            });

            const userName = email; 

            return { userName, token };

        } catch (error) {
            if (error.messages) {
                return response.status(400).json({ message: 'Erro na validação dos dados', errors: error.messages });
            }

            if (error.code === 'E_INVALID_AUTH_UID') {
                return response.status(400).json({ message: 'Endereço de e-mail inválido. Verifique novamente.' });
            }

            if (error.code === 'E_INVALID_AUTH_PASSWORD') {
                return response.status(400).json({ message: 'Senha incorreta. Verifique novamente.' });
            }

            return response.status(500).send({ message: 'Ocorreu um Erro Inesperado.' });
        };
    };
};