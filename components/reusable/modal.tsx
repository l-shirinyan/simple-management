import { ReactNode, useEffect, useRef } from "react";
import CloseIcon from "@/assets/icons/icon-xmark-solid.svg";
interface IModal {
  children: ReactNode;
  handleClose: () => void;
  title: string;
}
const Modal: React.FC<IModal> = ({ children, handleClose, title }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClose]);

  return (
    <div className="fixed z-10 w-full left-0 h-screen top-0 flex items-center justify-center bg-[#0000003d] px-4">
      <div
        className="relative z-20 bg-white rounded-lg max-w-[480px] w-full p-4"
        ref={modalRef}
      >
        <button onClick={handleClose} className="size-4 absolute top-5 right-5">
          <CloseIcon />
        </button>
        <div className="flex flex-col font-inter">
          <h5 className="text-dark-blue font-semibold">{title}</h5>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
