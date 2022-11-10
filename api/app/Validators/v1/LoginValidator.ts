import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ReportHandler from './Reporters/ReportHandler'

export default class LoginValidator {
  
  constructor (protected ctx: HttpContextContract) {}

  public reporter = ReportHandler

  public schema = schema.create({
    email: schema.string({}, [ rules.email() ]),
    password: schema.string(),
    rememberMe: schema.boolean()
  })

  public messages = {}
}
