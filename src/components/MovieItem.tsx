import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MoviesContext } from '../context/context';
import { IContext, IMovie } from '../types/type';
import AddFavourite from "./favourites/AddFavourite";
import { AuthContext, IToken } from '../context/auth';

interface IItemProps {
    movie: IMovie,
}

const MovieItem = ({ movie }: IItemProps) => {
    const { addFavourites } = useContext(MoviesContext) as IContext;
    const { authTokens } = useContext(AuthContext) as IToken;
    const navigate = useNavigate();
    const [favouriteCheck, setFavouriteCheck] = useState(false)

    return (
        <div className="group relative md:m-2">
            <div className="relative w-full h-80 rounded-lg overflow-hidden sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`}
                    className="w-full h-full object-center object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                />
                <div onClick={() => {
                    if (authTokens !== null) {
                        addFavourites(movie);
                        setFavouriteCheck(true)
                    } else {
                        navigate("/account")
                    }
                }} className="absolute bg-[rgba(0,0,0,.8)] w-full cursor-pointer group-hover:opacity-100 opacity-0 transition-opacity duration-300 bottom-0 p-5 text-center flex items-center justify-center">
                    <AddFavourite check={favouriteCheck} />
                </div>
            </div>
            <h3 className="mt-3">
                <Link to={`/${movie.id}`} state={{ mediaType: movie.media_type }} className="text-base font-semibold text-[#e5e5e5]">
                    {movie.title || movie.original_name}
                </Link>
            </h3>
            <p className="text-sm font-semibold text-gray-500">{movie.release_date || movie.first_air_date}</p>
        </div>
    )
}

export default MovieItem;