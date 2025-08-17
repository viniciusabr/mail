import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { mockLogger } from '../../mocks/logger.mock.js';
import { makeNext, makeReq, makeRes } from '../../mocks/http.mock.js';
import { mockValidationSchema } from '../../mocks/mock.validation.schema.js';
import { mockAuthService } from '../../mocks/mock.auth.service.js';

const logger = await mockLogger();

const { register } = await import('../../../src/app/controllers/auth.controller.js');

describe('register controller', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('retorna 400 e loga warn quando e-mail não é @linx.com.br', async () => {
    const req = makeReq({
      name: 'Valeria',
      email: 'valeria1@gmail.com'
    });
    const res = makeRes();
    const next = makeNext();

    await register(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Cadastro permitido apenas com e-mails @linx.com.br'
    });
    expect(logger.warn).toHaveBeenCalledWith(
      '⚠️ [REGISTER CONTROLLER] E-mail inválido para registro: valeria1@gmail.com'
    );
    expect(next).not.toHaveBeenCalled();
  });

  it('valida o schema de registro corretamente', async () => {
    // Cenário 1 - sem erro no validate
    jest.resetModules();

    // Mock dos schemas e do serviço
    mockValidationSchema(true);
    mockAuthService();  // Mock do serviço

    const logger = await mockLogger(); // Mock do logger
    const service = await import('../../../src/app/services/auth.service.js'); // importa o módulo mockado


    const req = makeReq({ email: 'teste@linx.com.br' });  // Dados de requisição mockados
    const res = makeRes();  // Resposta mockada
    const next = makeNext();  // Função next mockada

    const { register } = await import('../../../src/app/controllers/auth.controller.js');  // Importa o controlador
    const { registerSchema } = await import('../../../src/app/validations/auth.validation.js')

    // Chama a função do controlador
    await register(req, res, next);

    // Verifica as chamadas e o comportamento esperado:
    expect(registerSchema.validate).toHaveBeenCalledWith(req.body);  // Verifica se o validate foi chamado com os dados da requisição
    expect(res.status).toHaveBeenCalledWith(201);  // Verifica se o status retornado é 201
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      message: 'Usuário registrado com sucesso',  // Verifica a mensagem na resposta
    }));
    expect(next).not.toHaveBeenCalled();  // Verifica se o 'next' não foi chamado

    // Verifica se o serviço de registro foi chamado corretamente
    expect(service.register).toHaveBeenCalledTimes(1);  // Verifica que a função foi chamada exatamente uma vez
    expect(service.register).toHaveBeenCalledWith(
      expect.objectContaining({
        name: req.body.name,  // Verifica se o nome foi passado corretamente
        email: req.body.email,  // Verifica se o e-mail foi passado corretamente
        password: req.body.password,  // Verifica se a senha foi passada corretamente
      })
    );

    // Verifica se o logger registrou a mensagem correta
    expect(logger.info).toHaveBeenCalledWith(
      '✅ [REGISTER CONTROLLER] Registro concluído: teste@linx.com.br'  // Verifica a mensagem do log
    );


    // Cenário 2 - com erro no validate
    // jest.resetModules();
    // const fakeError = { details: [{ message: '"email" is required' }] };

    // await jest.unstable_mockModule('../../../src/app/validations/auth.validation.js', () => ({
    //   registerSchema: { validate: jest.fn().mockReturnValue({ error: fakeError }) },
    //   loginSchema: { validate: jest.fn() },
    // }));

    // const loggerLocal = await mockLogger('../../../src/config/logger.js');
    // const { register: registerLocal2 } = await import('../../../src/app/controllers/auth.controller.js');
    // const { registerSchema: registerSchema2 } = await import('../../../src/app/validations/auth.validation.js');

    // const req2 = makeReq({}); // body inválido
    // const res2 = makeRes();
    // const next2 = makeNext();

    // await registerLocal2(req2, res2, next2);

    // expect(registerSchema2.validate).toHaveBeenCalledWith(req2.body);
    // expect(res2.status).toHaveBeenCalledWith(400);
    // expect(res2.json).toHaveBeenCalledWith({ message: '"email" is required' });
    // expect(loggerLocal.warn).toHaveBeenCalledWith(
    //   '⚠️ [REGISTER CONTROLLER] Falha na validação do schema: "email" is required'
    // );
    // expect(next2).not.toHaveBeenCalled();
  });

});
