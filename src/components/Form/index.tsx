import React from "react";

type FormProps = {
    children?: React.ReactNode;
};

const Form = ({}: FormProps) => {
    return (
        <div className="">
            <input value="" />
        </div>
    );
};

export type { FormProps };
export { Form };
