import React from "react";

import { Person } from "../entites/Person";

type UsePersonReturn = {
    people: Person[];
    selectedPerson: Person | null;
    addPerson: (person: Person) => void;
    selectPerson: (person: Person) => void;
};

const usePerson = (): UsePersonReturn => {
    const [people, setPeople] = React.useState<Person[]>([]);
    const [selectedPerson, setSelectedPerson] = React.useState<Person | null>(
        null
    );

    const addPerson = React.useCallback((person: Person) => {
        setPeople((prev) => [...prev, person]);
    }, []);

    const selectPerson = React.useCallback((person: Person) => {
        setSelectedPerson(person);
    }, []);

    return {
        people,
        selectedPerson,
        addPerson,
        selectPerson,
    };
};

const PersonsContext = React.createContext({} as UsePersonReturn);

const PersonsProvider: React.FC = ({ children }) => {
    return (
        <PersonsContext.Provider value={usePerson()}>
            {children}
        </PersonsContext.Provider>
    );
};

const usePersonContext = () => {
    const context = React.useContext(PersonsContext);
    return context;
};

export { PersonsProvider, usePersonContext };
