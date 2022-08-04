import { useEffect, useState } from "react";
import { IMovie, IResult } from "../types/type";
import { InformationCircleIcon } from "@heroicons/react/solid";
import { FaPlay } from 'react-icons/fa'
import { Link } from "react-router-dom";


interface IBannerProps {
    discoverMovie: IResult
}

function Banner({ discoverMovie }: IBannerProps) {
    const [bm, setBM] = useState<IMovie>();
    const baseUrl = 'https://image.tmdb.org/t/p/original/'

    useEffect(() => {
        setBM(
            discoverMovie.results[Math.floor(Math.random() * discoverMovie.results.length)]
        )
    }, [discoverMovie])

    if (!bm) return <></>;
    return (
        <div className="flex flex-col space-y-2 px-4 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
            <div className="absolute top-0 left-0 -z-10 h-[70vw] lg:h-[95vh] w-screen">
                <img
                    src={`${baseUrl}${bm.backdrop_path || bm.poster_path}`}
                    className="object-cover w-full h-[inherit]"
                />
            </div>

            <h1 className="text-2xl font-bold text-[#fff] md:text-4xl lg:text-7xl">
                {bm.title || bm.name || bm.original_name}
            </h1>
            <p className="max-w-xs text-xs text-[#f4f4f4] text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
                {bm.overview.slice(0, 150) + "..."}
            </p>
            <div className="flex space-x-3">

                <Link
                    to={`/${bm.id}`}
                    state={{ mediaType: bm.media_type }}
                    className="flex items-center gap-x-2 rounded px-5 py-1.5 text-sm font-semibold transition hover:opacity-75 md:py-2.5 md:px-8 md:text-xl bg-[gray]/70"
                >
                    <InformationCircleIcon className="h-5 w-5 md:h-8 md:w-8" /> Daha Fazla Bilgi
                </Link>
            </div>
        </div>
    )
}

export default Banner;