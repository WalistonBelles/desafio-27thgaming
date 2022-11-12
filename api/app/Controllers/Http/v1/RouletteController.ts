import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import HttpBody from 'App/Models/Transfer/HttpBody'
import RouletteService from 'App/Services/v1/RouletteService'

export default class RouletteController {
  private rouletteService: RouletteService = new RouletteService();
  private betOptions = ['odd', 'even', 'low', 'high', 'red', 'black', 'number'];

  public async playBet(ctx: HttpContextContract) {
    const bet = ctx.request.param('bet')

    if (!this.betOptions.includes(bet)) {
      const body: HttpBody = { 
        code: 'BET_ERROR',
        result: `Você deve enviar uma das opções: ${this.betOptions}`
      }

      ctx.response.status(400).send(body)
    }
    
    const result = await this.rouletteService.getBet(bet);
    
    const body: HttpBody = { code: 'BET_SUCCESS', result };

    ctx.response.status(200).send({ code: body.code, result: body.result.body});
  }
}