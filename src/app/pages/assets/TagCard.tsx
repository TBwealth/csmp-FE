import { Dispatch, useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { BsTrash3 } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";

type Props = {
  name: string;
  mode: string;
  id: any;
  handleDete: Dispatch<void>
};

const TagCard = ({ name, id, mode, handleDete }: Props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [newName, setNewName] = useState(name);

  return (
    <div
      className={`${
        isEdit ? "bg-[#FCFCFC] border-bottom" : ""
      } py-[8px] gap-[12px] flex items-center justify-between`}
    >
      <input
        type="text"
        value={newName}
        autoFocus={isEdit}
        disabled={!isEdit}
        className="w-full font-medium text-[12px]"
        onChange={(e) => setNewName(e.target.value)}
      />
      <button
        className="flex items-center justify-center"
        onClick={() => {
            if(isEdit) {
                setNewName(name)
            }
            setIsEdit(!isEdit)
        }}
      >
        {isEdit ? <FaTimes color={mode === "dark" ? "#EAEAEA" : "#373737"} /> : <FiEdit color={mode === "dark" ? "#EAEAEA" : "#373737"} />}
      </button>
      <button
        className="flex items-center justify-center"
        onClick={() => {
            if(!isEdit) {
                handleDete()
            } else {
                setNewName(name) 
                setIsEdit(!isEdit);
            }
        }}
      >
        {isEdit ? <FaCheck color="#284CB3" /> : <BsTrash3 color={mode === "dark" ? "#EAEAEA" : "#373737"} />}
      </button>
    </div>
  );
};

export default TagCard;
