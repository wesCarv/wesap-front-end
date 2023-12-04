import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
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