import { useContext, useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import arweave from '../../api/arweave';
import { GlobalStorage, getGlobalStorageOfWallet } from '../../arweave-globalstorage/lib';
import {PathParams} from '../../types';
import { ButtonS, CenteredS, JsonS } from '../../style/components/common';
import { ctx } from '../../utils';

function Wallet() {
  const {addr} = useParams<PathParams>();
  const {walletAddr} = useContext(ctx);
  const [globalAccountResult, setGlobalAccountResult] = useState<string | null>(null);
  const [globalAccountStatus, setGlobalAccountStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("useEffect");
    (async () => {
      setLoading(true);
      if(/^[a-zA-Z0-9\-_]{43}$/.test(addr.trim())){
        const walletStorage = await getGlobalStorageOfWallet(addr, arweave);
        setGlobalAccountStatus(walletStorage.status);
        setGlobalAccountResult(walletStorage.status !== "error" ? JSON.stringify(walletStorage.result, null, 2) : walletStorage.result);
      }
      
      setLoading(false);
    })()

    return () => {
      setGlobalAccountStatus(null);
      setGlobalAccountResult(null);
    }
  }, [addr]);

  const activateGlobalAccount = async () => {
    const globalstorage = new GlobalStorage("Global-Account", arweave);
    const isActivated = await globalstorage.activate();
    console.log(isActivated);
  };

  return(
    <>
      <h1>Global Account</h1>
      <h2><pre>{addr}</pre></h2>
      {loading ? "loading" :
        globalAccountStatus ?
        <>
          <div>
            {globalAccountStatus === "error" && <>Status: [Error] - {globalAccountResult}</>}
            {globalAccountStatus === "pending" && <>Status: [Warning] - This user's Global Account was recently reset and its last state has not been confirmed by the network yet.</>}
          </div>
          {globalAccountStatus !== "error" && <>
            <div>Result: </div>
            <JsonS>{globalAccountResult}</JsonS>
          </>}
          <CenteredS>
            {addr === walletAddr && 
              <ButtonS onClick={activateGlobalAccount}>
                {globalAccountStatus === "error" ? "Activate your Global Account" : "Reset your Global Account"}
              </ButtonS>
            }
          </CenteredS>
        </>
        : "Invalid wallet address"
      }
    </>
  );
}

export default Wallet;