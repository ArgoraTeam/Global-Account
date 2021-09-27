import { useContext, useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import arweave from '../../api/arweave';
import { GlobalStorage, getGlobalStorageOfWallet, T_GlobalStorage } from 'arweave-globalstorage';
import {PathParams} from '../../types';
import { ButtonS, CenteredS, JsonS } from '../../style/components/common';
import { ctx } from '../../utils';
import Table from './Table';

function Wallet() {
  const {addr} = useParams<PathParams>();
  const {walletAddr} = useContext(ctx);
  const [globalAccount, setGlobalAccount] = useState<T_GlobalStorage | null>();
  const [globalAccountStatus, setGlobalAccountStatus] = useState<string | null>(null);
  const [globalAccountDescription, setGlobalAccountDescription] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("useEffect");
    (async () => {
      setLoading(true);
      if(/^[a-zA-Z0-9\-_]{43}$/.test(addr.trim())){
        const walletStorage = await getGlobalStorageOfWallet(addr, arweave);
        setGlobalAccount(walletStorage.result);
        setGlobalAccountStatus(walletStorage.status);
        setGlobalAccountDescription(walletStorage.description);
      }
      
      setLoading(false);
    })()

    return () => {
      setGlobalAccountStatus(null);
    }
  }, [addr]);

  const activateGlobalAccount = async () => {
    const globalstorage = new GlobalStorage("Global-Account", arweave);
    await globalstorage.activate();
  };

  return(
    <>
      <h1>Global Account</h1>
      <h2><pre>{addr}</pre></h2>
      {loading ? "loading" :
        globalAccountStatus ?
        <>
          <CenteredS>
            {addr === walletAddr && 
              <ButtonS onClick={activateGlobalAccount}>
                {globalAccountStatus === "error" ? "Activate your Global Account" : "Reset your Global Account"}
              </ButtonS>
            }
          </CenteredS>
          <div>Status: [{globalAccountStatus}] - {globalAccountDescription}</div>
          {globalAccountStatus !== "error" && <>
            <div>Result: </div>
            <JsonS>{JSON.stringify(globalAccount, null, 2)}</JsonS>
            {globalAccount && globalAccount.apps.map((app, i) => <Table key={i} app={app} />)}
          </>}
        </>
        : "Invalid wallet address"
      }
    </>
  );
}

export default Wallet;