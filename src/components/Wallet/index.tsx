import {useParams} from 'react-router-dom';
import {PathParams} from '../../types';

function Wallet() {
  const {addr} = useParams<PathParams>();

  return(
    <>
      {addr}
    </>
  );
}

export default Wallet;