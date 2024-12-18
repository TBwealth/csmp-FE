import { Dispatch, useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { BsTrash3 } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import axios from "axios";

type Props = {
  name: string;
  mode: string;
  id: any;
  refetch: Dispatch<void>
};

const TagCard = ({ name, id, mode, refetch }: Props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [newName, setNewName] = useState(name);

  const deleteTag = async () => {
    const token = localStorage.getItem("token");
    try {
      const resp = await axios.delete(
        `https://cspm-api.midrapps.com/api/v1/system_settings/tags/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (resp.status === 204) {
        refetch();
      }
    } catch(err: any) {
      console.log(err)
    }
  }

  const editTag = async () => {
    const token = localStorage.getItem("token");
    try {
      const resp = await axios.patch(
        `https://cspm-api.midrapps.com/api/v1/system_settings/tags/${id}/`,
        {
          "name": newName
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (resp.status === 200) {
        refetch();
      }
    } catch(err: any) {
      console.log(err)
    }
  }

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
              deleteTag()
            } else {
              editTag(); 
              // setNewName(newName)
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
