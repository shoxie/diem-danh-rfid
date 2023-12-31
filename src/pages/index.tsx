'use client'

import getDoument from "@/config/getData"
import { useEffect, useState } from "react"
import { useCollection } from 'react-firebase-hooks/firestore';
import { getFirestore, collection } from 'firebase/firestore';
import firebase_app from "@/config/firebase";
import { Payload } from "@/types";
import CustomTable from "@/components/Table";

const Home = () => {
  const [data, setData] = useState<Payload[]>([])
  const [value, loading, error] = useCollection(
    collection(getFirestore(firebase_app), 'rfid_ids'),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useEffect(() => {
    const temp: Payload[] = []
    value?.docs.forEach(item => {
      temp.push({ ...item.data(), document_id: item.id } as Payload)
    })
    setData(temp)
  }, [value])

  return (
    <div>
      <CustomTable data={data} table="rfid_ids" />
    </div>
  )
}

export default Home