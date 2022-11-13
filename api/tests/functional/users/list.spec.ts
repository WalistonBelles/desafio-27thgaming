import { test } from '@japa/runner'
import User from 'App/Models/Access/User'

test.group('List users', async () => {
  const user = await User.find(1)

  test('Get all users', async ({ client }) => {
    const response = await client
      .get('/v1/users')
      .guard('api')
      .loginAs(user)
    
    response.assertStatus(200)
  })

  test('user must be logged in before get all users', async ({ client }) => {
    const response = await client
      .get('/v1/users')
    response.assertStatus(401)
    response.assertBodyContains({
      errors: [{ message: 'E_UNAUTHORIZED_ACCESS: Unauthorized access' }]
    })
  })

  test('Code SEARCH_SUCCESS', async ({ client }) => {
    const response = await client
      .get('/v1/users')
      .guard('api')
      .loginAs(user)
      
    response.assertBodyContains({
      body: {
        code: 'SEARCH_SUCCESS'
      }
    })
  })

  test('Result is array', async ({ client, assert }) => {
    const response = await client
      .get('/v1/users')
      .guard('api')
      .loginAs(user)
      
    assert.isArray(response.body().body.result)
  })
})