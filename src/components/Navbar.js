import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import MovieFilterTwoToneIcon from '@material-ui/icons/MovieFilterTwoTone';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import TvTwoToneIcon from '@material-ui/icons/TvTwoTone';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import {useHistory} from "react-router-dom"

const useStyles = makeStyles({
  root: {
    width:"100%",
    position:'fixed',
    bottom:0,
    zIndex:999,
    boxShadow:"0px 0px 15px 2px rgba(56, 56, 56, 0.99)",
    borderRadius:"100px 100px 0px 0px",
    backgroundColor:"#000"
  },
  selected:{
    fontSize:"20px",
  },
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const history = useHistory();

  useEffect(()=>{
    if(value===0) history.push("/Know_Your_Show/");
      else if(value===1)history.push("/Know_Your_Show/movies");
      else if(value===2)history.push("/Know_Your_Show/tv_series");
      else if(value===3)history.push("/Know_Your_Show/search");
  },[value,history]);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction style={{borderRadius:"100px 0px 0px 0px",color: "white"}} label="Trending" icon={<WhatshotIcon />} />
      <BottomNavigationAction style={{color: "white"}}label="Movies" icon={<MovieFilterTwoToneIcon />} />
      <BottomNavigationAction style={{color: "white"}} label="Tv Series" icon={<TvTwoToneIcon />} />
      <BottomNavigationAction style={{borderRadius:"0px 100px 0px 0px", color:"white"}} label="Search" icon={<SearchOutlinedIcon />} />
    </BottomNavigation>
  );
}

    