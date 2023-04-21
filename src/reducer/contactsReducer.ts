import { produce } from "immer";

export interface IContact {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
}
export interface IAction {
  type: "ADD_CONTACT" | "UPDATE_CONTACT" | "DELETE_CONTACT";
  payload: IContact | string;
}

export interface IState {
  contacts: IContact[];
}

export const contactsReducer = produce((draft: IState, action: IAction) => {
  switch (action.type) {
    case "ADD_CONTACT":
      draft.contacts.push(action.payload as IContact);
      break;

    case "UPDATE_CONTACT": {
      const { id, ...updates } = action.payload as IContact;
      const index = draft.contacts.findIndex((contact) => contact.id === id);

      if (index > -1) {
        draft.contacts[index] = { ...draft.contacts[index], ...updates };
      }
      break;
    }

    case "DELETE_CONTACT": {
      const id = action.payload;
      draft.contacts = draft.contacts.filter((contact) => contact.id !== id);
      break;
    }

    default:
      return draft;
  }
});
