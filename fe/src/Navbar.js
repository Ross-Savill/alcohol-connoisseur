import React, { useEffect, useState } from "react";
import './Navbar.css';
import Maps from './MapFolder/Maps';
import { NavLink } from "react-router-dom";
import axios from "axios";
const DRINKS_URL = "http://localhost:5000/drinks";
const DRINKERS_URL = "http://localhost:5000/peopleNames";

// const componentDidMount = () => {
//   axios.all([requestDrinkers, requestDrinks])
//     .then(resp => this.setState({ drinkers: resp[0].data,
//                                   drinks: resp[1].data }))
//     .catch(error => console.log(error))
// }

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
  const [drinkData, setDrinkData] = useState({drinks: [], isFetching: false});
  const [drinkerData, setDrinkerData] = useState({drinkers: [], isFetching: false});

  useEffect(() => {
    const fetchDrinks = async () => {
        try {
            setDrinkData({drinks: drinkData.drinks, isFetching: true});
            const response = await axios.get(DRINKS_URL);
            setDrinkData({drinks: response.data, isFetching: false});
        } catch (e) {
            console.log(e);
            setDrinkData({drinks: drinkData.drinks, isFetching: false});
        }
    };
    fetchDrinks();
  }, []);

  useEffect(() => {
    const fetchDrinkers = async () => {
        try {
            setDrinkerData({drinkers: drinkerData.drinkers, isFetching: true});
            const response = await axios.get(DRINKERS_URL);
            setDrinkerData({drinkers: response.data, isFetching: false});
        } catch (e) {
            console.log(e);
            setDrinkerData({drinkers: drinkerData.drinkers, isFetching: false});
        }
    };
    fetchDrinkers();
  }, []);

  return (
  	<nav
      className="navbar is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
      <div className="navbar-brand">
          <a
            role="button"
            className={`navbar-burger burger ${isOpen && "is-active"}`}
            aria-label="menu"
            aria-expanded="false"
            onClick={() => setOpen(!isOpen)}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div className={`navbar-menu ${isOpen && "is-active"}`}>
          <div className="navbar-start">
            <NavLink
              className="navbar-item"
              activeClassName="is-active" to="/">
              Main Table
            </NavLink>

            <NavLink
              className="navbar-item"
              activeClassName="is-active"
              to="/drinkers">
              Drinkers
            </NavLink>

            <NavLink
              className="navbar-item"
              activeClassName="is-active"
              to="/ratingwords">
              Rating Words
            </NavLink>

            <NavLink
              className="navbar-item"
              activeClassName="is-active"
              to="/maps"
              render={(props) => (
                <Maps {...props}
                drinks={drinkData}
                drinkers={drinkerData}
                isFetching={drinkData.isFetching} />
              )}
            >
              Drink Geography
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
 };


  export default Navbar;