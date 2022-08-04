import React from 'react'
import { Link } from 'react-router-dom'
import { IMovie, IResult } from '../types/type'
import MovieItem from './MovieItem'

const SearchMovie = ({ data }: { data: IMovie }) => {
    return (
        <div key={data.id} className="group relative md:m-2">
            <div className="relative w-full h-80 rounded-lg overflow-hidden sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                <img
                    src={`https://image.tmdb.org/t/p/w500${data.backdrop_path || data.poster_path}`}
                    className="w-full h-full object-center object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                />
            </div>
            <h3 className="mt-3">
                <Link to={`/${data.id}`} state={{ mediaType: data.media_type }} className="text-base font-semibold text-[#e5e5e5]">
                    {data.title || data.original_name}
                </Link>
            </h3>
            <p className="text-sm font-semibold text-gray-500">{data.release_date || data.first_air_date}</p>
        </div>
    )
}

export default SearchMovie