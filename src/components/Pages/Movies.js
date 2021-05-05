import axios from 'axios';
import React,{useState,useEffect} from 'react';
import Singlecard from './Singlecard/Singlecard'; 
import Paginations from './Pagination/Paginations';
import "../../css/movies.css"
import Genres from './Genre/Genres'
import useGenre from '../../hooks/useGenre';

const Movies = () => {
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [numOfPages, setNumOfPages] = useState();
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [genres, setGenres] = useState([]);
    const genreforURL=useGenre(selectedGenres);

    const fetchMovie=async()=>{
        const{data}=await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`);
        setContent(data.results)
        setNumOfPages(data.total_pages)
    };

    useEffect(() => {
        fetchMovie();
        // eslint-disable-next-line
    },[page,genreforURL]);
    return (
        <div >
            <span className="pageTitle">
                Movies
            </span>
            <Genres
        type="movie"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
      <div className="movies">
        {content &&
          content.map((c) => (
            <Singlecard
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type="movie"
              vote_average={c.vote_average}
            />
          ))}
      </div>

            {numOfPages>1&&(
            <Paginations setPage={setPage} numOfPages={numOfPages}/>
            )}
        </div>
    )
}

export default Movies
