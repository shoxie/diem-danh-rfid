import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Button, ChakraBaseProvider, HStack, extendBaseTheme } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import { useRouter } from 'next/router'

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

export const theme = extendTheme({ colors })

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <ChakraBaseProvider theme={theme}>
      <HStack>
        <Button onClick={() => router.push("/")}>Danh sách sinh viên</Button>
        <Button onClick={() => router.push("/diem-danh")}>Danh sách điểm danh</Button>
      </HStack>
      <div className='px-5'>
        <Component {...pageProps} />
      </div>
    </ChakraBaseProvider>
  )
}
