"use client"

import { db, storage } from '@/firebase';
import { cn } from '@/lib/utils';
import { useUser } from '@clerk/nextjs';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import dynamic from 'next/dynamic';
import React, { useState } from 'react'
// import Dropzone from 'react-dropzone'
const Dropzone = dynamic(() => import('react-dropzone'), { ssr: false });
export default function Dropzoner() {
    const maxSize = 20971520;
    console.log("inside drop");
    const [loading, setLoading] = useState(false);
    const {isLoaded, isSignedIn, user} = useUser();

    const onDrop =((acceptedFiles:File[])=>{
        console.log("inside ondrop", acceptedFiles);
            acceptedFiles?.forEach((file)=>{
                const reader = new FileReader();
                console.log("inside mkmk");
                reader.onabort=(()=>console.log("abort"))
                reader.onerror=(()=>console.log("error"))
                reader.onload=(async ()=>{
                    console.log("inside mkmk2");
                    await uploadPost(file);
                })
                reader.readAsArrayBuffer(file);
            })
           

    })

    const uploadPost=(async(selected_file:File)=>{
        if(loading) return;
        if(!user) return;

        setLoading(true);

        const docRef = await addDoc(collection(db, "users", user.id, "files"),{
            userId: user.id,
            fileName: selected_file.name,
            fullName: user.fullName,
            profileImg: user.imageUrl,
            timestamp: serverTimestamp(),
            type: selected_file.type,
            size: selected_file.size
        });

        const imageRef = ref(storage, `users/${user.id}/files/${docRef.id}`);
        uploadBytes(imageRef, selected_file).then(async(snapshot)=>{
            const download_url = await getDownloadURL(imageRef);
            console.log("okkkk")
            await updateDoc(doc(db,  "files", docRef.id),{
                download_url: download_url,
            })
        })
        
        setLoading(false);
    })
    return (
        <div>
            <Dropzone minSize={0} maxSize={maxSize} onDrop={onDrop}>
                {({ getRootProps, getInputProps, isDragActive, isDragReject, fileRejections }) => 
               {
                
                const isFileTooLarge = fileRejections?.length > 0 && fileRejections?.length > maxSize;
                
                return(
                    <section style={{marginTop:5}}>
                        <div className={cn("w-full h-52 flex justify-center items-center p-5 border border-dashed rounded-lg text-center", 
                        isDragActive ? " bg-[#025FF3] text-white animate-pulse" 
                        :
                         "bg-slate-100/50 dark:bg-slate-800/80 text-slate-400 " )} {...getRootProps()}>
                            <input {...getInputProps()} />
                            {!isDragActive && "Click here or drop a file to upload"} {isDragActive && !isDragReject && "Drop to upload this file"}
                            {isDragActive && !isDragReject && "Drop to upload this file"}
                            {isDragReject && "Oops! File not accepted"}
                            {
                                isFileTooLarge && (
                                    <div className='text-danger mt-2'>File too large</div>
                                )
                            }
                        </div>
                    </section>
                )}}
            </Dropzone>
        </div>
    )
}


