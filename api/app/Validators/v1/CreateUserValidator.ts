import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ReportHandler from './Reporters/ReportHandler'

export default class CreateUserValidator {
  
  constructor (protected ctx: HttpContextContract) {}

  public reporter = ReportHandler

  public schema = schema.create({
    name: schema.string({}, [ rules.unique({ table: 'users', column: 'name' }) ]),
    email: schema.string({}, [ rules.email(), rules.unique({ table: 'users', column: 'email' }) ]),
    password: schema.string()
  })

  public messages = {}
}
