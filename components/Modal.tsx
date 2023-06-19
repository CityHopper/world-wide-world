import { IModalProps } from "@/types/types";
import { MouseEvent, useCallback, useEffect, useRef } from "react";
import "@/styles/modal.css";

export function Modal({ isOpen, onClose, children }: IModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null);

  const onClick = useCallback(
    (e: MouseEvent) => {
      const { target } = e;
      const { current: el } = modalRef;
      if (target === el) onClose();
    },
    [onClose]
  );

  useEffect(() => {
    const { current: el } = modalRef;
    if (isOpen && el) {
      el?.showModal();
    } else {
      el?.close();
    }
  }, [isOpen]);

  return (
    <dialog
      ref={modalRef}
      onClick={onClick}
      onClose={onClose}
      className={"relative w-[70%] h-[70%] p-0 min-w-[300px] rounded-[12px]"}
    >
      <button className={"close"} onClick={onClose} />
      <div className={"w-full h-full bg-white p-6"}>{children}</div>
    </dialog>
  );
}

export default Modal;
