// @ts-nocheck
import { Component } from "react";

import store, { persistor } from "./reduxStore/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

import Home from "./pages/home";
import Book from "./pages/book";
import BookConfirm from "./pages/book/BookConfirm";
import Login from './pages/login'
import DashboardAdmin from "./pages/admin"

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/book" component={Book} />
              <Route exact path="/book-confirm" component={BookConfirm} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/admin/dashboard" component={DashboardAdmin} />
            </Switch>
          </Router>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
