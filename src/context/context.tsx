import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { searchMovies } from "../api/requests";
import { IFavourites, IMovie, IResult } from "../types/type";
import { AuthContext, IToken } from '../context/auth';

export const MoviesContext = createContext({});

export const MoviesProvider = ({ children }: { children: any }) => {
    const [searchValue, setSearchValue] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const prevController = useRef<any>(null);
    const [favourites, setFavourites] = useState<IFavourites[]>([]);
    const [searchDatas, setSearchDatas] = useState<IMovie[]>([])
    const { authTokens } = useContext(AuthContext) as IToken;

    const SearchMovies = async (isInfinity = false, { page = 1 } = {}) => {
        if (searchValue.trim() === "") {
            return;
        }
        try {
            const controller = new AbortController();

            if (prevController.current) {
                prevController.current.abort();
            }
            prevController.current = controller;
            const searchData: IResult = await searchMovies(searchValue, { abortSignal: controller.signal, page: currentPage })
            if (isInfinity) {
                setSearchDatas([...searchDatas, ...searchData?.results?.filter(w => w?.media_type !== "person" && w?.backdrop_path)]
                )
            } else {
                setSearchDatas(searchData?.results?.filter(w => w?.media_type !== "person" && w?.backdrop_path))
            }
        } catch (error) {
            console.log(error)
        }
    };

    const addFavourites = (movie: IMovie) => {
        if (!authTokens) return;
        const ld = localStorage.getItem("favourites");
        let fd: IFavourites[] = [];
        if (ld === null) {
            fd.push({ userId: authTokens.userId, favourites: [movie] })
            localStorage.setItem("favourites", JSON.stringify(fd))
            setFavourites(fd)
        } else {
            let favouritesData: IFavourites[] = JSON.parse(ld);
            const checkUsers = favouritesData.find((u) => u.userId === authTokens.userId);
            if (checkUsers) {
                const checkFavourites = checkUsers.favourites.find((f) => (f.id === movie.id) && (f.original_name === movie.original_name || f.title === movie.title || f.name === movie.name));
                if (!checkFavourites) {
                    checkUsers.favourites.push(movie);
                    localStorage.setItem("favourites", JSON.stringify(favouritesData))
                    setFavourites(favouritesData)
                }
            } else {
                favouritesData.push({ userId: authTokens.userId, favourites: [movie] });
                localStorage.setItem("favourites", JSON.stringify(favouritesData))
                setFavourites(favouritesData)
            }
        }
    }

    const removeFavourites = (movie: IMovie) => {
        const ld = localStorage.getItem("favourites");
        if (ld !== null) {
            let favouritesData: IFavourites[] = JSON.parse(ld);
            const findUser = favouritesData.find((u) => u.userId === authTokens?.userId)
            if (findUser) {
                const rfd = findUser.favourites.filter((f) => (f.id !== movie.id) && (f.name !== movie.name || f.original_name !== movie.original_name || f.title !== movie.title));

                findUser.favourites = rfd
                localStorage.setItem("favourites", JSON.stringify(favouritesData));
                setFavourites(favouritesData);
            }
        }
    }

    useEffect(() => {
        const ld = localStorage.getItem("favourites");
        if (ld) {
            const fd = JSON.parse(ld);
            setFavourites(fd)
        }
    }, [setFavourites])

    useEffect(() => {

    }, [])

    return (
        <MoviesContext.Provider value={{
            searchValue,
            currentPage,
            SearchMovies,
            searchDatas,
            addFavourites,
            removeFavourites,
            favourites,
            setSearchValue,
            setCurrentPage,
            setFavourites
        }}>
            {children}
        </MoviesContext.Provider>
    )
}