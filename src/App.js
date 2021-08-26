import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import SearchParams from "./SearchParams";
import Details from "./Details";

const App = () => {
  return (
    <StrictMode>
      <div>
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
      </div>
    </StrictMode>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
