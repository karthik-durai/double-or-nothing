import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import "bootstrap/dist/css/bootstrap.css";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { reducer } from "./store/store";

function App() {
  const store = createStore(reducer);

  store.subscribe(() => {
    const { users } = store.getState();
    localStorage.setItem("state", JSON.stringify(users));
  });

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
