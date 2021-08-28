import {
  StrictMode,
  // useState
} from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import store from "./store";
import SearchParams from "./SearchParams";
import Details from "./Details";
import { Provider } from "react-redux";

const App = () => {
  // const themeHook = useState("darkblue");

  return (
    <StrictMode>
      <Provider store={store}>
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
      </Provider>
    </StrictMode>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
