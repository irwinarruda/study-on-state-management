import React from "react";
import type { NextPage } from "next";

import { Input } from "../../components/Input";

import { usePersonContext, PersonsProvider } from "../../stores/react-tracked";

const Form = () => {
    const [name, setName] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("");
    const [age, setAge] = React.useState<number>(0);

    const { addPerson } = usePersonContext();

    return (
        <div className="w-1/3">
            <Input
                label="Name"
                name="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Nome"
            />
            <Input
                label="Email"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email"
                containerClassName="mt-2"
            />
            <Input
                label="Age"
                name="age"
                type="number"
                value={age}
                onChange={(event) => setAge(Number(event.target.value))}
                placeholder="Age"
                containerClassName="mt-2"
            />
            <button
                className="mt-4 px-4 py-1 cursor-pointer bg-blue-400 rounded-md text-white hover:bg-blue-600 transition-all"
                onClick={() => addPerson({ name, email, age })}
            >
                Submit
            </button>
        </div>
    );
};

const List = () => {
    const { states, selectPerson } = usePersonContext();
    return (
        <div className="w-1/3 ml-10 mt-2">
            {states.people.map((person, i) => (
                <div
                    className="flex align-middle justify-between py-2 px-2 border-b-2"
                    key={i}
                >
                    <div>{person.name}</div>
                    <button
                        className="ml-2 px-4 cursor-pointer bg-blue-400 rounded-md text-white hover:bg-blue-600 transition-all"
                        onClick={() => selectPerson(person)}
                    >
                        See
                    </button>
                </div>
            ))}
        </div>
    );
};

const Info = () => {
    const { states } = usePersonContext();
    return (
        <div className="w-1/3 ml-10 mt-2">
            <p>
                Idade:{" "}
                <span className="font-semibold">
                    {states.selectedPerson?.name || "-"}
                </span>
            </p>
            <p>
                Email:{" "}
                <span className="font-semibold">
                    {states.selectedPerson?.email || "-"}
                </span>
            </p>
            <p>
                Idade:{" "}
                <span className="font-semibold">
                    {states.selectedPerson?.age || "-"}
                </span>
            </p>
        </div>
    );
};

type ReactTrackedProps = {
    children?: React.ReactNode;
};

const ReactTracked: NextPage<ReactTrackedProps> = ({}) => {
    return (
        <PersonsProvider>
            <div className="max-w-7xl mt-6 mx-auto px-2 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-semibold">React Tracked</h2>
                <div className="flex mt-4">
                    <Form />
                    <List />
                    <Info />
                </div>
            </div>
        </PersonsProvider>
    );
};

export default ReactTracked;
