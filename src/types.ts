interface Movie {
    title: string;
    backdrop_path: string;
    _id: string;
}

interface Data {
    movies?: Movie[];
}

interface SearchData {
    contents?: Movie[];
}