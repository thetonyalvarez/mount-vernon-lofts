"use client"

import React, { createContext, useContext, useState } from "react"

interface ContactModalContextType {
  isOpen: boolean
  modalId: string
  triggerSource: string
  openModal: (triggerSource?: string, modalId?: string) => void
  closeModal: () => void
}

const ContactModalContext = createContext<ContactModalContextType | undefined>(undefined)

export function ContactModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [modalId, setModalId] = useState('contact_modal_default')
  const [triggerSource, setTriggerSource] = useState('unknown')

  const openModal = (source: string = 'unknown', id: string = 'contact_modal_default') => {
    setTriggerSource(source)
    setModalId(id)
    setIsOpen(true)
  }
  
  const closeModal = () => {
    setIsOpen(false)
    // Keep modalId and triggerSource for potential analytics on close
  }

  return (
    <ContactModalContext.Provider value={{ isOpen, modalId, triggerSource, openModal, closeModal }}>
      {children}
    </ContactModalContext.Provider>
  )
}

export function useContactModal() {
  const context = useContext(ContactModalContext)
  if (context === undefined) {
    throw new Error("useContactModal must be used within a ContactModalProvider")
  }
  return context
}