import React, { useContext, useEffect, useState } from 'react';
import { SearchIcon } from "@heroicons/react/solid";
import { MoviesContext } from '../context/context';
import { IContext } from '../types/type';

const style = {
    left: "30px"
}

export const Search = () => {
    const { searchValue, setSearchValue, SearchMovies } = useContext(MoviesContext) as IContext;
    const [isVisible, setIsVisible] = useState(false)

    const searchAction = () => {
        if (isVisible === false) {
            setIsVisible(true)
            style.left = "5px";
        } else if (isVisible === true) {
            setIsVisible(false)
            style.left = "30px"
        }

    }

    return (
        <div className="relative flex items-center justify-start flex-row h-20">
            <input type="search" onChange={(e) => {
                SearchMovies()
                setSearchValue(e.target.value)
            }} name="search" id="search" value={searchValue} className="md:w-60 w-48 h-10 rounded-md bg-[#222028] border-[2px] border-solid outline-none border-transparent text-base text-white pl-2 md:pl-5 pr-0 lg:pr-12" placeholder="Search for movies.." />
            <span onClick={searchAction} className="absolute hidden md:flex h-10 text-white text-xl items-center justify-center right-5" >
                <SearchIcon className="text-[#e5e5e5] inline-block w-6 cursor-pointer" />
            </span>
        </div>
    )
}

export default Search;