import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the context state
interface ModalContextType {
  modalContent: any;
  setModalContent: (content: any) => void;

  isShowingModal: boolean;
  setModal: (show: boolean) => void;
}

// Create a default value for the context (optional, but helps with TypeScript)
const defaultContextValue: ModalContextType = {
  modalContent: null,
  setModalContent: () => { },

  isShowingModal: false,
  setModal: () => { }
};

// Create the context
const ModalContext = createContext<ModalContextType>(defaultContextValue);

// Create a provider component
interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isShowingModal, setModal] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<any>(null);

  return (
    <ModalContext.Provider value={{ isShowingModal, setModal, modalContent, setModalContent }}>
      {children}
    </ModalContext.Provider>
  );
};

// Create a custom hook to use the context
export const useModal = () => useContext(ModalContext);
