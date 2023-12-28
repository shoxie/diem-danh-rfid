import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Button, ChakraBaseProvider, HStack, Text, extendBaseTheme } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useAtom } from 'jotai'
import { firebaseData } from '@/utils/atom'
import { CSVLink, CSVDownload } from "react-csv";

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
  const [csvArray, setCsvArray] = useAtom(firebaseData)

  return (
    <ChakraBaseProvider theme={theme}>
      <HStack className='w-full px-5 py-2' justify={"space-between"}>
        <HStack>
          <img src={"/logo.jpg"} alt="logo" className='w-16 h-16' />
          <Text>Phần mềm điểm danh học sinh</Text>
        </HStack>
        <HStack>
          <Button onClick={() => router.push("/")}>Danh sách học sinh</Button>
          <Button onClick={() => router.push("/diem-danh")}>Danh sách điểm danh</Button>
          {
            router.pathname === "/diem-danh" && <CSVLink data={csvArray} className="bg-blue-600 text-white rounded-lg px-2 py-2">Tải danh sách điểm danh</CSVLink>
          }
        </HStack>
      </HStack>
      <div className='px-5'>
        <Component {...pageProps} />
      </div>
    </ChakraBaseProvider>
  )
}
