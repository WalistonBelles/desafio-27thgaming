import Database from "@ioc:Adonis/Lucid/Database";
import User from "App/Models/Access/User";
import { DateTime } from "luxon";

export default class UserService {
  public async create(record: Record<string, any>): Promise<User> {
    let user: User = new User().fill(record);

    await Database.transaction(async (trx) => {
      user.useTransaction(trx)
      
      await user.save();
    })
    
    return user;
  }

  public async update(record: Record<string, any>): Promise<User> {
    let user: User = await User.findOrFail(record.id);

    await Database.transaction(async (trx) => {
      user.useTransaction(trx)
      
      user.merge({ ...record })
      
      await user.save()
      
      const createUpdatetimestamp = { created_at: DateTime.local(), updated_at: DateTime.local() }

      if (record.occupations) {
        const occupationsWithTimestamp = {}
        for (let index = 0; index < record.occupations.length; index++) {
          occupationsWithTimestamp[record.occupations[index]] = createUpdatetimestamp
        }
      }

      if (record.roles) {
        const rolesWithTimestamp = {}
        for (let index = 0; index < record.roles.length; index++) {
          rolesWithTimestamp[record.roles[index]] = createUpdatetimestamp
        }
      }
    })
    return user; 
  }

  public async search(): Promise<User[]> {
    const users = await User.all();
    
    return users;
  }

  public async find(record: Record<string, any>): Promise<User> {
    const user: User = await User.findOrFail(record);
    
    return user;
  }
}