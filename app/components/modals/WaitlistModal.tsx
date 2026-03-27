import { useState } from "react";
import Modal from "./Modal";
import WaitlistForm from "../waitlistForm";

export default function WaitlistModal() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button
        onClick={openModal}
        className="open-waitlist-modal"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          width: "100%",
        }}
      >
      </button>
      
      <Modal isOpen={isOpen} onClose={closeModal}>
        <WaitlistForm onClose={closeModal} isModal={true} />
      </Modal>
    </>
  );
}