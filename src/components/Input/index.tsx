import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {};

const Input = ({ ...props }: InputProps) => {
    return (
        <div className="col-span-6 sm:col-span-3">
            <label
                htmlFor="first-name"
                className="block text-sm font-medium text-gray-700"
            >
                First name
            </label>
            <input
                {...props}
                className="px-4 py-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
        </div>
    );
};

export type { InputProps };
export { Input };
