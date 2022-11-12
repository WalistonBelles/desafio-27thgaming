import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import HttpBody from 'App/Models/Transfer/HttpBody'
import HttpHeader from 'App/Models/Transfer/HttpHeader'
import UserService from 'App/Services/v1/UserService'
import CreateUserValidator from 'App/Validators/v1/CreateUserValidator'
import UpdateUserValidator from 'App/Validators/v1/UpdateUserValidator'
export default class UserController {

  private userService: UserService = new UserService();

  public async create(ctx: HttpContextContract) {
    const payload = await ctx.request.validate(CreateUserValidator);

    const result = await this.userService.create(payload);

    const headers: HttpHeader[] = [
      { key: 'Content-type', value: 'application/json' }
    ];

    const body: HttpBody = { code: 'CREATE_SUCCESS', result };

    ctx.response.status(200).send({body, headers });
  }

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

  public async search(ctx: HttpContextContract) {
    const result = await this.userService.search();

    const headers: HttpHeader[] = [
      { key: 'Content-type', value: 'application/json' }
    ];

    const body: HttpBody = { code: 'SEARCH_SUCCESS', result };

    ctx.response.status(200).send({body, headers });
  }

  public async find(ctx: HttpContextContract) {
    const result = await this.userService.find(ctx.request.param('id'));

    const headers: HttpHeader[] = [
      { key: 'Content-type', value: 'application/json' }
    ];

    const body: HttpBody = { code: 'SEARCH_SUCCESS', result };

    ctx.response.status(200).send({body, headers });
  }
}