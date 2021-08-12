import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Provider } from "react-redux";
import { createGlobalStyle } from "styled-components";
import { useStore } from "../redux/store";
import "../styles/globals.css";

export const serverUrl =
  process.env.NODE_ENV === "development"
    ? `http://localhost:4000`
    : "https://lead-gen.herokuapp.com";

console.log("node env", process.env.NODE_ENV);

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("@auth_token");
  // console.log("token?", token);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const urlLink = new HttpLink({
  uri: `${serverUrl}/graphql`,
  credentials: "same-origin",
});

const client = new ApolloClient({
  link: authLink.concat(urlLink),
  cache: new InMemoryCache(),
});

const GlobalStyle = createGlobalStyle`
  html{
  box-sizing: border-box;
  background: #F5F4F0;
  margin:0 auto;
  padding: 0;
}

body{
  min-height:100vh;
  margin-top:0;
}
`;

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <>
      <GlobalStyle />
      <ApolloProvider client={client}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
