import React from "react";
import type { NextPage } from "next";

import { Input } from "../../components/Input";

type MobxProps = {
    children?: React.ReactNode;
};

const Form = () => {
    const [name, setName] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("");
    const [age, setAge] = React.useState<number>(0);
    return (
        <div className="flex-col">
            <Input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Nome"
            />
            <Input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email"
            />
            <Input
                type="number"
                value={age}
                onChange={(event) => setAge(Number(event.target.value))}
                placeholder="Idade"
            />
        </div>
    );
};

const Mobx: NextPage<MobxProps> = ({}) => {
    return (
        <div className="mt-8 mx-44">
            <Form />
        </div>
    );
};

export default Mobx;
