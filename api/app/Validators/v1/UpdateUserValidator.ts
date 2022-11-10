import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ReportHandler from './Reporters/ReportHandler'

export default class UpdateUserValidator {
  
  constructor (protected ctx: HttpContextContract) {}

  public reporter = ReportHandler

  public schema = schema.create({
    id: schema.number(),
    name: schema.string.optional({}, [ rules.unique({ table: 'users', column: 'name' }) ]),
    email: schema.string.optional({}, [ rules.email(), rules.unique({ table: 'users', column: 'email' }) ]),
    password: schema.string.optional(),
  })

  public messages = {}
}
