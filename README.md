## Connector for web3 wallets

`npm i tech-web3-connector`

## GitHub Pages

`https://techbandorg.github.io/web3ConnectorNPM/`

## Example Code

`https://github.com/techbandorg/web3ConnectorNPM/tree/example-web3Connect`

### Usage

`import { ConnectButton, setStyles , useSignMessage , useConnectors} from "tech-web3-connector"` - returns balance and address of user wallet , message signing function

For styling `ConnectButton` - for styling use style extension styled-components.

`setStyles` - hook for classnames styling a ModalWallet
`useSignMessage` - takes a string , returns boolean if the signature took place
`useConnectors` - accepts a list extension object chaunID : Rpc-Url .

### Default ChainIds

`supportedChainIds: [1, 3, 4, 5, 42, 56, 97]`

### Supported Wallets

```
MetaMask
CoinBase
Fortmatic
WalletConnect ( Trust , SafePal ...)
```

### use case `setStyles` `ConnectButton` `useSignMessage` `useConnectors`

```
// App.jsx

import { ConnectButton, setStyles , useSignMessage, useConnectors } from "tech-web3-connector";


const customStyles = {
  // styled modal
  modalBackdrop: {},
  modalContainer: {},
  modalBtnClose: {},
  modalConnectorsContainer: { "background-color": "color" }, // example code
  modalConnectorsItem: {},
  modalBtnProvider: {},
  modalNameWallet: {color: "color"}, // example code

  // styled Button
  BtnBase:{},
  BtnContainer:{},
  BtnAdress:{},
  SpanBalance{},
  BtnLogout:{},
};

const rpcObj = {
    chainID<number>: "https:// ... ",
    chainID<number>: "https:// ... ",
    chainID<number>: "https:// ... ",
     ...
  };

function App() {

  setStyles(customStyles);

  const { signMessage, isVerify } = useSignMessage();
  const { setRpcObj} = useConnectors();

  useEffect(() => {

    if (!isVerify) {
      signMessage("TEST");
    }

   setRpcObj({ ...rpcObj });

  }, [isVerify]);

  return (
      <>
         <ConnectButton />
      </>
  );
}


```

`We need to create a provider in the file index.jsx`

```
import React from "react";
import ReactDOM from "react-dom";
import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";
import App from "./App";


function getLibrary(provider: any) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <App />
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
```

## Web3 and Create-react-app

If you are using create-react-app version >=5 you may run into issues building. This is because NodeJS polyfills are not included in the latest version of create-react-app.

`Install react-app-rewired and the missing modules`

```
yarn add --dev react-app-rewired process crypto-browserify stream-browserify assert stream-http https-browserify os-browserify url buffer
```

```
npm install --save-dev react-app-rewired crypto-browserify stream-browserify assert stream-http https-browserify os-browserify url buffer process
```

`Create `config-overrides.js` in the root of your project folder with the content:`

```
const webpack = require('webpack');

module.exports = function override(config) {
    const fallback = config.resolve.fallback || {};
    Object.assign(fallback, {
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify"),
        "assert": require.resolve("assert"),
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify"),
        "os": require.resolve("os-browserify"),
        "url": require.resolve("url")
    })
    config.resolve.fallback = fallback;
    config.ignoreWarnings = [/node_module/];
    config.plugins = (config.plugins || []).concat([
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer']
        })
    ])
    return config;
}
```

`Within package.json change the scripts field for start, build and test. Instead of react-scripts replace it with react-app-rewired`

```
"scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-scripts eject"
},
```
