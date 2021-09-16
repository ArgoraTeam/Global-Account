import {useParams} from 'react-router-dom';
import {PathParams} from '../../types';

function Profile() {
  const {addr} = useParams<PathParams>();

  return(
    <>
      {addr}
    </>
  );
}

export default Profile;