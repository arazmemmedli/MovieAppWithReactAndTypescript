export interface IGenre {
    id: number
    name: string
}

export interface IResult {
    page: number,
    results: IMovie[],
    total_pages: number,
    total_results: number
}

export interface IMovie {
    title: string
    backdrop_path: string
    media_type?: string
    release_date?: string
    first_air_date: string
    genre_ids: number[]
    id: number
    name: string
    origin_country: string[]
    original_language: string
    original_name: string
    overview: string
    popularity: number
    poster_path: string
    vote_average: number
    vote_count: number
}

export interface IContext {
    searchValue: string;
    setSearchValue: any;
    SearchMovies: () => void;
    searchDatas: IMovie[];
    addFavourites: (movie: IMovie) => void;
    removeFavourites: (movie: IMovie) => void;
    favourites: IFavourites[];
    setSearchDatas: any;
    currentPage: number;
    setCurrentPage: any;
    setFavourites: () => void;
}

export interface IFavourites {
    userId:string;
    favourites: IMovie[]
}

export interface IRegister {
    yourname: string;
    surname: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    userId:string;
}

export interface IInitialState {
    yourname: {
        value: string,
        required: boolean,
        touched?: boolean
    },
    surname: {
        value: string,
        required: boolean,
        touched?: boolean
    },
    username: {
        value: string,
        required: boolean,
        touched?: boolean
    },
    email: {
        value: string,
        required: boolean,
        requiredMessage: string,
        email: boolean,
        emailMessage: string,
        touched?: boolean
    },
    password: {
        value: string,
        required: boolean,
        minLength: number,
        minLengthMessage: string,
        maxLength: number,
        maxLengthMessage: string,
        touched?: boolean
    },
    confirmPassword: {
        value: string,
        required: boolean,
        matchWith: string,
        matchWithMessage: string,
        touched?: boolean
    },
}
