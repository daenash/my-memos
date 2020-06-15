import React from "react";
import "./styles/_base.scss";
import TodosView from "./views/todos";
import Header from "./components/header";

import { ApolloProvider } from "@apollo/react-hooks";
import client from "./gql-client";

import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <div id="app">
      <ApolloProvider client={client}>
        <Provider store={store}>
          <Header></Header>
          <TodosView></TodosView>
        </Provider>
      </ApolloProvider>
    </div>
  );
}

export default App;
