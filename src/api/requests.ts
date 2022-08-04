export const API_KEY = "285a107f0c92cfda467db221ccc502f7";
const BASE_URL = "https://api.themoviedb.org/3";

const request = {
    getTrending: `${BASE_URL}/trending/all/day?api_key=${API_KEY}&language=en-US`,
    getDiscover: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_networks=213`,
    getTopRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    getActionMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=28`,
    getComedyMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=35`,
    getHorrowMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=27`,
    getRomanceMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=10749`,
    getDocumentariesMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=99`,
}

export const movieDetail = async (media_type: string, movie_id: string) => {
    try {
        const detReq = await fetch(`https://api.themoviedb.org/3/${media_type ? media_type : "movie"}/${movie_id}?api_key=${API_KEY}&language=en-US`);
        const data = await detReq.json();
        return data;
    } catch (error) {
        console.log(error)
    }
}

export const searchMovies = async (query: string, { abortSignal, page = 1 }: { abortSignal: any, page: number }) => {
    try {
        const searchReq = await fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&page=${page}&query=${query}`, { signal: abortSignal });
        const data = await searchReq.json();
        return data;
    } catch (error) {
        throw error;
    }
}

export const getMovies = async () => {
    const [getTrending, getDiscover, getTopRated, getActionMovies, getComedyMovies, getHorrowMovies, getRomanceMovies, getDocumentariesMovies] = await Promise.all([
        fetch(request.getTrending).then((res) => res.json()),
        fetch(request.getDiscover).then((res) => res.json()),
        fetch(request.getTopRated).then((res) => res.json()),
        fetch(request.getActionMovies).then((res) => res.json()),
        fetch(request.getComedyMovies).then((res) => res.json()),
        fetch(request.getHorrowMovies).then((res) => res.json()),
        fetch(request.getRomanceMovies).then((res) => res.json()),
        fetch(request.getDocumentariesMovies).then((res) => res.json())
    ])

    return {
        getTrending,
        getDiscover,
        getTopRated,
        getActionMovies,
        getComedyMovies,
        getHorrowMovies,
        getRomanceMovies,
        getDocumentariesMovies
    }
}

export default request;