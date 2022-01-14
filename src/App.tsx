// @ts-nocheck
import { Component } from "react"

import store, { persistor } from "./reduxStore/store"
import { Provider } from "react-redux"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { PersistGate } from "redux-persist/integration/react"

import "bootstrap/dist/css/bootstrap.min.css"
import Home from "./pages/home"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Book from "./pages/book"
import BookConfirm from "./pages/book/BookConfirm"

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Header />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/book" component={Book} />
              <Route exact path="/book-confirm" component={BookConfirm} />
            </Switch>
            <Footer />
          </Router>
        </PersistGate>
      </Provider>
    )
  }
}

export default App
