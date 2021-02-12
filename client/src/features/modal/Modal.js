import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
`;

const ModalContainer = styled(motion.div)`
  width: 325px;
  height: auto;
  background-color: #f2f2f2;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 12px;
  border: 1px solid #3b945e;
  @media screen and (min-width: 576px) {
    width: 450px;
  }
  @media screen and (min-width: 768px) {
  }
  @media screen and (min-width: 992px) {
  }
  @media screen and (min-width: 1200px) {
  }
`;

const CloseButton = styled.button`
  position: absolute;
  right: 3%;
  bottom: -0%;
  height: auto;
  width: auto;
  background: transparent;
  border: none;
  padding: 0;
  margin: 0;
  font-size: 1.5rem;
  color: black;
`;

const modalVariant = {
  initial: { opacity: 0 },
  isOpen: { opacity: 1 },
  messageSent: { opacity: 1 },
  exit: { opacity: 0 },
};

const containerVariant = {
  initial: { top: "-50%", transition: { type: "spring" } },
  isOpen: { top: "50%" },
  messageSent: { top: "50%" },
  exit: { top: "-50%" },
};

const Modal = ({ handleClose, children, isOpen, messageSent }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay
          initial={"initial"}
          animate={"isOpen"}
          exit={"exit"}
          variants={modalVariant}
        >
          <ModalContainer variants={containerVariant}>
            <CloseButton onClick={handleClose}>
              <i className="far fa-times-circle" />
            </CloseButton>
            {children}
          </ModalContainer>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default Modal;
