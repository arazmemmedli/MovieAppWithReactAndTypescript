import React, { SyntheticEvent, useState } from 'react'
import { Link } from 'react-router-dom';
import { Input } from '../components/Input';
import { useForm } from '../hooks/useForm';
import { IInitialState, IRegister } from '../types/type';
import validate from "../formValidate/validate"
import shortid from 'shortid';

const initialState: IInitialState = {
    yourname: {
        value: '',
        required: true
    },
    surname: {
        value: '',
        required: true
    },
    username: {
        value: '',
        required: true
    },
    email: {
        value: '',
        required: true,
        requiredMessage: 'Email address is required!',
        email: true,
        emailMessage: 'Email address is not valid!'
    },
    password: {
        value: '',
        required: true,
        minLength: 6,
        minLengthMessage: 'Password must be at least 6 characters long!',
        maxLength: 16,
        maxLengthMessage: 'Too many characters!'
    },
    confirmPassword: {
        value: '',
        required: true,
        matchWith: 'password',
        matchWithMessage: 'Password values must be equal!'
    },
}

export const SignUp = () => {
    const [error, setError] = useState('');
    const { formData, errors, changeHandler, setErrors } = useForm(initialState, validate);

    const submitHandler = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        let formErrors = validate(formData, true);
        setErrors(formErrors);
        const ld = localStorage.getItem("users");
        const userId = shortid.generate();

        let data: IRegister[] = [];
        if (Object.keys(formErrors).length === 0) {
            const user: IRegister = {
                yourname: formData.yourname.value,
                surname: formData.surname.value,
                email: formData.email.value,
                username: formData.username.value,
                password: formData.password.value,
                confirmPassword: formData.confirmPassword.value,
                userId
            }
            if (ld === null) {
                data.push(user);
                localStorage.setItem("users", JSON.stringify(data));
                formData.yourname.value = "";
                formData.surname.value = "";
                formData.username.value = "";
                formData.email.value = "";
                formData.password.value = "";
                formData.confirmPassword.value = "";
            } else {
                let users: IRegister[] = JSON.parse(ld);
                let checkUser = users.filter((w) => w.username === user.username && w.email === user.email);
                if (checkUser.length < 1) {
                    users.push(user);
                    localStorage.setItem("users", JSON.stringify(users));
                    setError("");
                    formData.yourname.value = "";
                    formData.surname.value = "";
                    formData.username.value = "";
                    formData.email.value = "";
                    formData.password.value = "";
                    formData.confirmPassword.value = "";
                } else {
                    setError("There is an account matching this username and email!");
                }
            }
        }
    }

    return (
        <div className="flex login_bg items-center justify-center relative bg-cover bg-center bg-no-repeat w-full min-h-[100vh]">
            <div className="flex max-w-sm w-full flex-col items-center bg-white p-4 border border-solid border-gray-primary rounded mb-4">
                {error && <p className="mb-4 text-xs text-red-500">{error}</p>}
                <div className="w-full block mb-4">
                    <form method="POST" onSubmit={submitHandler}>
                        <Input aria-label="Enter your name" type="text" value={formData.yourname.value} onChange={changeHandler} error={errors.yourname} label="Yourname" name="yourname" id="yourname" placeholder="Your name" />
                        <Input aria-label="Enter your surname" type="text" value={formData.surname.value} onChange={changeHandler} error={errors.surname} label="Surname" name="surname" id="surname" placeholder="Surname" />
                        <Input aria-label="Enter your username" type="text" value={formData.username.value} onChange={changeHandler} error={errors.username} label="Username" name="username" id="username" placeholder="Username" />
                        <Input aria-label="Enter your email address" type="email" value={formData.email.value} onChange={changeHandler} error={errors.email} label="Email Address" name="email" id="email" placeholder="Email address" />
                        <Input aria-label="Enter your password" type="password" value={formData.password.value} onChange={changeHandler} error={errors.password} label="Password" name="password" id="password" placeholder="Password" />
                        <Input aria-label="Enter your confirm password" type="password" value={formData.confirmPassword.value} onChange={changeHandler} error={errors.confirmPassword} label="Confirm Password" name="confirmPassword" id="confirmPassword" placeholder="Confirm password" />
                        <button type="submit" className={`bg-[#1a191f] text-white w-full rounded h-8 font-bold`}>Sign Up</button>
                    </form>
                </div>
                <div className="flex justify-center items-center flex-col w-full rounded bg-white p-4 border border-solid border-gray-primary">
                    <p className="text-sm">
                        Have an account?{` `}
                        <Link to="/account" className="font-bold text-gray-500">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}