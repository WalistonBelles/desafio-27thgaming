import { test } from '@japa/runner'
import User from 'App/Models/Access/User'

test.group('Logout user', async () => {
  test('user logout from the system', async ({ client }) => {
    const user = await User.find(1)

    const response = await client
      .get('/v1/logout')
      .guard('api')
      .loginAs(user)
    response.assertStatus(200)
    response.assertBodyContains({
      body: {
        code: 'LOGOUT_SUCCESS'
      }
    })
  })
  test('user must be authenticated to be able to log out', async ({ client }) => {
    const response = await client
      .get('/v1/logout')
    response.assertStatus(400)
    response.assertBodyContains({
      code: 'LOGOUT_ERROR'
    })
  })
})