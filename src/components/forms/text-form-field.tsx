import React, {ChangeEvent} from "react";

interface TextFormFieldProps {
    title: string;
    name: string;
    value: string;
    onChanged: (e: ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;

    type?: string;
    errors?: string[];
}

const TextFormField: React.FC<TextFormFieldProps> = (
    {
         title,
         name,
         value,
         onChanged,
         required = false,
         type = 'text',
         errors = []
 }) => {
    return (
        <>
            <label className="text-sm font-medium text-gray-900 dark:text-gray-300" htmlFor={name}>
                {title}
            </label>
            <div className="flex">
                <div className="relative w-full">
                    <input
                        className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 rounded-lg p-2.5 text-sm"
                        id={name}
                        name={name}
                        value={value || ''}
                        onChange={onChanged}
                        required={required}
                        type={type}
                    />
                    {errors && errors.length > 0 && (
                        <div className="text-red-500 text-xs mt-1">
                            {errors.map((error, index) => (
                                <p key={index}>{error}</p>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default TextFormField;
