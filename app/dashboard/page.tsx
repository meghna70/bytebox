import Image from "next/image";
// import { SignInButton, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import NavBar from "@/components/NavBar";
import Dropzoner from "@/components/ui/Dropzone";
import { auth } from "@clerk/nextjs";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { FileType } from "@/typings";
import TableWrapper from "@/components/table/TableWrapper";

export default async function Dashboard() {
  const {userId} = auth();
  const docRes = await getDocs(collection(db, "users", userId!, "files" ));
  const skeletonFiles: FileType[] = docRes.docs.map(doc =>({
    id:doc.id,
    fileName: doc.data().fileName || doc.id,
    timestamp : new Date(doc.data().timestamp?.seconds * 1000) || undefined,
    fullName : doc.data().fullName,
    downloadURL:  doc.data().download_url,
    type: doc.data().type,
    size: doc.data().size
  }))
  return (
   <div>
    <NavBar/>
    <Dropzoner/>
    {/* <div className=" p-12 bg-[#2B2929] dark:bg-slate-800 text-white">
      <div style={{fontSize:32}}>Welcome to bytebox </div>
      <br/>
      
    </div> */}
    <section className="container space-y-5">
      <h2 className="font-bold">All Files</h2>
      <div>
          <TableWrapper skeletonFiles={skeletonFiles}/>
      </div>
    </section>
   </div>
  );
}
