import { ChakraProvider } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: any) {
  return (
   <>
   <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
    <ToastContainer />
   </>
  )
}

export default MyApp