import { test, expect } from 'vitest'
import userevent from '@testing-library/user-event'
import { screen, prettyDOM, within } from '@testing-library/react'
import App from './App'
import { renderWithProviders } from './test-utils'

const user = userevent.setup()
const app = renderWithProviders(<App />)

test('should return "Hallo Welt"', async () => {
  await user.selectOptions(app.getByRole('selectto'), 'de')

  const textAreaForm = app.getByPlaceholderText('Introducir Texto')
  await user.type(textAreaForm, 'Hola mundo')

  const result = await app.findByDisplayValue(/Hallo Welt/i, {}, { timeout: 5000 })
  expect(result).toBeTruthy()
})

test('should return "Hello world"', async () => {
  // const user = userevent.setup()
  // const app = renderWithProviders(<App />)

  await user.selectOptions(app.getByRole('selectto'), 'en')
  const textAreaForm = app.getByPlaceholderText('Introducir Texto')
  await user.type(textAreaForm, 'Hola mundo')

  const result2 = await app.findByDisplayValue(/hello world/i, {}, { timeout: 5000 })
  expect(result2).toBeTruthy()
})
