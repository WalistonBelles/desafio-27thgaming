import { test } from '@japa/runner'
import User from 'App/Models/Access/User'

test.group('Play roullete', async () => {
  const user = await User.find(1)

  test('Play roullete', async ({ client }) => {
    const response = await client
      .get('/v1/play/even')
      .guard('api')
      .loginAs(user)
    
    response.assertStatus(200)
    response.assertBodyContains({
      code: 'BET_SUCCESS'
    })
  })

  test('bet must be valid', async ({ client }) => {
    const response = await client
      .get('/v1/play/a')
      .guard('api')
      .loginAs(user)

    response.assertStatus(400)
    response.assertBodyContains({
      code: 'BET_ERROR'
    })
  })
})