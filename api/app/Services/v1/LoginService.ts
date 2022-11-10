import LoginException from "App/Exceptions/LoginException";
import LoginRequest from "App/Models/Transfer/LoginRequest";
import User from 'App/Models/Access/User'
import Hash from '@ioc:Adonis/Core/Hash'

export default class LoginService {
  public async login(payload: LoginRequest): Promise<any> {
    const user = await User
      .query()
      .where('email', payload.email)
      .firstOrFail();

    if (!user) {
      throw new LoginException("LOGIN_ERROR", 400)
    }

    if (!(await Hash.verify(user.password, payload.password))) {
      throw new LoginException("VALIDATE_ERROR", 400)
    }

    return user;
  }
}