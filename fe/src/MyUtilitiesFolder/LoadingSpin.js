import React from 'react';
import { Spinner } from "reactstrap";
import '../Stylesheets/MyUtilitiesSS/LoadingSpin.css';

const LoadingSpin = () => {

  return(
    <div className="loadingDiv">
      <Spinner color="success" style={{"height": "200px", "width": "200px"}} />
    </div>
  )
}

export default LoadingSpin;