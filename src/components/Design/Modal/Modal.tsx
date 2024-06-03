import React from "react";

import * as S from "./emotion";

interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, children }) => {
  return (
    <>
      {isOpen && (
        <S.ModalOverlay>
          <S.ModalContent>{children}</S.ModalContent>
        </S.ModalOverlay>
      )}
    </>
  );
};

export default Modal;
