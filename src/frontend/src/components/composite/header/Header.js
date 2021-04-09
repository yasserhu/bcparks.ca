import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import "./Header.css";

export const goHome = (e, history) => {
  e.stopPropagation();
  e.preventDefault();

  if (
    history.location &&
    history.location.pathname &&
    history.location.pathname === "/bcparks"
  ) {
    return false;
  }

  if (history.location.pathname === "/bcparks/error") {
    sessionStorage.clear();
    history.push("/");
    return true;
  }

  return true;
};

export default function Header({ header: { name } }) {
  const history = useHistory();

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div
          className="container-fluid navbar-brand pointer"
          onClick={(e) => goHome(e, history)}
          role="button"
          onKeyDown={(e) => goHome(e, history)}
          tabIndex={0}
        >
          <img
            className="img-fluid d-md-block"
            src={`${process.env.PUBLIC_URL}/images/bcid-logo-rev-en.svg`}
            width="181"
            height="44"
            alt="B.C. Parks Logo"
          />
          <div
            className="pointer navbar-brand nav-item nav-link"
            onClick={(e) => goHome(e, history)}
            role="button"
            onKeyDown={(e) => goHome(e, history)}
            tabIndex={0}
          >
            {name}
          </div>
        </div>
      </nav>
    </header>
  );
}

Header.propTypes = {
  header: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};
