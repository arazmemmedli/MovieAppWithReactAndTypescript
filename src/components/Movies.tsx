import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import request from '../api/requests';
import { IMovie, IResult } from '../types/type';
import MovieItem from "./MovieItem";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Navigation } from "swiper";

const Movies = ({ title, movies }: { title: string, movies: IResult }) => {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };


    return (
        <section className='w-full carousel md:mb-0 mb-6' id='row'>
            <div className="">
                <div className="mb-5 border-b border-solid border-[#444] mx-2 pb-5 text-left">
                    <h2 className='text-2xl font-bold text-white'>{title}</h2>
                </div>
                <div className="relative">
                    <Slider {...settings}>
                        {movies.results.map((movie) => (
                            <MovieItem key={movie.id} movie={movie} />
                        ))}
                    </Slider>
                </div>
            </div>
        </section >
    )
}

export default Movies;