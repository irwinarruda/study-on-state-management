import React from "react";
import { useContextSelector, createContext } from "use-context-selector";

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

const PersonsContext = createContext({} as UsePersonReturn);

const PersonsProvider: React.FC = ({ children }) => {
    return (
        <PersonsContext.Provider value={usePerson()}>
            {children}
        </PersonsContext.Provider>
    );
};

// This implementation does not work :)

const selectForm = (ctx: UsePersonReturn) => ({ addPerson: ctx.addPerson });
const selectList = (ctx: UsePersonReturn) => ({
    people: ctx.people,
    selectPerson: ctx.selectPerson,
});
const selectView = (ctx: UsePersonReturn) => ({
    selectedPerson: ctx.selectedPerson,
});

type GenericFunction<T> = (ctx: UsePersonReturn) => T;

// const usePersonContext = <T extends any>(key: GenericFunction<T>) => {
//     const context = useContextSelector(PersonsContext, key);
//     return context;
// };

/////////////////////////////////////////////

// This implementation violates rules-of-hooks

const neededStates = {
    selectForm: ["addPerson"],
    selectList: ["people", "selectPerson"],
    selectView: ["selectedPerson"],
} as const;

type NeededStatesKeys = keyof typeof neededStates;

const usePersonContext = <T extends NeededStatesKeys>(key: T) => {
    let hooks = {} as Pick<UsePersonReturn, typeof neededStates[T][number]>;
    neededStates[key].forEach((keyValue) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        hooks[keyValue as typeof neededStates[T][number]] = useContextSelector(
            PersonsContext,
            (ctx) => ctx[keyValue as typeof neededStates[T][number]]
        );
    });
    return hooks;
};

/////////////////////////////////////////////

export {
    PersonsProvider,
    usePersonContext,
    selectForm,
    selectList,
    selectView,
};
