/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { createContainer } from "react-tracked";

import { Person } from "../entites/Person";

type UsePersonReturn = {
    states: {
        people: Person[];
        selectedPerson: Person | null;
    };
    addPerson: (person: Person) => void;
    selectPerson: (person: Person) => void;
};

const useValue = () =>
    React.useState({
        people: [] as Person[],
        selectedPerson: null as Person | null,
    });

const { Provider: PersonsProvider, useTracked } = createContainer(useValue);

const usePersonContext = (): UsePersonReturn => {
    const [states, setStates] = useTracked();

    const addPerson = React.useCallback((person: Person) => {
        setStates((prev) => ({ ...prev, people: [...prev.people, person] }));
    }, []);

    const selectPerson = React.useCallback((person: Person) => {
        setStates((prev) => ({ ...prev, selectedPerson: person }));
    }, []);

    return {
        states,
        addPerson,
        selectPerson,
    };
};

export { PersonsProvider, usePersonContext };
