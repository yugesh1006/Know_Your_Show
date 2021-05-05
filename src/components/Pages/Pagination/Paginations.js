import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import "../../../css/paginations.css"

const Theme=createMuiTheme({
    pallete:{
        type:'dark'
    }
})
const Paginations = ({setPage,numOfPages=10}) => {
    const handlePageChange = (page)=>{
        setPage(page);
        window.scroll(0,0);
    }
    return (
        <div className="pagination"  style={{
            display: "flex",
            justifyContent: "center",
            backgroundColor:"#dcdcde",
            borderRadius:"80px 80px 0 0"
            
          }}>
          <ThemeProvider theme={Theme}>
            <Pagination count={numOfPages}onChange={(e)=> handlePageChange(e.target.textContent)} hideNextButton hidePrevButton color="secondary" />
          </ThemeProvider>
        </div>
    )
}

export default Paginations
