// pages/_app.js
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import store from "../src/redux/store";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
