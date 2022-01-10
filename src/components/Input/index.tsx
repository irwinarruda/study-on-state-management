import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    name: string;
    containerClassName?: string;
};

const Input = ({ label, name, containerClassName, ...props }: InputProps) => {
    return (
        <div className={containerClassName || ""}>
            <label
                htmlFor={name}
                className="block text-gray-700 text-sm font-bold mb-2"
            >
                {label}
            </label>
            <input
                id={name}
                name={name}
                {...props}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
        </div>
    );
};

export type { InputProps };
export { Input };
