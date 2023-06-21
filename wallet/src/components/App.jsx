import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginPage from "./Login";
import Costs from './Costs';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/costs" component={Costs} />
        <Route exact path="/" component={LoginPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
