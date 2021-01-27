import React from 'react';
import { Spinner } from "reactstrap";

const LoadingSpin = () => {

  return(
    <Spinner color="success" style={{"height": "200px", "width": "200px"}} />
  )
}

export default LoadingSpin;