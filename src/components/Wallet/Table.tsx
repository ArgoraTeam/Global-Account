import {T_GlobalStorageApp} from 'arweave-globalstorage';

function Table({app}: {app: T_GlobalStorageApp}){
  return(<>
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