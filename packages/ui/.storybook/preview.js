import { CarrotUIProvider } from '../src/provider'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

const withCarrotUIProvider = (Story, context) => {
  return (
    <CarrotUIProvider>
      <Story {...context} />
    </CarrotUIProvider>
  )
}

export const decorators = [withCarrotUIProvider]
