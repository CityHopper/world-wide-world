import { IModalProps } from "@/types/types";
import { useCallback, useEffect, useRef } from "react";

export function Modal({ isOpen, onClose, children }: IModalProps) {
  const modalRef = useRef(null);

  const onClick = useCallback(
    ({ target }) => {
      const { current: el } = modalRef;
      if (target === el) onClose();
    },
    [onClose]
  );

  useEffect(() => {
    const { current: el } = modalRef;
    if (isOpen) {
      el.showModal();
    } else {
      el.close();
    }
  }, [isOpen]);

  return (
    <dialog
      ref={modalRef}
      onClick={onClick}
      onClose={onClose}
      className={"relative bg-white"}
    >
      {children}
    </dialog>
  );
}
