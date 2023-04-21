import { FC, useState, FormEvent, ChangeEvent, Dispatch } from "react";
import { Button, Form } from "react-bootstrap";
import { v4 as uuid } from "uuid";

import { IAction, IContact } from "../reducer/contactsReducer";

interface IContactFormProps {
  dispatch: React.Dispatch<IAction>;
  dataToEdit?: IContact;
  toggleModal: () => void;
}

const ContactForm: FC<IContactFormProps> = ({
  dispatch,
  dataToEdit,
  toggleModal,
}) => {
  const [contact, setContact] = useState({
    firstName: dataToEdit?.firstName ? dataToEdit.firstName : "",
    lastName: dataToEdit?.lastName ? dataToEdit.lastName : "",
    phone: dataToEdit?.phone ? dataToEdit.phone : "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContact((state) => ({ ...state, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!dataToEdit) {
      dispatch({
        type: "ADD_CONTACT",
        payload: { ...contact, id: uuid() },
      });
    } else {
      dispatch({
        type: "UPDATE_CONTACT",
        payload: {
          id: dataToEdit.id,
          ...contact,
        },
      });
      toggleModal();
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit} className="contact-form">
        <Form.Group controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            className="firstName"
            name="firstName"
            value={contact.firstName}
            type="text"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            className="lastName"
            name="lastName"
            value={contact.lastName}
            type="text"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="phone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            className="phone"
            name="phone"
            value={contact.phone}
            type="number"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="submit">
          <Button variant="primary" type="submit" className="submit-btn">
            {dataToEdit ? "Update Contact" : "Add Contact"}
          </Button>
        </Form.Group>
      </Form>
    </>
  );
};

export default ContactForm;
