import React from "react";
import type { NextPage } from "next";

import { Input } from "../../components/Input";

const Form = () => {
    const [name, setName] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("");
    const [age, setAge] = React.useState<number>(0);
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
            <button className="mt-4 px-4 py-1 cursor-pointer bg-blue-400 rounded-md text-white hover:bg-blue-600 transition-all">
                Submit
            </button>
        </div>
    );
};

const List = () => {
    return (
        <div className="w-1/3 ml-10 mt-2">
            <div className="flex align-middle justify-between py-2 px-2 border-b-2">
                <div>Irwin Arruda</div>
                <button className="ml-2 px-4 cursor-pointer bg-blue-400 rounded-md text-white hover:bg-blue-600 transition-all">
                    See
                </button>
            </div>
        </div>
    );
};

const Info = () => {
    return (
        <div className="w-1/3 ml-10 mt-2">
            <div>
                <p>
                    Idade: <span className="font-semibold">{"-"}</span>
                </p>
                <p>
                    Email: <span className="font-semibold">{"-"}</span>
                </p>
                <p>
                    Idade: <span className="font-semibold">{"-"}</span>
                </p>
            </div>
        </div>
    );
};

type MobxProps = {
    children?: React.ReactNode;
};

const Mobx: NextPage<MobxProps> = ({}) => {
    return (
        <div className="max-w-7xl mt-6 mx-auto px-2 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-semibold">Mobx</h2>
            <div className="flex mt-4">
                <Form />
                <List />
                <Info />
            </div>
        </div>
    );
};

export default Mobx;
