import { StrictMode, useState, lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
// import SearchParams from "./SearchParams";
// import Details from "./Details";
import ThemeContext from "./ThemeContext";
// with lazy Dynamic Import
const Details = lazy(() => import("./Details"));
const SearchParams = lazy(() => import("./SearchParams"));

const App = () => {
  const themeHook = useState("darkblue");

  return (
    <StrictMode>
      <ThemeContext.Provider value={themeHook}>
        <div>
          <h2>This h2 wont go away</h2>
          <Suspense fallback={<h2>Loading route...</h2>}>
            <Router>
              <header>
                <Link to="/">
                  <h1>Adopt Me!</h1>
                </Link>
              </header>
              <Switch>
                <Route path="/details/:id" component={Details} />
                <Route path="/" component={SearchParams} />
              </Switch>
            </Router>
          </Suspense>
        </div>
      </ThemeContext.Provider>
    </StrictMode>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
