import { test } from '@japa/runner'
import User from 'App/Models/Access/User'

test.group('Update user', async () => {
  const user = await User.find(1)

  test('update user', async ({ client }) => {
    const response = await client
      .patch('/v1/user')
      .guard('api')
      .loginAs(user)
      .form({
        id: 3,
        name: 'Testing update',
        email: 'test@tes.com',
        password: 'test123'
      })
    response.assertStatus(200)
    response.assertBodyContains({
      body: {
        code: 'UPDATE_SUCCESS'
      }
    })
  })

  test('user must be logged in before updating the user', async ({ client }) => {
    const response = await client
      .patch('/v1/user')
      .form({
        id: 3,
        name: 'Testing update',
        email: 'test@tes.com',
        password: 'test123'
      })
    response.assertStatus(401)
    response.assertBodyContains({
      errors: [{ message: 'E_UNAUTHORIZED_ACCESS: Unauthorized access' }]
    })
  })

  test('the user must exist in the bank to be able to be updated', async ({ client }) => {
    const response = await client
      .patch('/v1/user')
      .guard('api')
      .loginAs(user)
      .form({
        id: 34,
        name: 'Testing updat',
        email: 'test@test.com',
        password: 'test123'
      })
    response.assertStatus(404)
    response.assertBodyContains({
      code: 'E_ROW_NOT_FOUND'
    })
  })

  test('email must be valid', async ({ client }) => {
    const response = await client
      .patch('/v1/user')
      .guard('api')
      .loginAs(user)
      .form({
        id: 3,
        name: 'Testing update',
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

  test('the email must be unique', async ({ client }) => {
    const response = await client
      .patch('/v1/user')
      .guard('api')
      .loginAs(user)
      .form({
        id: 3,
        name: 'Testing updat',
        email: 'test@tes.com',
        password: 'test123'
      })
    response.assertStatus(400)
    response.assertBodyContains({
      code: 'VALIDATION_ERROR',
      result: {
        errors: [{ message: 'unique validation failure', field: 'email' }]
      }
    })
  })

  test('the name must be unique', async ({ client }) => {
    const response = await client
      .patch('/v1/user')
      .guard('api')
      .loginAs(user)
      .form({
        id: 3,
        name: 'Testing update',
        email: 'test@test.com',
        password: 'test123'
      })
    response.assertStatus(400)
    response.assertBodyContains({
      code: 'VALIDATION_ERROR',
      result: {
        errors: [{ message: 'unique validation failure', field: 'name' }]
      }
    })
  })
})