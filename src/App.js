import React, { useEffect, useState } from 'react';
import './App.css';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setblackHeader] = useState(false);

  useEffect(() => {                           //quando a pagina fazer load vai executar esta função
    const loadAll = async () => {             //Ir buscar a lista total dos filmes
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      let originals = list.filter(i => i.slug === 'originals'); //filto para ir buscar apenas os originais do netflix
      let randonChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1)); //gerir numero aleatorio de acordo com a quantidade de items na lista
      let chosen = originals[0].items.results[randonChosen] //filme escolhido
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv'); //informaçoes a serem apresentadas
      setFeaturedData(chosenInfo);
    }

    loadAll();
  }, []);

  useEffect(() => { //efeito do header com o scroll
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setblackHeader(true);
      } else {
        setblackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);

  return (
    <div className="page">

      <Header black={blackHeader} />

      {featuredData &&
        <FeaturedMovie item={featuredData} />  //filme a ser apresentado no inicio do site 
      }

      <section className="lists">
        {movieList.map((item, key) => (   //mapear um loop para mostrar os filmes
          <MovieRow key={key} title={item.title} items={item.items}></MovieRow>  //componente utilizado com a lista e itens
        ))

        }
      </section>


      {movieList.length <= 0 &&
        <div className="loading">
          <img src="https://cdn.lowgif.com/small/0534e2a412eeb281-the-counterintuitive-tech-behind-netflix-s-worldwide.gif" alt="loading"></img>
        </div>
      }
    </div>
  )
}



