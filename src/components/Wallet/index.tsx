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
  const [globalAccount, setGlobalAccount] = useState<string | null | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("useEffect");
    (async () => {
      setLoading(true);
      if(/^[a-zA-Z0-9\-_]{43}$/.test(addr.trim())){
        const walletStorage = await getGlobalStorageOfWallet(addr, arweave);
        setGlobalAccount(walletStorage ? JSON.stringify(walletStorage, null, 2) : globalAccount);
        setLoading(false);
      }
      else
        setGlobalAccount("invalid wallet address");
    })()
  }, [addr, globalAccount]);

  const activateGlobalAccount = async () => {
    const globalstorage = new GlobalStorage("Global-Account", arweave);
    const isActivated = await globalstorage.activate();
    console.log(isActivated);
  };

  return(
    <>
      <div>wallet: {addr}</div>
      {loading ? "loading" :
      <>
        <div>Global Account: {
          globalAccount === null ? "This user haven't activated their Global Account yet." : 
            globalAccount === undefined ? "This wallet has activated or reset their Global Account recently and the tx is not confirmed yet."
          : <JsonS>{globalAccount}</JsonS>}
        </div>
        <CenteredS>
          {addr === walletAddr && 
            <ButtonS onClick={activateGlobalAccount}>
              {globalAccount !== null ? "Reset your Global Account" : "Activate your Global Account"}
            </ButtonS>
          }
        </CenteredS>
      </>}
    </>
  );
}

export default Wallet;