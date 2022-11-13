import { test } from '@japa/runner'
import User from 'App/Models/Access/User'

test.group('Store user', async () => {
  const user = await User.find(1)

  test('Store user', async ({ client }) => {
    const response = await client
      .post('/v1/user')
      .guard('api')
      .loginAs(user)
      .form({
        name: 'Testing',
        email: 'test@test.com',
        password: 'test123'
      })
    response.assertStatus(200)
    response.assertBodyContains({
      body: {
        code: 'CREATE_SUCCESS'
      }
    })
  })

  test('user must be logged in before creating the user', async ({ client }) => {
    const response = await client
      .post('/v1/user')
      .form({
        name: 'Testing',
        email: 'test@test.com',
        password: 'test123'
      })
    response.assertStatus(401)
    response.assertBodyContains({
      errors: [{ message: 'E_UNAUTHORIZED_ACCESS: Unauthorized access' }]
    })
  })

  test('make sure user name is provided', async ({ client }) => {
    const response = await client
      .post('/v1/user')
      .guard('api')
      .loginAs(user)

    response.assertStatus(400)
    response.assertBodyContains({
      code: 'VALIDATION_ERROR',
      result: {
        errors: [{ message: 'required validation failed', field: 'name' }]
      }
    })
  })

  test('make sure user email is provided', async ({ client }) => {
    const response = await client
      .post('/v1/user')
      .guard('api')
      .loginAs(user)

    response.assertStatus(400)
    response.assertBodyContains({
      code: 'VALIDATION_ERROR',
      result: {
        errors: [{ message: 'required validation failed', field: 'email' }]
      }
    })
  })

  test('make sure user password is provided', async ({ client }) => {
    const response = await client
      .post('/v1/user')
      .guard('api')
      .loginAs(user)

    response.assertStatus(400)
    response.assertBodyContains({
      code: 'VALIDATION_ERROR',
      result: {
        errors: [{ message: 'required validation failed', field: 'password' }]
      }
    })
  })

  test('email must be valid', async ({ client }) => {
    const response = await client
      .post('/v1/user')
      .guard('api')
      .loginAs(user)
      .form({
        name: 'Testing',
        email: 'test',
        password: 'test123'
      })
    response.assertStatus(400)
    response.assertBodyContains({
      code: 'VALIDATION_ERROR',
      result: {
        errors: [{ message: 'email validation failed', field: 'email' }]
      }
    })
  })
})