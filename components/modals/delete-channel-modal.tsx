"use client"

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const DeleteChannelModal = () => {
  const { isOpen, onClose, type, data } = useModal()
  const [ isLoading, setIsLoading ] = useState(false)
  const router = useRouter()

  const isModalOpen = isOpen && type === 'deleteChannel'
  const { channel } = data

  const onConfirm = async () => {
    try {
      setIsLoading(true)
      await axios.delete(`/api/channels/${channel?.id}`)
      
      onClose()
      router.refresh()
    } catch (error) {
      console.error("onConfirm", error)
    } finally {
      setIsLoading(false)
    }
  }
  return ( 
    <Dialog 
      open={isModalOpen}
      onOpenChange={onClose}
    >
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Delete Channel?
          </DialogTitle>

          <DialogDescription className="text-center text-zinc-500">
            Are you sure you want to do this? <br />
            <span className="font-semibold text-rose-500">{channel?.name}</span> will be permanently deleted.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <Button
              onClick={onClose}
              disabled={isLoading}
              variant="ghost"
            >
              Cancel
            </Button>
            
            <Button
              onClick={onConfirm}
              disabled={isLoading}
              variant="primary"
            >
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}