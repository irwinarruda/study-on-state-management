import React from "react";
import { Provider } from "react-redux";
import { types } from "mobx-state-tree";
import { asReduxStore, connectReduxDevtools } from "mst-middlewares";

import { Person } from "../entites/Person";

const PersonModel = types.model({
    name: types.string,
    email: types.string,
    age: types.number,
});

const RootStore = types
    .model({
        people: types.array(PersonModel),
        selectedPerson: PersonModel,
    })
    .actions((self) => ({
        addPerson(person: Person) {
            self.people.push(person);
        },
        selectPerson(person: Person) {
            self.selectedPerson = { ...person };
        },
    }));

const INITIAL_STATE = {
    people: [],
    selectedPerson: {
        age: 0,
        name: "",
        email: "",
    },
};

const store = RootStore.create(INITIAL_STATE);
// if (window) {
//     (window as any).persons = persons;
// }

type UsePersonReturn = {
    people: Person[];
    selectedPerson: Person | null;
    addPerson: (person: Person) => void;
    selectPerson: (person: Person) => void;
};

const usePersonContext = (): UsePersonReturn => {
    return store;
};

// Attempt to connect mobx-state-tree with redux devtools
connectReduxDevtools(require("remotedev"), store);
const reduxStore = asReduxStore(store);
const PersonsProvider: React.FC = ({ children }) => {
    return <Provider store={reduxStore as any}>{children}</Provider>;
};

export { usePersonContext, PersonsProvider };
