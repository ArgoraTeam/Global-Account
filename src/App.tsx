import { useEffect, useState } from 'react';
import {Router, Switch, Route} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import { ctx } from './utils';

import { ThemeProvider } from 'styled-components';
import GlobalStyles from './style/global';
import {light, dark} from './style/themes';
import Header from './components/Header';
import DevMode from './components/ui/DevMode';
import AppBarBottom from './components/Header/AppBarBottom';
import Wallet from './components/Wallet';
import Main from './components/Main';
import Edit from './components/Edit';

const history = createBrowserHistory();

function App() {
  const [walletAddr, updateWalletAddr] = useState("");
  const setWalletAddr = (addr: string) => {
    updateWalletAddr(addr);
  }

  const [theme, updateTheme] = useState(true);
  const setTheme = (t: boolean) => {
    updateTheme(t);
  }

  const walletSwitch = (event: any) => {
    console.log("listener");
    setWalletAddr(event.detail.address);
  }

  useEffect(() => {
    window.addEventListener("walletSwitch", walletSwitch);
    return () => window.removeEventListener("walletSwitch", walletSwitch);
  })

  return (
    <ctx.Provider value={{
      walletAddr, setWalletAddr, 
      theme, setTheme
    }}>
      <ThemeProvider theme={theme ? light : dark}>
        <GlobalStyles />
        <main>
          <Router history={history}>
            <Switch>
              <Route exact path='/'><Header /><DevMode /></Route>
              <Route exact path='/:pathBase/edit'><Header /><Edit /></Route>
              <Route exact path='/:pathBase/edit/:AppName'><Header /><Edit /></Route>
              <Route exact path='/:pathBase/:addr'><Header /><Wallet /><AppBarBottom /></Route>
              <Route exact path='/:pathBase'><Header /><Main /><AppBarBottom /></Route>
            </Switch>
          </Router>
        </main>
      </ThemeProvider>
    </ctx.Provider>
  );
}

export default App;
