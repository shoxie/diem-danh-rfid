import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    Input,
    Text,
} from '@chakra-ui/react'
import firebase_app from '@/config/firebase';
import { ref, getDatabase } from 'firebase/database';
import { useObject } from 'react-firebase-hooks/database';
import { Payload } from '@/types';
import { useEffect, useState } from 'react';
import { getFirestore, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';
import firebase from 'firebase/compat/app';

const database = getDatabase(firebase_app);

type Props = {
    record: Payload
    table: string
}

const CustomModal = ({ record, table }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [data, setData] = useState({
        id: "",
        name: ""
    })
    const [value, loading, error] = useDocument(
        doc(getFirestore(firebase_app), table, record.document_id),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    );

    useEffect(() => {

        setData({
            name: record.name,
            id: record.id
        })
    }, [record])


    function update(key: string, record: any) {
        const examcollref = doc(getFirestore(firebase_app), table, key)
        updateDoc(examcollref, {
            ...value?.data(), ...record
        }).then(response => {
            alert("updated")
        }).catch(error => {
            console.log(error.message)
        })
    }

    function deleteDocument(key: string) {
        const examcollref = doc(getFirestore(firebase_app), table, key)
        
        deleteDoc(examcollref).then(response => {
            alert("deleted")
        }).catch(error => {
            console.log(error.message)
        })
    }

    return (
        <>
            <Button onClick={onOpen}>Đổi thông tin</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Thay đổi thông tin</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form>
                            <div>
                                <Text>
                                    ID:
                                </Text>
                                <Input value={data.id} onChange={(e) => setData({ ...data, id: e.target.value })} />
                            </div>
                            <div>
                                <Text>
                                    Họ tên:
                                </Text>
                                <Input value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
                            </div>

                        </form>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='red' mr={3} onClick={() => deleteDocument(record.document_id)}>
                            Xóa
                        </Button>
                        <Button variant='ghost' onClick={() => update(record.document_id, data)}>Sửa thông tin</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CustomModal