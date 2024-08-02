import {Button} from "@/components/ui/button";
import React, {useState} from "react";
import {z} from "zod";
import {Project, ProjectDto} from "@/types";
import {create, update} from "@/services/projects";
import {FormInput} from "@/components/ui/forms";
import useSWRMutation from "swr/mutation";
import ClientSelect from "@/components/client-select";

const formSchema = ProjectDto
type formInputs = z.infer<typeof ProjectDto>

export default function ProjectForm(
    {
        project,
        onSuccess,
        swrKey
    }:
        {
            project?: z.infer<typeof Project>,
            onSuccess: () => void;
            swrKey: string
        }
) {
    const [formData, setFormData] = useState<formInputs>(project ?? {title: '', clientId: ''});
    const [validationErrors, setValidationErrors] = useState<
        Partial<formInputs>
    >({});

    const {
        trigger,
        isMutating,
        data,
        error
    } = useSWRMutation(swrKey, () => project ? update(project.id, formData) : create(formData))


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
                title: '',
                clientId: '',
            })
            onSuccess()
        })
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
                <div className="grid gap-2">
                    <ClientSelect value={project?.clientId} onChange={(v) => setFormData({...formData, clientId: v})}/>
                </div>
                <div className="grid gap-2">
                    <FormInput label='Title' name='title' value={formData.title} onChange={handleChange}
                               error={validationErrors.title}/>
                </div>

                <Button disabled={isMutating} type="submit" className="w-full">
                    {project ? 'Update' : 'Create'}
                </Button>
            </div>
        </form>
    );
}
