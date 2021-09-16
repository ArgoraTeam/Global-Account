import './App.css';
import {GlobalStorage, getGlobalStorageOfWallet} from './arweave-globalstorage';
import Arweave from 'arweave';
import { useEffect } from 'react';

const arweave = Arweave.init({
  host: 'arweave.net',// Hostname or IP address for a Arweave host
  port: 443,          // Port
  protocol: 'https',  // Network protocol http or https
  timeout: 20000,     // Network request timeouts in milliseconds
  logging: false,
});

function App() {
  useEffect(() => {
    (async () => {
      const walletStorage = await getGlobalStorageOfWallet(arweave, "test");
      console.log(walletStorage);
    })()
  });

  return (
    <div className="App">
      <header>
        Global Account
      </header>
    </div>
  );
}

export default App;
