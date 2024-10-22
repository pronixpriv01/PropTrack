import { RegisterForm } from '@/components/auth/RegisterForm';
import React from 'react';

const SignUpPage = () => {
    return (
        <div className="flex-center md:w-max-[250px] max-sm:w-max-[150px] pt-2">
            <RegisterForm />
        </div>
    )
}

export default SignUpPage;