import { CopyIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useAppStore } from "@/store/store"
import { useUser } from "@clerk/nextjs"
import { deleteObject, ref } from "firebase/storage"
import { db, storage } from "@/firebase"
import { deleteDoc, doc } from "firebase/firestore"

export function DeleteModal() {
    const { user } = useUser();

    const [isDeleteModalOpen, setIsDeleteModalOpen, fileId, setFileId] =
        useAppStore((state) => [
            state.isDeleteModalOpen,
            state.setIsDeleteModalOpen,
            state.fileId,
            state.setFileId
        ])

    async function deleteFile() {
        if (!user || !fileId) return;
        const fileRef = ref(storage, `users/${user.id}/files/${fileId}`);
        try {
            await deleteObject(fileRef).then(async () => {
            deleteDoc(doc(db , "user", user.id, "files", fileId )).then(()=>{
                console.log("deleted");
            })
            })
        } catch (err) {
console.log("err:", err);
        }
    }
    return (
        <Dialog
            open={isDeleteModalOpen}
            onOpenChange={(isOpen) => {
                setIsDeleteModalOpen(isOpen);
            }}
        >

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Are you sure you want to delete?</DialogTitle>
                    <DialogDescription>
                        Anyone who has this link will be able to view this.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex space-x-2 py-3">
                    <Button
                        size="sm"
                        className="px-3 flex-1"
                        variant={"ghost"}
                        onClick={() => setIsDeleteModalOpen(false)}
                    >
                        <span className="sr-only"> Cancel </span>
                        <span >Cancel</span>
                    </Button>

                    <Button
                        type="submit"
                        size="sm"
                        className="px-3 flex1"
                        onClick={() => deleteFile()}>
                        <span className="sr-only"> Cancel </span>
                        <span >Cancel</span>
                    </Button>
                </div>

            </DialogContent>
        </Dialog>
    )
}
