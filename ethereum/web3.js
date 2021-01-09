import Web3 from "web3";

// window variable is not defined with next.js, because it uses serverside (nextjs-server side)
// rendering - whereas the window object is coming only from the browser

// const web3 = new Web3(window.web3.currentProvider);

// what is the advantage of next.js then?
// inside next.js server we can fetch data from the ethereum network
// --> enables us to show data about campaigns and vote NO MATTER WHETHER USERS
// HAVE METAMASK INSTALLED OR NOT - that is the big advanted of using next.js' serverside rendering

let provider;
if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  // we are in the browser and metamask is running
  provider = window.web3.currentProvider;
} else {
  // we are on the server *OR* the user is not running metamask
  provider = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/0b94c28823b04c22ac987c8e10ae9ab5"
  );
}

const web3 = new Web3(provider);
export default web3;
