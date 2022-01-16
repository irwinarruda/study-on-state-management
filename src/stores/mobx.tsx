import React from "react";
import { makeAutoObservable } from "mobx";

import { Person } from "../entites/Person";

const INITIAL_STATE = {
    people: [],
    selectedPerson: {
        age: 0,
        name: "",
        email: "",
    },
};

class RootStore {
    private static instance: RootStore;
    public people: Person[];
    public selectedPerson: Person;
    constructor() {
        this.people = INITIAL_STATE.people;
        this.selectedPerson = INITIAL_STATE.selectedPerson;
        makeAutoObservable(this);
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new RootStore();
        }
        return this.instance;
    }

    public addPerson(person: Person) {
        this.people.push(person);
    }

    public selectPerson(person: Person) {
        this.selectedPerson = { ...person };
    }
}

type UsePersonReturn = {
    people: Person[];
    selectedPerson: Person | null;
    addPerson: (person: Person) => void;
    selectPerson: (person: Person) => void;
};

const usePersonContext = (): UsePersonReturn => {
    const store = RootStore.getInstance();
    return store;
};

export { usePersonContext };
