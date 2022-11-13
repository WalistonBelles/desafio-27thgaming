import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LogoutException from 'App/Exceptions/LogoutException'
import HttpBody from 'App/Models/Transfer/HttpBody'
import HttpHeader from 'App/Models/Transfer/HttpHeader'
import LoginService from 'App/Services/v1/LoginService'
import LoginValidator from 'App/Validators/v1/LoginValidator'

export default class LoginController {
  public loginService = new LoginService();

  /**
  * @swagger
  * /v1/login:
  *   post:
  *     tags:
  *       - Auth V1
  *     summary: Grant access to the system
  *     parameters:
  *       - name: email
  *         schema:
  *           type: string
  *         in: body
  *         required: true
  *       - name: password
  *         schema:
  *           type: string
  *         in: body
  *         required: true
  *       - name: rememberMe
  *         schema:
  *           type: boolean
  *         in: body
  *         required: false
  *     responses:
  *       200:
  *         content:
  *           application/json:
  *             schema:
  *               type: object 
  *               properties:
  *                 code:
  *                   type: string
  *                   enum: [LOGIN_SUCCESS]
  *                 result:
  *                   type: object
  *                   properties:
  *                     type: 
  *                       type: "bearer"
  *                     token: 
  *                       type: string
  *                     expires_at: 
  *                       type: string
  *                     expires_in: 
  *                       type: number
  *                     payload:
  *                       type: object
  *                       properties:
  *                         id:
  *                           type: number
  *                         name:
  *                           type: string
  *                         photo:
  *                           type: string
  *       400:
  *         content:
  *           application/json:
  *             schema:
  *               type: object 
  *               properties:
  *                 code:
  *                   type: string
  *                   enum: [VALIDATE_ERROR, LOGIN_ERROR, REQUEST_ERROR]
  *                 result:
  *                   type: array
  *                   items:
  *                     type: object
  *                     properties:
  *                       title: 
  *                         type: string
  *                       message: 
  *                         type: string
  *                       errors:
  *                         type: array
  *                         items:
  *                           type: object
  *                           properties:
  *                             message:
  *                               type: string
  *                             rule: 
  *                               type: string
  *                             field: 
  *                               type: string
  */
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

  /**
  * @swagger
  * /v1/logout:
  *   get:
  *     tags:
  *       - Auth V1
  *     summary: Logout from the system
  *     responses:
  *       200:
  *         content:
  *           application/json:
  *             schema:
  *               type: object 
  *               properties:
  *                 code:
  *                   type: string
  *                   enum: [LOGOUT_SUCCESS]
  *                 result:
  *                   type: object
  *                   properties:
  *                     validate:
  *                       type: boolean
  *       400:
  *         content:
  *           application/json:
  *             schema:
  *               type: object 
  *               properties:
  *                 code:
  *                   type: string
  *                   enum: [LOGOUT_ERROR]
  *                 result:
  *                   type: array
  *                   items:
  *                     type: object
  *                     properties:
  *                       title: 
  *                         type: string
  *                       message: 
  *                         type: string
  *                       errors:
  *                         type: array
  *                         items:
  *                           type: object
  *                           properties:
  *                             message:
  *                               type: string
  *                             rule: 
  *                               type: string
  *                             field: 
  *                               type: string
  */
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