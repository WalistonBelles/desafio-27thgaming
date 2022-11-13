import { test } from '@japa/runner'
import User from 'App/Models/Access/User'

test.group('Find user', async () => {
  const user = await User.find(1)

  test('Find user', async ({ client }) => {
    const response = await client
      .get('/v1/user/1')
      .guard('api')
      .loginAs(user)
    
    response.assertStatus(200)
  })

  test('user must be logged in before find user', async ({ client }) => {
    const response = await client
      .get('/v1/user/1')
    response.assertStatus(401)
    response.assertBodyContains({
      errors: [{ message: 'E_UNAUTHORIZED_ACCESS: Unauthorized access' }]
    })
  })

  test('Code FIND_FOUND', async ({ client }) => {
    const response = await client
      .get('/v1/user/1')
      .guard('api')
      .loginAs(user)
      
    response.assertStatus(200)
    response.assertBodyContains({
      body: {
        code: 'FIND_FOUND'
      }
    })
  })

  test('Code FIND_NOTFOUND', async ({ client }) => {
    const response = await client
      .get('/v1/user/a')
      .guard('api')
      .loginAs(user)
     
    response.assertStatus(200)
    response.assertBodyContains({
      body: {
        code: 'FIND_NOTFOUND'
      }
    }) 
  })

  test('Code E_ROW_NOT_FOUND', async ({ client, assert }) => {
    const response = await client
      .get('/v1/user/99999999')
      .guard('api')
      .loginAs(user)
    response.assertStatus(404)
    response.assertBodyContains({
      code: 'E_ROW_NOT_FOUND'
    }) 
  })

  test('Result is object', async ({ client, assert }) => {
    const response = await client
      .get('/v1/user/1')
      .guard('api')
      .loginAs(user)
      
    response.assertStatus(200)
    assert.isObject(response.body().body.result)
  })
})