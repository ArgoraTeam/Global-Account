import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import arweave from '../../api/arweave';
import { getGlobalStorageOfWallet } from '../../arweave-globalstorage/lib';
import {PathParams} from '../../types';

function Wallet() {
  const {addr} = useParams<PathParams>();
  const [globalAccount, setGlobalAccount] = useState<string | null>();

  useEffect(() => {
    (async () => {
      if(/^[a-zA-Z0-9\-_]{43}$/.test(addr.trim())){
        const walletStorage = await getGlobalStorageOfWallet(addr, arweave);
        setGlobalAccount(walletStorage);
      }
      else
        setGlobalAccount("invalid wallet address");
    })()
  });

  return(
    <>
      <div>wallet: {addr}</div>
      <div>Global Account: {globalAccount ? globalAccount : "This user haven't activated their Global Account yet."}</div>
    </>
  );
}

export default Wallet;