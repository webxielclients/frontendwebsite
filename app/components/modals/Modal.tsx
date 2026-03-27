import { useEffect, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <style>{`
        .cp-modal-overlay {
          position: fixed;
          inset: 0;
          /* Semi-transparent teal overlay — matches your #012D32 nav background */
          background: rgba(1, 45, 50, 0.55);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: cpFadeIn 0.22s ease-out;
        }

        @keyframes cpFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .cp-modal-content {
          position: relative;
          background: #ffffff;
          border-radius: 20px;
          max-width: 540px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow:
            0 4px 6px -1px rgba(0, 0, 0, 0.07),
            0 20px 60px -10px rgba(1, 45, 50, 0.28);
          animation: cpSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          scrollbar-width: thin;
          scrollbar-color: #d1fae5 transparent;
        }

        .cp-modal-content::-webkit-scrollbar { width: 5px; }
        .cp-modal-content::-webkit-scrollbar-track { background: transparent; }
        .cp-modal-content::-webkit-scrollbar-thumb {
          background: #d1fae5;
          border-radius: 99px;
        }

        @keyframes cpSlideUp {
          from { opacity: 0; transform: translateY(24px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }

        @media (max-width: 600px) {
          .cp-modal-overlay { padding: 0; align-items: flex-end; }
          .cp-modal-content {
            max-height: 92vh;
            border-radius: 20px 20px 0 0;
            animation: cpSlideUpMobile 0.32s cubic-bezier(0.16, 1, 0.3, 1);
          }
          @keyframes cpSlideUpMobile {
            from { opacity: 0; transform: translateY(100%); }
            to   { opacity: 1; transform: translateY(0); }
          }
        }
      `}</style>

      <div className="cp-modal-overlay" role="dialog" aria-modal="true">
        <div className="cp-modal-content" ref={modalRef}>
          {children}
        </div>
      </div>
    </>
  );
}