import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/Access/User'

export default class UserSeeder extends BaseSeeder {

  public async run () {
    await User.createMany([
      {
        name: 'Admin',
        email: 'admin@test.com',
        password: 'admin123',
      },
      {
        name: 'User',
        email: 'user@test.com',
        password: 'user123'
      }
    ])
  }

}
