import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { IContext, IFavourites, IMovie } from '../../types/type'
import { AuthContext, IToken } from '../../context/auth';
import { RemoveFavourites } from './RemoveFavourites';
import { MoviesContext } from '../../context/context';
import SearchMovie from '../SearchMovie';


export const Favourites = () => {
    const { authTokens } = useContext(AuthContext) as IToken;
    const { removeFavourites, favourites, searchValue, searchDatas } = useContext(MoviesContext) as IContext;
    const navigate = useNavigate();
    const [datas, setDatas] = useState<IFavourites>()


    useEffect(() => {
        const findUser = favourites.find((u) => u.userId === authTokens?.userId);
        if (findUser) {
            setDatas(findUser)
        }
    }, [favourites])

    return (
        <>
            {
                searchValue.trim() === "" ? <section className='w-full mt-20'>
                    <div className="lg:px-16 px-4">
                        <div className="mb-5 border-b border-solid border-[#444] mx-2 pb-5 text-left">
                            <h2 className='text-2xl font-bold text-white'>Favourites</h2>
                        </div>
                        <div className="mt-6 space-y-12 lg:space-y-0 grid lg:grid-cols-5 md:grid-cols-2 lg:gap-x-6">
                            {datas?.favourites.map((movie) => (
                                <div key={movie.id} className="group relative md:m-2">
                                    <div className="relative w-full h-80 rounded-lg overflow-hidden sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`}
                                            className="w-full h-full object-center object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                                        />
                                        <div onClick={() => {
                                            if (authTokens !== null) {
                                                removeFavourites(movie)
                                            } else {
                                                navigate("/account")
                                            }
                                        }} className="absolute bg-[rgba(0,0,0,.8)] cursor-pointer w-full group-hover:opacity-100 opacity-0 transition-opacity duration-300 bottom-0 p-5 text-center flex items-center justify-center">
                                            <RemoveFavourites />
                                        </div>
                                    </div>
                                    <h3 className="mt-3">
                                        <Link to={`/${movie.id}`} state={{ mediaType: movie.media_type }} className="text-base font-semibold text-[#e5e5e5]">
                                            {movie.title || movie.original_name}
                                        </Link>
                                    </h3>
                                    <p className="text-sm font-semibold text-gray-500">{movie.release_date || movie.first_air_date}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section > : null
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
