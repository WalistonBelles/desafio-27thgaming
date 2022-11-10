import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LogoutException from 'App/Exceptions/LogoutException'
import HttpBody from 'App/Models/Transfer/HttpBody'
import HttpHeader from 'App/Models/Transfer/HttpHeader'
import LoginService from 'App/Services/v1/LoginService'
import LoginValidator from 'App/Validators/v1/LoginValidator'

export default class LoginController {

  public loginService = new LoginService();

  public async login(ctx: HttpContextContract) {
    const payload = await ctx.request.validate(LoginValidator);

    const auth = await this.loginService.login(payload);

    const data = {
      name: auth.name
    };

    const expiresIn = payload.rememberMe ? 86400000 : 3600000

    const token = await ctx.auth.use('api').generate(auth, { expiresIn });

    const body: HttpBody = { 
      code: 'LOGIN_SUCCESS', 
      result: { 
        ...token.toJSON(), 
        payload: { id: auth.id, ...data }  
      } 
    }

    ctx.response.status(200).send(body)
  }

  public async logout(ctx: HttpContextContract) {

    if (!ctx.request.header('Authorization')) {
      throw new LogoutException('LOGOUT_ERROR', 400)
    }

    await ctx.auth.use('api').revoke()

    const headers: HttpHeader[] = [
      { key: 'Content-type', value: 'application/json' }
    ]

    const body: HttpBody = { code: 'LOGOUT_SUCCESS', result: { revoked: true } }

    ctx.response.status(200).send({body, headers });
  }
}