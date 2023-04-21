import { FC } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { IAction, IContact } from "../reducer/contactsReducer";

interface IExtraProps {
  handleEdit: (id: string) => void;
  dispatch: React.Dispatch<IAction>;
}
const ContactItem: FC<IContact & IExtraProps> = ({
  id,
  firstName,
  lastName,
  phone,
  handleEdit,
  dispatch,
}) => {
  return (
    <tr>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{phone}</td>
      <td>
        <AiFillEdit size={20} onClick={() => handleEdit(id)} className="icon" />
      </td>
      <td>
        <AiFillDelete
          size={20}
          onClick={() => {
            const confirmDelete = window.confirm(
              `Are you sure you want to delete contact for user ${firstName} ${lastName}?`
            );
            if (confirmDelete) {
              dispatch({
                type: "DELETE_CONTACT",
                payload: id,
              });
            }
          }}
          className="icon"
        />
      </td>
    </tr>
  );
};
export default ContactItem;
