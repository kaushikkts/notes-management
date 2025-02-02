'use client';

import { createDocument } from '@/lib/actions/room.actions';
import { Button } from './ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import {useState} from "react";
import Loader from "@/components/Loader";

const AddDocumentBtn = ({ userId, email }: AddDocumentBtnProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const addDocumentHandler = async () => {
    try {
        setLoading(true);
      const room = await createDocument({ userId, email });

      if(room) {
          router.push(`/documents/${room.id}`);
          setLoading(false);
      }
    } catch (error) {
        console.log(error)
        setLoading(false);
    }
  }

  return (
    <Button type="submit" onClick={addDocumentHandler} className="gradient-blue flex gap-1 shadow-md">
        {loading ? <Loader/> : (
            <>
                <Image
                    src="/assets/icons/add.svg" alt="add" width={24} height={24}
                />
                <p className="hidden sm:block">Start a blank document</p>
            </>
        )}
    </Button>
  )
}

export default AddDocumentBtn