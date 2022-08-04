import React, { SyntheticEvent, useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext, IToken } from '../context/auth';
import { IRegister } from '../types/type';


export const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPasword] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const isInvalid = password === '' || email === '';
    const { setTokens } = useContext(AuthContext) as IToken
    const navigate = useNavigate();

    const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        const ld = localStorage.getItem("users");
        if (ld) {
            const lu: IRegister[] = JSON.parse(ld)
            const ud = lu.find((w) => w.email === email && w.password === password);

            if (ud) {
                setTokens(ud)
                setError(false)
                navigate("/");
            } else {
                setError(true);
            }
        }
    }

    return (
        <div className="flex login_bg items-center justify-center relative bg-cover bg-center bg-no-repeat w-full min-h-[100vh]">
            <div className="flex max-w-sm w-full flex-col items-center bg-white p-4 border border-solid border-gray-primary rounded mb-4">
                <div className="w-full block mb-4">
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <input aria-label="Enter your email address" value={email} type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email address" className="block w-full text-base font-normal rounded-md text-[#333] mb-3 outline-none py-3 px-7 min-h-[50px] bg-[#f6f6f6]" />
                        <input aria-label="Enter your password" value={password} type="password" name="password" id="password" onChange={(e) => setPasword(e.target.value)} placeholder="Password" className="block w-full text-base outline-none font-normal mr-3 rounded-md mb-3 text-[#333] py-3 px-7 min-h-[50px] bg-[#f6f6f6]" />
                        <button disabled={isInvalid} type="submit" className={`bg-[#1a191f] text-white w-full rounded h-8 font-bold ${isInvalid && 'opacity-50'}`}>Log In</button>
                        {error && <p className='text-[red] mt-2 text-center'>Invalid Credentials</p>}
                    </form>
                </div>
                <div className="flex justify-center items-center flex-col w-full rounded bg-white p-4">
                    <p className="text-sm">
                        Don't have an account?{` `}
                        <Link to="/signup" className="font-bold text-gray-500">Sign Up</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
