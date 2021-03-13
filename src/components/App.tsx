import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import { DataContextProvider } from "../context";
import "../styles/App.scss";
import Form from "./Form";
import CovidInfo from "./CovidInfo";


function App() {
  return (
    <div className="main">
      <DataContextProvider>
        <Router>
          <Switch>
            <Route exact path={ROUTES.FORM} component={Form} />
            <Route path={ROUTES.COVID_INFO} component={CovidInfo} />
          </Switch>
        </Router>
      </DataContextProvider>
    </div>
  );
}

export default App;
