const API_KEY = 'e627cf7dadb3d650a49e5da660569b89';  //chave da tmdb api 
const API_BASE = 'https://api.themoviedb.org/3'; // url de requisição da api 

/* 
json com as funções para ir buscar as informações dos filmes originais da netflix, os recomendados
os mais votados, os de açao, comedia, terror, romanticos e documentários
*/

const basicFecth = async (endpoint) => {
    return (await fetch(`${API_BASE}${endpoint}`)).json(); //fazer requisição e mostrar resultado com o return
}

export default {
    getHomeList: async () => {
        return [
            {
                slug: 'originals',
                title: "Os melhores de hoje",
                items: await basicFecth(`/discover/tv/?with_network=213&language=pt-PT&api_key=${API_KEY}`) // "=231" codigo da api para os originais do neflix
            },
            {
                slug: 'trending',
                title: "Recomendados para Ti",
                items: await basicFecth(`/trending/all/week?language=pt-PT&api_key=${API_KEY}`)
            },
            {
                slug: 'toprated',
                title: "Populares",
                items: await basicFecth(`/movie/top_rated?&language=pt-PT&api_key=${API_KEY}`)
            },
            {
                slug: 'action',
                title: "Ação",
                items: await basicFecth(`/discover/movie?with_genres=28&language=pt-PT&api_key=${API_KEY}`) //"=28" codigo para os filmes de ação
            },
            {
                slug: 'comedy',
                title: "Comédia",
                items: await basicFecth(`/discover/movie?with_genres=35&language=pt-PT&api_key=${API_KEY}`)
            },
            {
                slug: 'horror',
                title: "Terror",
                items: await basicFecth(`/discover/movie?with_genres=27&language=pt-PT&api_key=${API_KEY}`)
            },
            {
                slug: 'romance',
                title: "Romance",
                items: await basicFecth(`/discover/movie?with_genres=10749&language=pt-PT&api_key=${API_KEY}`)
            },
            {
                slug: 'documentary',
                title: "Documentários",
                items: await basicFecth(`/discover/movie?with_genres=99&language=pt-PT&api_key=${API_KEY}`)
            },
        ]
    },

    getMovieInfo: async (movieId, type) => { //função para obter informaçoes de um filme em especifico
        let info = {};
        if (movieId) {
            switch (type) {
                case 'movei':
                    info = await basicFecth(`/movie/${movieId}?language=pt-PT&api_key=${API_KEY}`);
                    break;
                case 'tv':
                    info = await basicFecth(`/tv/${movieId}?language=pt-PT&api_key=${API_KEY}`);
                    break;
                default:
                    info = null;
                    break;
            }
        }

        return info;
    }
}