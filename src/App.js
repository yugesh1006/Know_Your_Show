import { Container } from "@material-ui/core";
import {BrowserRouter, Route, Switch} from "react-router-dom"
import Header from "./components/Header";
import Navbar from "./components/Navbar"
import Movies from "./components/Pages/Movies";
import Search from "./components/Pages/Search";
import Trending from "./components/Pages/Trending";
import TvSeries from "./components/Pages/TvSeries";
import "./css/app.css"

function App() {
  return (
    <BrowserRouter>
      <Header/>
        <div className="app">
          <Container>
            <Switch>
              <Route path="/movies" component={Movies}/>
              <Route path="/tv_series" component={TvSeries}/>
              <Route path="/search" component={Search}/>
              <Route path="/" exact component={Trending}/>
            </Switch>
          </Container>
        </div>
      <Navbar/>
    </BrowserRouter>
  );
}

export default App;
