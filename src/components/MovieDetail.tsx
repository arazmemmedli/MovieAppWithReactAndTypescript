import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { movieDetail } from '../api/requests';
import { IMovie } from '../types/type';

interface ILocationState {
    mediaType: string
}

const MovieDetail = () => {
    const { id } = useParams();
    const location = useLocation();
    const { mediaType } = location.state as ILocationState;
    const [data, setData] = useState<IMovie>()

    const getMovie = async () => {
        if (!id) return;
        try {
            const dd = await movieDetail(mediaType, id);
            setData(dd);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getMovie()
    }, [])

    return (
        <div className='w-full relative box-border mt-20 h-[calc(100vh-80px)] px-8 lg:px-0'>
            <div className="max-w-5xl mx-auto h-full">
                <div className="flex h-[inherit] justify-between lg:flex-row flex-col">
                    <div className="flex items-center">
                        <div className="w-full md:flex-[0_0_100%]">
                            <img src={`https://image.tmdb.org/t/p/w500${data?.poster_path || data?.backdrop_path}`} alt="" className='w-full' />
                        </div>
                    </div>
                    <div className="w-full h-auto lg:flex-[0_0_50%] py-8 lg:py-32 text-[#e5e5e5]">
                        <h2 className='lg:text-[2em] text-4xl font-semibold mt-0 my-2'>{data?.original_name || data?.title}</h2>
                        <p className='lg:text-lg text-xl pb-3 text-[#999] leading-tight'><strong className='text-[#e5e5e5]'>Rating: </strong>{parseInt(String(data?.vote_average), 10)}</p>
                        <p className='lg:text-lg text-xl pb-3 text-[#999] leading-tight'><strong className='text-[#e5e5e5]'>Date: </strong>{data?.first_air_date || data?.release_date}</p>
                        <p className='lg:text-lg text-xl pb-3 text-[#999] leading-tight'><strong className='text-[#e5e5e5]'>Overview: </strong>{data?.overview}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieDetail;