'use client'

import getDoument from "@/config/getData"
import { useEffect, useState } from "react"
import { useCollection } from 'react-firebase-hooks/firestore';
import { getFirestore, collection } from 'firebase/firestore';
import firebase_app from "@/config/firebase";
import { Payload } from "@/types";
import CustomTable from "@/components/Table";
import { firebaseData } from "@/utils/atom";
import { useAtom } from "jotai";

const Home = () => {
  const [data, setData] = useState<Payload[]>([])
  const [value, loading, error] = useCollection(
    collection(getFirestore(firebase_app), 'diem-danh'),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  const [csvArray, setCsvArray] = useAtom(firebaseData)

  useEffect(() => {
    const temp: Payload[] = []
    value?.docs.forEach(item => {
      temp.push({ ...item.data(), document_id: item.id } as Payload)
    })
    setData(temp.sort(function(x, y){
      return parseInt(y.timestamp) - parseInt(x.timestamp);
  }))
    setCsvArray(temp.map(item => {
      return {
        ...item, 
        timestamp: new Date(((item.timestamp as unknown) as number) * 1000).toLocaleDateString()
      }
    }) as any)
    console.log(temp)
    
  }, [value])

  return (
    <div>
      <CustomTable data={data} table={"diem-danh"} />
    </div>
  )
}

export default Home