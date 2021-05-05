import { Chip } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect } from 'react';
import "../../../css/genre.css"

const Genres = ({
    type,
    selectedGenres,
            genres,
         setGenres,
 setSelectedGenres,
           setPage,
}) => {
    const handleAdd=(genre)=>{
        setSelectedGenres([...selectedGenres,genre])
        setGenres(genres.filter((g)=>g.id !== genre.id));
        setPage(1);
    };
    const handleRemove=(genre)=>{
        setSelectedGenres(
            selectedGenres.filter((selected)=>selected.id !== genre.id)
        );
        setGenres([...genres,genre])
    }
    const fetchGenres= async ()=>{
        const{data}=await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
        setGenres(data.genres);
    };

    useEffect(()=>{
        fetchGenres();
        return()=>{
            setGenres({});
        };
         // eslint-disable-next-line
    },[]);

    return (
        <div style={{ padding: "6px 0" }}>
         {selectedGenres && 
         selectedGenres.map((genre) => (
            <Chip
            style={{ margin: 2,fontWeight:"bolder"}}
            label={genre.name}
            key={genre.id}
            color={'secondary'}
            clickable
            size="small"
            onDelete={()=>handleRemove(genre)}
            />
      ))}
        {genres && 
        genres.map((genre) => (
            <Chip
            className="chip"
            style={{ margin: 2 ,backgroundColor: "white", fontWeight:"bolder" }}
            label={genre.name}
            key={genre.id}
            clickable
            size="small"
            onClick={() => handleAdd(genre)}
            />
      ))}
        </div>
    );
};

export default Genres;
