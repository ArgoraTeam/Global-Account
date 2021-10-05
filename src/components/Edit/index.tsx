import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import arweave from "../../api/arweave";
import { GlobalStorage } from "../../arweave-globalstorage/lib";
import { PathParams } from "../../types";

function Edit(){
  const {AppName} = useParams<PathParams>();
  const [isInitialized, setIsInitialized] = useState<boolean>();
  const [items, setItems] = useState<{key: string, value: string | null}[]>();

  useEffect(() => {
    const globalstorage = new GlobalStorage(AppName, arweave);
    (async () => {
      if(await globalstorage.init()){
        setIsInitialized(true);
        globalstorage.setItem("testkey", "testvalue");
        await globalstorage.sync();
        setItems(globalstorage.getItems());
      }
      else
        setIsInitialized(false);
    })()
  }, [AppName])

  return(<>
    <h1>{AppName}</h1>
    {isInitialized ? <>Initialized</> : <>Not Initialized</>}
    <table>
      <thead>
        <tr>
          <td>key</td>
          <td>localStorage value</td>
          <td>globalStorage value</td>
        </tr>
      </thead>
      <tbody>
        {items?.map((item, i) => <tr key={i}>
          <td>{item.key}</td>
          <td>{item.value}</td>
          <td></td>
        </tr>)}
      </tbody>
    </table>
  </>);
}

export default Edit;