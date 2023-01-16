import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import App from "./App";
import { DarkModeContextProvider } from "./context/darkModeContext";
import store from "./redux/configureStore";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </DarkModeContextProvider>
  </React.StrictMode>,
);
