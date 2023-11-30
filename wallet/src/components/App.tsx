import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginPage from "../pages/Login";
import Statistics from "../pages/Statistics";
import History from "../pages/History";

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/statistics" component={Statistics} />
        <Route path="/history" component={History} />
        <Route exact path="/" component={LoginPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
