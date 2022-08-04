import React, { createContext, ReactNode, SyntheticEvent, useEffect, useState } from 'react'
import { IFavourites, IRegister } from '../types/type';

export interface IToken {
    authTokens: IRegister | null;
    setTokens: (data: IRegister) => void;
    handleLogout: () => void;
    updateToken: (e: SyntheticEvent<HTMLFormElement>) => void;
    changePassword: (e: SyntheticEvent<HTMLFormElement>) => void;
    deleteAccount: () => void;
    errorUpdateTxt: string;
    errorChangeTxt: string;
}

export const AuthContext = createContext<IToken | null>(null);

interface Props {
    children: JSX.Element[] | JSX.Element
}

export function UseAuth({ children }: Props) {
    const [authTokens, setAuthTokens] = useState<IRegister | null>(null);
    const [errorUpdateTxt, setErrorUpdateTxt] = useState<string>("")
    const [errorChangeTxt, setErrorChangeTxt] = useState<string>("")

    const setTokens = (data: IRegister) => {
        sessionStorage.setItem("tokens", JSON.stringify(data));
        setAuthTokens(data)
    };

    const handleLogout = () => {
        sessionStorage.removeItem("tokens");
        setAuthTokens(null);
    };

    const updateToken = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!authTokens) return;
        const form = e.target as HTMLFormElement;

        const yourname = form["yourname"].value;
        const surname = form["surname"].value;
        const username = form["username"].value;
        const email = form["email"].value;
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


        const data: IRegister = {
            yourname: yourname !== "" ? yourname : authTokens.yourname,
            surname: surname !== "" ? surname : authTokens.surname,
            username: username !== "" ? username : authTokens.username,
            email: email !== "" && re.test(email) === true ? email : authTokens.email,
            password: authTokens.password,
            confirmPassword: authTokens.confirmPassword,
            userId: authTokens.userId
        }

        let ld = localStorage.getItem("users");
        if (ld !== null) {
            const ud: IRegister[] = JSON.parse(ld);
            let initialUser = ud.find((w) => w.userId === authTokens.userId);
            initialUser = data;
            let allUsers = ud.filter((u) => u.userId !== authTokens.userId);
            allUsers.push(initialUser);
            localStorage.setItem("users", JSON.stringify(allUsers))
            sessionStorage.setItem("tokens", JSON.stringify(data));
            setAuthTokens(data);
            form["yourname"].value = "";
            form["surname"].value = "";
            form["username"].value = "";
            form["email"].value = "";
            setErrorUpdateTxt("Operation completed successfully!")
        }


    }

    const changePassword = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;

        const oldPassword = form["oldPassword"].value;
        const newPassword = form["newPassword"].value;
        const confirmNewPassword = form["confirmNewPassword"].value;

        if (!authTokens || !newPassword || !confirmNewPassword) return;

        if (oldPassword === authTokens.password && confirmNewPassword === newPassword) {
            const data: IRegister = {
                yourname: authTokens.yourname,
                surname: authTokens.surname,
                username: authTokens.username,
                email: authTokens.email,
                password: newPassword,
                confirmPassword: confirmNewPassword,
                userId:authTokens.userId
            }

            const ld = localStorage.getItem("users");
            if (ld !== null) {
                const ud: IRegister[] = JSON.parse(ld);
                let initialUser = ud.find((w) => w.userId === authTokens.userId);
                initialUser = data;
                let allUsers = ud.filter((u) => u.userId !== authTokens.userId);
                allUsers.push(initialUser);
                localStorage.setItem("users", JSON.stringify(allUsers))
                sessionStorage.setItem("tokens", JSON.stringify(data));
                form["oldPassword"].value = "";
                form["newPassword"].value = "";
                form["confirmNewPassword"].value = "";
                setErrorChangeTxt("Operation completed successfully!")
                setAuthTokens(data);
            }
        }

    }

    const deleteAccount = () => {
        if (!authTokens) return;
        const localData = localStorage.getItem("users");
        const localFavouritesData = localStorage.getItem("favourites");
        if (localData && localFavouritesData) {
            let users: IRegister[] = JSON.parse(localData);
            let favourites: IFavourites[] = JSON.parse(localFavouritesData);
            const removeUser = users.filter((u) => u.userId !== authTokens.userId);
            sessionStorage.removeItem("tokens");
            const removeFavourites = favourites.filter((f) => f.userId !== authTokens.userId)
            users = removeUser;
            favourites = removeFavourites;
            localStorage.setItem("users", JSON.stringify(users));
            localStorage.setItem("favourites", JSON.stringify(favourites));
            setAuthTokens(null);
        }
    }

    useEffect(() => {
        const sd = sessionStorage.getItem("tokens");
        if (sd) {
            const ud = JSON.parse(sd);
            setAuthTokens(ud)
        }
    }, [setAuthTokens])

    return (
        <AuthContext.Provider value={{ authTokens, setTokens, handleLogout, updateToken, changePassword, deleteAccount, errorChangeTxt, errorUpdateTxt }}>
            {children}
        </AuthContext.Provider>
    )
}
