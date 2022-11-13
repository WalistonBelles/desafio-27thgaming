import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SwaggerController {
  public index(ctx: HttpContextContract) {
    const specUrl = 'swagger.json'
	  return ctx.view.render('swagger', { specUrl })
  }
}