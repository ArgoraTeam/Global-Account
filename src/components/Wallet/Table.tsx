import { useHistory, useParams } from 'react-router-dom';
import {T_GlobalStorageApp} from '../../arweave-globalstorage/lib';
import { ButtonS } from '../../style/components/common';
import { PathParams } from '../../types';

function Table({app}: {app: T_GlobalStorageApp}){
  const history = useHistory();
  const {pathBase} = useParams<PathParams>();
  
  return(<>
    <ButtonS onClick={() => history.push(`/${pathBase}/edit/${app.name}`)}>
      Edit {app.name} globalstorage
    </ButtonS>
    <table>
      <thead>
        <tr>
          <td colSpan={2}>{app.name} - {app.timestamp}</td>
        </tr>
        <tr>
          <td>key</td>
          <td>value</td>
        </tr>
      </thead>
      <tbody>
        {app.storage.map((row, i) => 
        <tr key={i}>
          <td>{row.name}</td>
          <td>{row.value}</td>
        </tr>
        )}
      </tbody>
    </table>
  </>);
}

export default Table;