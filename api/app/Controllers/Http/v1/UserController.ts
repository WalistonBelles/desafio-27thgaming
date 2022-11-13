import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import HttpBody from 'App/Models/Transfer/HttpBody'
import HttpHeader from 'App/Models/Transfer/HttpHeader'
import UserService from 'App/Services/v1/UserService'
import CreateUserValidator from 'App/Validators/v1/CreateUserValidator'
import UpdateUserValidator from 'App/Validators/v1/UpdateUserValidator'
export default class UserController {

  private userService: UserService = new UserService();

  /**
  * @swagger
  * /v1/user:
  *   post:
  *     tags:
  *       - User V1
  *     summary: Create a new user
  *     parameters:
  *       - name: name
  *         schema:
  *           type: string
  *         in: body
  *         required: true
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
  *     responses:
  *       200:
  *         content:
  *           application/json:
  *             schema:
  *               type: object 
  *               properties:
  *                 code:
  *                   type: string
  *                   enum: [CREATE_SUCCESS]
  *                 result:
  *                   type: object
  *                   properties:
  *                     expires_at:
  *                       type: string
  *                     token: 
  *                       type: string
  *                     payload: 
  *                       type: object
  *                       properties:
  *                         name:
  *                           type: string
  *                         token:
  *                           type: string
  *                     type: 
  *                       type: string
  *       400:
  *         content:
  *           application/json:
  *             schema:
  *               type: object 
  *               properties:
  *                 code:
  *                   type: string
  *                   enum: [VALIDATION_ERROR]
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
  public async create(ctx: HttpContextContract) {
    const payload = await ctx.request.validate(CreateUserValidator);

    const result = await this.userService.create(payload);

    const headers: HttpHeader[] = [
      { key: 'Content-type', value: 'application/json' }
    ];

    const body: HttpBody = { code: 'CREATE_SUCCESS', result };

    ctx.response.status(200).send({body, headers });
  }

  /**
  * @swagger
  * /v1/users:
  *   patch:
  *     tags:
  *       - User V1
  *     summary: Update a user
  *     parameters:
  *       - name: id
  *         schema:
  *           type: number
  *         in: body
  *         required: true
  *       - name: name
  *         schema:
  *           type: string
  *         in: body
  *       - name: email
  *         schema:
  *           type: string
  *         in: body
  *       - name: password
  *         schema:
  *           type: string
  *         in: body
  *     responses:
  *       200:
  *         content:
  *           application/json:
  *             schema:
  *               type: object 
  *               properties:
  *                 code:
  *                   type: string
  *                   enum: [UPDATE_SUCCESS]
  *                 result:
  *                   type: object
  *                   properties:
  *                     expires_at:
  *                       type: string
  *                     token: 
  *                       type: string
  *                     payload: 
  *                       type: object
  *                       properties:
  *                         name:
  *                           type: string
  *                         token:
  *                           type: string
  *                     type: 
  *                       type: string
  *       400:
  *         content:
  *           application/json:
  *             schema:
  *               type: object 
  *               properties:
  *                 code:
  *                   type: string
  *                   enum: [VALIDATION_ERROR]
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
  public async update(ctx: HttpContextContract) {
    // @ts-ignore
    const payload = await ctx.request.validate(UpdateUserValidator);

    const result = await this.userService.update(payload);

    const headers: HttpHeader[] = [
      { key: 'Content-type', value: 'application/json' }
    ];

    const body: HttpBody = { code: 'UPDATE_SUCCESS', result };

    ctx.response.status(200).send({body, headers });
  }


  /**
  * @swagger
  * /v1/users:
  *   get:
  *     tags:
  *       - User V1
  *     summary: Search for users
  *     parameters:
  *       - name: page
  *         schema:
  *           type: number
  *         in: query
  *         required: true
  *       - name: limit
  *         schema:
  *           type: number
  *         in: query
  *         required: true
  *       - name: preloads
  *         schema:
  *           type: array
  *           items:
  *             type: string
  *         in: query
  *       - name: withCounts
  *         schema:
  *           type: array
  *           items:
  *             type: string
  *       - name: fields
  *         schema:
  *           type: array
  *           items:
  *             type: string
  *         in: query
  *       - name: where
  *         in: query
  *         schema:
  *           type: array
  *           items:
  *             type: object
  *             properties:
  *               name:
  *                 type: object
  *                 properties:
  *                   o:
  *                     type: string
  *                   v:
  *                     type: string
  *                     required: true
  *     responses:
  *       200:
  *         content:
  *           application/json:
  *             schema:
  *               type: object 
  *               properties:
  *                 code:
  *                   type: string
  *                   enum: [SEARCH_FOUND, SEARCH_NOTFOUND]
  *                 result:
  *                   type: array
  *                   items:
  *                     type: object
  *                     properties:
  *                       id:
  *                         type: number
  *                       name: 
  *                         type: string
  *                       email: 
  *                         type: string
  *                       remember_me_token: 
  *                         type: string
  *                       createdAt: 
  *                         type: string
  *                       updatedAt: 
  *                         type: string
  * 
  *       400:
  *         content:
  *           application/json:
  *             schema:
  *               type: object 
  *               properties:
  *                 code:
  *                   type: string
  *                   enum: [VALIDATION_ERROR]
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
  public async search(ctx: HttpContextContract) {
    const result = await this.userService.search();

    const headers: HttpHeader[] = [
      { key: 'Content-type', value: 'application/json' }
    ];

    const body: HttpBody = { code: 'SEARCH_SUCCESS', result };

    ctx.response.status(200).send({body, headers });
  }

  /**
  * @swagger
  * /v1/user:
  *   get:
  *     tags:
  *       - User V1
  *     summary: Find a user
  *     parameters:
  *       - name: preloads
  *         schema:
  *           type: array
  *           items:
  *             type: string
  *         in: query
  *       - name: withCounts
  *         schema:
  *           type: array
  *           items:
  *             type: string
  *       - name: fields
  *         schema:
  *           type: array
  *           items:
  *             type: string
  *         in: query
  *       - name: where
  *         in: query
  *         schema:
  *           type: array
  *           items:
  *             type: object
  *             properties:
  *               name:
  *                 type: object
  *                 properties:
  *                   op:
  *                     type: string
  *                   val:
  *                     type: string
  *                     required: true
  *       - name: subWhere
  *         in: query
  *         schema:
  *           type: array
  *           items:
  *             type: object
  *             properties:
  *               name:
  *                 type: object
  *                 properties:
  *                   op:
  *                     type: string
  *                   val:
  *                     type: string
  *                     required: true
  *     responses:
  *       200:
  *         content:
  *           application/json:
  *             schema:
  *               type: object 
  *               properties:
  *                 code:
  *                   type: string
  *                   enum: [FIND_FOUND, FIND_NOTFOUND]
  *                 result:
  *                   type: object
  *                   properties:
  *                     id:
  *                       type: number
  *                     name: 
  *                       type: string
  *                     email: 
  *                       type: string
  *                     remember_me_token: 
  *                       type: string
  *                     createdAt: 
  *                       type: string
  *                     updatedAt: 
  *                       type: string
  *       400:
  *         content:
  *           application/json:
  *             schema:
  *               type: object 
  *               properties:
  *                 code:
  *                   type: string
  *                   enum: [VALIDATION_ERROR]
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
  public async find(ctx: HttpContextContract) {
    const headers: HttpHeader[] = [
      { key: 'Content-type', value: 'application/json' }
    ];

    if (isNaN(parseFloat(ctx.request.param('id')))) {
      ctx.response.status(200).send({
        body: { code: 'FIND_NOTFOUND' }, 
        headers 
      });
      return;
    }

    const result = await this.userService.find(ctx.request.param('id'));

    const body: HttpBody = { code: 'FIND_FOUND', result };

    ctx.response.status(200).send({body, headers });
  }
}