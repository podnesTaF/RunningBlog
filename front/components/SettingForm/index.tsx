import React, {useState} from 'react';
import {ResponseUser, UpdateUserDto} from '../../utils/api/types';
import {Button, Divider} from "@mui/material";
import {FormProvider, useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import {ChangeUserDataSchema} from "../../utils/validation";
import {FormField} from "../FormField";
import {useRouter} from "next/router";
import Alert from "@mui/material/Alert";
import {Api} from "../../utils/api";

interface SettingFormProps {
    user: ResponseUser;
}

const SettingForm: React.FC<SettingFormProps> = ({user}) => {
    const router = useRouter()

    const [errorMessage, setErrorMessage] = useState('');

    const form = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(ChangeUserDataSchema),
    });

    console.log(form.formState.isValid)

    const onSubmit = async (dto: UpdateUserDto) => {
        console.log(dto)
        try {
            const data = await Api().user.updateMe(dto)
            setErrorMessage('');
            router.push(`/profile/${user.id}`)
        } catch (err: any) {
            console.warn('Error by updating user', err);
            if (err.response) {
                setErrorMessage(err.response.data.message);
            }
        }
    }

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    type='text'
                    name='fullName'
                    label='Full Name'
                />
                <FormField
                    type='password'
                    name='oldPassword'
                    label='Old Password'
                />
                <FormField
                    type='password'
                    name='password'
                    label='New Password'
                />
                <Divider className="mt-30 mb-20"/>
                {errorMessage && (
                    <Alert severity="error" className="mb-20">
                        {errorMessage}
                    </Alert>
                )}
                <Button
                    type="submit"
                    disabled={!form.formState.isValid || form.formState.isSubmitting}
                    color="primary"
                    variant="contained"
                >
                    Save changes
                </Button>
            </form>
        </FormProvider>
    );
};

export default SettingForm
