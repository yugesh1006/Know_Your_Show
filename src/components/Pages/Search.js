import React,{useState,useEffect} from 'react';
import { Button, createMuiTheme, TextField, ThemeProvider } from '@material-ui/core';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import axios from 'axios';
import Singlecard from './Singlecard/Singlecard'; 
import Paginations from './Pagination/Paginations';
import "../../css/search.css";

const Search = () => {
    const [type, setType] = useState(0);
    const [page,setPage]=useState(1);
    const [searchText,setSearchText]=useState("");
    const [content,setContent]=useState();
    const [numOfPages,setNumOfPages]=useState();

    const darkTheme= createMuiTheme({
        palette:{
            type:"dark",
            primary:{
                main:"#000",
            },
        },
    });
    
    const fetchSearch = async () => {
        try {
          const { data } = await axios.get(
            `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
              process.env.REACT_APP_API_KEY
            }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
          );
          setContent(data.results);
          setNumOfPages(data.total_pages);
          
        } catch (error) {
          console.error(error);
        }
      };
    
      useEffect(() => {
        window.scroll(0, 0);
        fetchSearch();
        // eslint-disable-next-line
      }, [type, page]);

    return (
        <div>
        <ThemeProvider theme={darkTheme}>
            <div style={{display:"flex",margin:"15px 0"}}>
                <TextField 
                    style={{flex:1,backgroundColor:"black",borderRadius:"10px",color:"white"}}
                    className="searchbox"
                    label="search"
                    variant="filled"
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <Button variant="contained" style={{marginLeft:10,backgroundColor:"transparent",boxShadow:"none"}} onClick={fetchSearch}>
                    <SearchOutlinedIcon/>
                </Button>
            </div>
            <Tabs
                value={type}
                indicatorColor="secondary"
                textColor="secondary"
                variant="fullWidth"
                onChange={(event, newValue)=>{
                    setType(newValue);
                    setPage(1);
                }}>
                 <Tab style={{width: "50%",color:"#000",fontWeight:"bold"}} label="Movies"/>
                 <Tab style={{width : "50%",color:"#000",fontWeight:"bold"}} label="Tv Series"/>
            </Tabs>     
        </ThemeProvider>
        <div className="movies">
        {content &&
          content.map((c) => (
            <Singlecard
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={type ? "tv" : "movie"}
              vote_average={c.vote_average}
            />
          ))}
          {
              searchText&&!content&&(type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)
          }
      </div>
            {numOfPages>1&&(
            <Paginations setPage={setPage} numOfPages={numOfPages}/>
            )}
        </div>
    )
}

export default Search
