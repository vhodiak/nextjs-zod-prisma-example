import {Button} from "@/components/ui/button";
import React, {useState} from "react";
import {z} from "zod";
import {Client, ClientDto} from "@/types";
import {create, update} from "@/services/clients";
import {FormInput} from "@/components/ui/forms";
import useSWRMutation from "swr/mutation";

const formSchema = ClientDto
type formInputs = z.infer<typeof ClientDto>

export default function ClientForm(
    {
        client,
        onSuccess,
        swrKey
    }:
        {
            client?: z.infer<typeof Client>,
            onSuccess: () => void;
            swrKey: string
        }
) {
    const [formData, setFormData] = useState<formInputs>(client ?? {firstName: '', lastName: ''});
    const [validationErrors, setValidationErrors] = useState<
        Partial<formInputs>
    >({});

    const {
        trigger,
        isMutating,
        data,
        error
    } = useSWRMutation(swrKey, () => client ? update(client.id, formData) : create(formData))


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const validationResult = formSchema.safeParse(formData);
        if (!validationResult.success) {
            const errors = validationResult.error.formErrors.fieldErrors;
            setValidationErrors(
                Object.fromEntries(
                    Object.entries(errors).map(([key, value]) => [key, value?.[0]])
                )
            );
            return;
        }
        setValidationErrors({})
        trigger().then(r => {
            setFormData({
                firstName: '',
                lastName: '',
            })
            onSuccess()
        })
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
                <div className="grid gap-2">
                    <FormInput label='First Name' name='firstName' value={formData.firstName} onChange={handleChange}
                               error={validationErrors.firstName}/>
                </div>
                <div className="grid gap-2">
                    <FormInput label='Last Name' name='lastName' value={formData.lastName} onChange={handleChange}
                               error={validationErrors.lastName}/>
                </div>
                <div className="grid gap-2">
                    <FormInput label='Phone Number' name='tel' value={formData.tel} type='tel' onChange={handleChange}
                               error={validationErrors.tel}/>
                </div>
                <div className="grid gap-2">
                    <FormInput label='Email' name='email' value={formData.email} onChange={handleChange}
                               error={validationErrors.email} type='email'/>
                </div>
                <Button disabled={isMutating} type="submit" className="w-full">
                    {client ? 'Update' : 'Create'}
                </Button>
            </div>
        </form>
    );
}
