import { Payload } from '@/types'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'
import CustomModal from './Modal'
import { format } from 'date-fns'
const CustomTable = ({ data, table }: { data: Payload[], table: string }) => {
    return (
        <TableContainer>
            <Table variant='simple'>
                <Thead backgroundColor={"blue.700"} textColor={"white"}>
                    <Tr>
                        <Th color={"white"}>ID</Th>
                        <Th color={"white"}>Tên học sinh</Th>
                        <Th color={"white"}>Thời gian điểm danh</Th>
                        <Th color={"white"}>Hành động</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data.map((item, index) => (
                        <Tr key={item.timestamp}>
                            <Td>{item.id}</Td>
                            <Td>{item.name}</Td>
                            <Td>{format(new Date(item.timestamp), "MM/dd/yyyy hh:mm:ss")}</Td>
                            <Td><CustomModal record={item} table={table} /></Td>
                        </Tr>
                    ))}
                </Tbody>

            </Table>
        </TableContainer>
    )
}

export default CustomTable