import React, { useEffect, useState, useContext } from 'react';
import Header from '../components/Header';
import { IContext, IResult } from '../types/type';
import { getMovies } from '../api/requests';
import Banner from "../components/Banner";
import Movies from "../components/Movies";
import { MoviesContext } from '../context/context';
import SearchMovie from '../components/SearchMovie';
import shortid from 'shortid';

interface IStateMovies {
  getTrending: IResult;
  getDiscover: IResult;
  getTopRated: IResult;
  getActionMovies: IResult;
  getComedyMovies: IResult;
  getHorrowMovies: IResult;
  getRomanceMovies: IResult;
  getDocumentariesMovies: IResult;
}

export const Home = () => {
  const [movies, setMovies] = useState<IStateMovies>();
  const { searchValue, searchDatas } = useContext(MoviesContext) as IContext;
  const getAllMovies = async () => {
    const data = await getMovies();

    if (data) {
      setMovies(data)
    }
  }

  useEffect(() => {
    getAllMovies()
  }, [])

  if (!movies) return <></>;
  return (
    <>

      <Header />

      <main className="relative pb-24 lg:space-y-24 px-8 lg:px-16">
        {searchValue.trim() === "" ? <Banner discoverMovie={movies?.getDiscover} /> : null}
        <div className='wrapper'>
          {
            searchValue.trim() === "" ? <>
              <Movies title="Netflix'te Popüler" movies={movies.getDiscover} />
              <Movies title="Gündemdekiler" movies={movies.getTopRated} />
              <Movies title="Doğu Asya Drama Dizileri" movies={movies.getActionMovies} />
              <Movies title="Yeni Çıkanlar" movies={movies.getTrending} />
              <Movies title="ABD Yapımı Maratonluk Drama Dizileri" movies={movies.getComedyMovies} />
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
        </div>
      </main>
    </>
  )
}
