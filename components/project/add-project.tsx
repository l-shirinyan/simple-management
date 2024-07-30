"use client";
import AddIcon from "@/assets/icons/icon-add.svg";
import { useState } from "react";
import Modal from "../reusable/modal";
import CreateNewProject from "./new-project-modal";

const AddTicket = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleChangeModal = () => setOpenModal((prev) => !prev);
  return (
    <>
      <button
        onClick={handleChangeModal}
        className="bg-royal-purple rounded-lg flex items-center gap-[9px] pl-[13px] pr-[18px] py-[10px] text-base/6 font-black min-w-[234px] text-white"
      >
        <AddIcon />
        Create a new procedure
      </button>
      {openModal && (
        <Modal handleClose={handleChangeModal} title="Create a new procedure">
          <CreateNewProject handleClose={handleChangeModal} />
        </Modal>
      )}
    </>
  );
};

export default AddTicket;
