import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import HttpBody from 'App/Models/Transfer/HttpBody'
import RouletteService from 'App/Services/v1/RouletteService'

export default class RouletteController {
  private rouletteService: RouletteService = new RouletteService();
  private betOptions = ['odd', 'even', 'low', 'high', 'red', 'black', 'number'];

  /**
  * @swagger
  * /v1/bet/play/:bet:
  *   get:
  *     tags:
  *       - Roulette V1
  *     summary: Place a bet
  *     parameters:
  *       - name: bet
  *         schema:
  *           type: string
  *     responses:
  *       200:
  *         content:
  *           application/json:
  *             schema:
  *               type: object 
  *               properties:
  *                 code:
  *                   type: string
  *                   enum: [BET_SUCCESS]
  *                 result:
  *                   type: object
  *                   properties:
  *                     success:
  *                       type: boolean
  *                     roll: 
  *                       type: object
  *                       properties:
    *                       number:
    *                         type: number
    *                       color:
    *                         type: string
    *                       parity:
    *                         type: string
  *                     bet: 
  *                       type: object
  *                       properties:
    *                       bet:
    *                         type: string
    *                       wager:
    *                         type: string
    *                       win:
    *                         type: string
    *                       payout_rate:
    *                         type: number
    *                       payout:
    *                         type: string
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
  public async playBet(ctx: HttpContextContract) {
    const bet = ctx.request.param('bet')

    if (!this.betOptions.includes(bet)) {
      const body: HttpBody = { 
        code: 'BET_ERROR',
        result: `Você deve enviar uma das opções: ${this.betOptions}`
      }

      ctx.response.status(400).send(body)
      return
    }
    
    const result = await this.rouletteService.getBet(bet);
    
    const body: HttpBody = { code: 'BET_SUCCESS', result };

    ctx.response.status(200).send({ code: body.code, result: body.result.body});
  }
}