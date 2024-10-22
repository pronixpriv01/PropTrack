import { LoginForm } from '@/components/auth/LoginForm';
import React from 'react';

const SignInPage = () => {
    return (
        <div className="flex-center md:w-max-[250px] max-sm:w-max-[150px] pt-2">
            <LoginForm />
        </div>
    )
}

export default SignInPage;