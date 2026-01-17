import { redirect, useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { UpdateProfileFormSchema } from '../../../../lib/schemas/ui/update-profile.form';
import z from "zod";
import { CurrentUser } from "@/app/lib/helpers/type-current-user";
import { updateProfile } from "@/app/actions";

type UpdateProfileForm = z.infer<typeof UpdateProfileFormSchema>

interface UpdateUserFormProps{
    onSuccess?: () => void
    user: CurrentUser
}

export function UpdateUserForm({onSuccess, user}: UpdateUserFormProps){
    if(!user){
        redirect('/login')
    }

    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | null>(null)

    const [formData, setFormData] = useState<UpdateProfileForm>({
        name: '',
        profilePicture: ''
    })

    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault()
        setError(null)

        startTransition(async () => {
            try{
                if(!formData.name?.trim() && !formData.profilePicture?.trim()){
                    setError('Preenche ao menos um dos campos')
                }

                const result = await updateProfile(formData)

                if(!result.success){
                    setError(result.error)
                    return
                }

                
            }
        })
    }
}