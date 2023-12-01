import { ChakraProvider } from '@chakra-ui/react'
import { ReactNode } from 'react'

function MyApp({ Component, pageProps }: any) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp