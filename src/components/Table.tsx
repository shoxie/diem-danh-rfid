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

const CustomTable = ({ data, table }: { data: Payload[], table: string }) => {
    return (
        <TableContainer>
            <Table variant='simple'>
                <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>Tên sinh viên</Th>
                        <Th>Thời gian điểm danh</Th>
                        <Th>Hành động</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data.map((item, index) => (
                        <Tr key={item.timestamp}>
                            <Td>{item.id}</Td>
                            <Td>{item.name}</Td>
                            <Td>{new Date(((item.timestamp as unknown) as number) * 1000).toLocaleDateString()}</Td>
                            <Td><CustomModal record={item} table={table} /></Td>
                        </Tr>
                    ))}
                </Tbody>

            </Table>
        </TableContainer>
    )
}

export default CustomTable