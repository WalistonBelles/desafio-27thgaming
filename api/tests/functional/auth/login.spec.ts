import { test } from '@japa/runner'

test.group('Login user', async () => {
  test('user grant access to the system', async ({ client }) => {
    const response = await client
      .post('/v1/login')
      .json({
        email: 'admin@test.com',
        password: 'admin123',
        rememberMe: true
      })
    response.assertStatus(200)
    response.assertBodyContains({
      code: 'LOGIN_SUCCESS'
    })
  })
  
  test('incorrect credentials', async ({ client }) => {
    const response = await client
      .post('/v1/login')
      .json({
        email: 'admin@tes.com',
        password: 'admin123',
        rememberMe: true
      })
    response.assertStatus(404)
    response.assertBodyContains({
      code: 'E_ROW_NOT_FOUND'
    })
  })
  
  test('user must provide email in credentials', async ({ client }) => {
    const response = await client
      .post('/v1/login')
      .json({
        password: 'admin123',
        rememberMe: true
      })
    response.assertStatus(400)
    response.assertBodyContains({
      code: 'VALIDATION_ERROR',
      result: {
        errors: [{ message: 'required validation failed', field: 'email' }]
      }
    })
  })
  
  test('user must provide password in credentials', async ({ client }) => {
    const response = await client
      .post('/v1/login')
      .json({
        email: 'admin@test.com',
        rememberMe: true
      })
    response.assertStatus(400)
    response.assertBodyContains({
      code: 'VALIDATION_ERROR',
      result: {
        errors: [{ message: 'required validation failed', field: 'password' }]
      }
    })
  })
})