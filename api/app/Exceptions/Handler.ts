/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/

import Logger from '@ioc:Adonis/Core/Logger'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'

export default class ExceptionHandler extends HttpExceptionHandler {

  constructor() {
    super(Logger)
  }

  async makeJSONResponse(error, ctx) {
    ctx.response.status(error.status).send({
      code: error.code,
      result: {
        title: error.name || 'ExceptionHandler',
        message: error.message,
        ...(process.env.NODE_ENV === 'development' && !ctx.request.header("X-Api-Key") ? { stack: error.stack ? error.stack.split("\n") : error } : {}),
      }
    })
  }

  async makeJSONAPIResponse(error, ctx) {
    ctx.response.status(error.status).send({
      errors: [
        {
          title: error.message,
          ...(process.env.NODE_ENV === 'development' && !ctx.request.header("X-Api-Key") ? { detail: error.stack.split("\n") } : {}),
          code: error.code,
          status: error.status,
        },
      ],
    });
  }

  public async handle(error: any, ctx: HttpContextContract) {
    error.status = error.status || 500;

    if (typeof error.handle === 'function') {
      return error.handle(error, ctx);
    }
    
    switch (ctx.request.accepts(['html', 'application/vnd.api+json', 'json'])) {
      case 'html':
      case null:
        return this.makeHtmlResponse(error, ctx);
      case 'json':
        return this.makeJSONResponse(error, ctx);
      case 'application/vnd.api+json':
        return this.makeJSONAPIResponse(error, ctx);
    }
  }
}
