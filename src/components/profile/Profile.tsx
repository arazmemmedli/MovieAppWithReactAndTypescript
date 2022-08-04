import React, { useContext } from 'react'
import { AuthContext, IToken } from '../../context/auth';
import { MoviesContext } from '../../context/context';
import { IContext } from '../../types/type';
import SearchMovie from '../SearchMovie';

export const Profile = () => {
    const { authTokens, updateToken, changePassword, errorChangeTxt, errorUpdateTxt } = useContext(AuthContext) as IToken;
    const { searchValue, searchDatas } = useContext(MoviesContext) as IContext;

    return (
        <>
            {
                searchValue.trim() === "" ? <>
                    <section className='profile_bg mt-20 py-20 relative bg-no-repeat bg-cover bg-[center_center]'>
                        <div className="lg:max-w-[1140px] mx-auto relative px-[15px]">
                            <div className="flex flex-wrap -mx-[15px]">
                                <div className="max-w-full flex-[0_0_100%] text-center">
                                    <h1 className='text-4xl leading-10 text-white font-normal'>My Profile</h1>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div className="sm:mt-20">
                        <div className="md:grid lg:grid-cols-3 md:grid-cols-1 md:gap-6 md:px-8 lg:px-16 px-4">
                            <div className="md:col-span-1 col-span-3">
                                <h3 className="text-lg font-medium leading-6 text-white mb-3">Personal Information</h3>
                                <div className="px-0 grid md:grid-cols-2 grid-cols-1">
                                    <p className="mt-1 text-base text-[#999]"><b className='text-white font-semibold'>Yourname: </b>{authTokens?.yourname}</p>
                                    <p className="mt-1 text-base text-[#999]"><b className='text-white font-semibold'>Surname: </b>{authTokens?.surname}</p>
                                    <p className="mt-1 text-base text-[#999]"><b className='text-white font-semibold'>Username: </b>{authTokens?.username}</p>
                                    <p className="mt-1 text-base text-[#999]"><b className='text-white font-semibold'>Email: </b>{authTokens?.email}</p>
                                </div>
                            </div>
                            <div className="mt-5 md:mt-0 md:col-span-1 col-span-3">
                                <form action="#" onSubmit={updateToken}>
                                    <div className="shadow overflow-hidden sm:rounded-md px-4 py-5 sm:p-6 bg-[#28282d]">
                                        <div className="w-full mb-5">
                                            <h4 className='text-white block text-base font-medium'>Profile details</h4>
                                        </div>
                                        <div className="grid grid-cols-6 gap-6">
                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="yourname" className="block text-sm font-medium text-[rgba(255,255,255,0.75)] mb-2">
                                                    Yourname
                                                </label>
                                                <input aria-label="Enter your name" type="text" name="yourname" id="yourname" placeholder="Yourname" className="block bg-[#2b2b31] w-full text-base font-normal rounded-md text-[#f5f5f5] mb-3 outline-none border border-solid border-transparent transition-colors ease-in-out duration-300 hover:border-red-600 py-3 px-7 min-h-[50px]" />
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="surname" className="block text-sm font-medium text-[rgba(255,255,255,0.75)] mb-2">
                                                    Surname
                                                </label>
                                                <input aria-label="Enter your surname" type="text" name="surname" id="surname" placeholder="Surname" className="block bg-[#2b2b31] w-full text-base font-normal rounded-md text-[#f5f5f5] mb-3 outline-none border border-solid border-transparent transition-colors ease-in-out duration-300 hover:border-red-600 py-3 px-7 min-h-[50px]" />
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="username" className="block text-sm font-medium text-[rgba(255,255,255,0.75)] mb-2">
                                                    Username
                                                </label>
                                                <input aria-label="Enter your username" type="text" name="username" id="username" placeholder="Username" className="block bg-[#2b2b31] w-full text-base font-normal rounded-md text-[#f5f5f5] mb-3 outline-none border border-solid border-transparent transition-colors ease-in-out duration-300 hover:border-red-600 py-3 px-7 min-h-[50px]" />
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="email" className="block text-sm font-medium text-[rgba(255,255,255,0.75)] mb-2">
                                                    Email address
                                                </label>
                                                <input aria-label="Enter your email address" type="email" name="email" id="email" placeholder="Email address" className="block bg-[#2b2b31] w-full text-base font-normal rounded-md text-[#f5f5f5] mb-3 outline-none border border-solid border-transparent transition-colors ease-in-out duration-300 hover:border-red-600 py-3 px-7 min-h-[50px]" />
                                            </div>

                                        </div>
                                        <p className='text-base text-green-600 my-3'>{errorUpdateTxt}</p>
                                        <div className="py-3 text-left">
                                            <button
                                                type="submit"
                                                className="flex flex-row justify-center items-center h-12 w-32   text-sm font-medium text-[#e5e5e5] border-[2px] border-solid border-red-600 uppercase rounded-md bg-transparent"
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="mt-5 md:mt-0 md:col-span-1 col-span-3 pb-5 lg:pb-0">
                                <form action="#" onSubmit={changePassword}>
                                    <div className="shadow overflow-hidden sm:rounded-md px-4 py-5 sm:p-6 bg-[#28282d]">
                                        <div className="w-full mb-5">
                                            <h4 className='text-white block text-base font-medium'>Change password</h4>
                                        </div>
                                        <div className="grid grid-cols-6 gap-6">
                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="oldPassword" className="block text-sm font-medium text-[rgba(255,255,255,0.75)] mb-2">
                                                    Old Password
                                                </label>
                                                <input aria-label="Enter your old password" type="password" name="oldPassword" id="oldPassword" placeholder="Old password" className="block bg-[#2b2b31] w-full text-base font-normal rounded-md text-[#f5f5f5] mb-3 outline-none border border-solid border-transparent transition-colors ease-in-out duration-300 hover:border-red-600 py-3 px-7 min-h-[50px]" />
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="newPassword" className="block text-sm font-medium text-[rgba(255,255,255,0.75)] mb-2">
                                                    New Password
                                                </label>
                                                <input aria-label="Enter your new password" type="password" name="newPassword" id="newPassword" placeholder="New password" className="block bg-[#2b2b31] w-full text-base font-normal rounded-md text-[#f5f5f5] mb-3 outline-none border border-solid border-transparent transition-colors ease-in-out duration-300 hover:border-red-600 py-3 px-7 min-h-[50px]" />
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-[rgba(255,255,255,0.75)] mb-2">
                                                    Confirm New Password
                                                </label>
                                                <input aria-label="Enter your password" type="password" name="confirmNewPassword" id="confirmNewPassword" placeholder="Confirm new password" className="block bg-[#2b2b31] w-full text-base font-normal rounded-md text-[#f5f5f5] mb-3 outline-none border border-solid border-transparent transition-colors ease-in-out duration-300 hover:border-red-600 py-3 px-7 min-h-[50px]" />
                                            </div>
                                        </div>
                                        <p className='text-base text-green-600 my-3'>{errorChangeTxt}</p>
                                        <div className="py-3 text-left">
                                            <button
                                                type="submit"
                                                className="flex flex-row justify-center items-center h-12 w-32 text-sm font-medium text-[#e5e5e5] border-[2px] border-solid border-red-600 uppercase rounded-md bg-transparent"
                                            >
                                                Change
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </> : null
            }
            {
                searchValue.trim() !== "" ? <section className='w-full carousel' id='row'>
                    <div className="mt-[70px]">
                        <div className="mb-5 border-b border-solid border-[#444] mx-2 pb-5 text-left">
                            <h2 className='text-2xl font-bold text-white'>Search Result</h2>
                        </div>
                        <div className="relative grid lg:grid-cols-5">
                            {
                                searchDatas.map((sd) => {
                                    return (
                                        <SearchMovie key={sd.id} data={sd} />
                                    )
                                })
                            }
                        </div>
                    </div>
                </section > : null
            }
        </>

    )
}
