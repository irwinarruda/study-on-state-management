import React from "react";
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    TypedUseSelectorHook,
    Provider as ReduxProvider,
    useDispatch,
    useSelector,
} from "react-redux";

import { shallowEqual } from "../utils/shallowEqual";
import { genericSelector } from "../utils/genericSelector";
import { Person } from "../entites/Person";

export const useReduxSelector = <T extends any, R extends any>(
    selector: (val: T) => R,
    isEql?: (a: R | null, b: R) => boolean
) => {
    const patchedSelector = React.useMemo(() => {
        let prevValue: R | null = null;
        return (state: T) => {
            const nextValue: R = selector(state);
            if (prevValue !== null && isEql?.(prevValue, nextValue)) {
                return prevValue;
            }
            prevValue = nextValue;
            return nextValue;
        };
    }, [selector, isEql]);

    return useAppSelector(patchedSelector as any);
};

const INITIAL_STATE = {
    people: [] as Person[],
    selectedPerson: {
        age: 0,
        name: "",
        email: "",
    } as Person,
};

const peopleSlice = createSlice({
    name: "person",
    initialState: INITIAL_STATE,
    reducers: {
        addPerson: (state, action: PayloadAction<Person>) => {
            state.people.push(action.payload);
        },
        selectPerson: (state, action: PayloadAction<Person>) => {
            state.selectedPerson = { ...action.payload };
        },
    },
});

const store = configureStore({
    reducer: peopleSlice.reducer,
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const neededStates = {
    none: [],
    selectList: ["people"],
    selectView: ["selectedPerson"],
} as const;

type NeededStatesKeys = keyof typeof neededStates;

type UsePersonReturn = {
    people: Person[];
    selectedPerson: Person | null;
};

const usePersonContext = <T extends NeededStatesKeys = "none">(
    key = "none" as T
): Pick<UsePersonReturn, typeof neededStates[T][number]> & {
    addPerson(person: Person): void;
    selectPerson(person: Person): void;
} => {
    const hooks = useReduxSelector(
        genericSelector(neededStates[key] as any),
        shallowEqual
    ) as Pick<UsePersonReturn, typeof neededStates[T][number]>;
    const dispatch = useAppDispatch();
    const addPerson = React.useCallback(
        (person: Person) => {
            dispatch(peopleSlice.actions.addPerson(person));
        },
        [dispatch]
    );
    const selectPerson = React.useCallback(
        (person: Person) => {
            dispatch(peopleSlice.actions.selectPerson(person));
        },
        [dispatch]
    );
    return { ...hooks, addPerson, selectPerson };
};

type ProviderProps = {
    children: React.ReactNode;
};

const Provider = ({ children }: ProviderProps) => {
    return <ReduxProvider store={store}>{children}</ReduxProvider>;
};

export { usePersonContext, Provider };
