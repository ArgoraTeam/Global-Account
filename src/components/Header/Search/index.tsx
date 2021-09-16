import React, {useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {FormS, ButtonS, InputS} from "../../../style/components/Header";
import {PathParams} from "../../../types";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRocket } from '@fortawesome/free-solid-svg-icons'

function Search({className}: {className?: string}) {
  const history = useHistory();
  const {pathBase} = useParams<PathParams>();
  const [value, setValue] = useState<string>("");

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value.trimStart();
    setValue(val);
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const submitted = value.trim();
    if(submitted.length > 0){
      history.push(`/${pathBase}/${submitted}`);
    }
  }

  return(
    <FormS onSubmit={handleSubmit} className={className}>
      <InputS
        onChange={handleChange}
        value={value}
        placeholder={"Search a wallet"}
      />
      <ButtonS onClick={handleSubmit}>
        <FontAwesomeIcon icon={faRocket} />
      </ButtonS>
    </FormS>
  );
}

export default Search;