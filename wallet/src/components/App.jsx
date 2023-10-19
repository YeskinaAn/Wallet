import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginPage from "../pages/Login";
import Costs from '../pages/Costs';
import Expenses from "../pages/Expenses";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/costs" component={Costs} />
        <Route path="/expenses" component={Expenses} />
        <Route exact path="/" component={LoginPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
