import React, { Fragment, useContext } from "react";
import { Link } from "@reach/router";

import { Store } from "./store";

function App(props: any): JSX.Element {
  const { state } = useContext(Store);

  return (
    <Fragment>
      <header className="header">
        <h1>Rick and Morty Episode Picker</h1>
        <Link to="/">Home</Link>
        <Link to="/favs">Fav(s): {state.favourites.length}</Link>
      </header>
      {props.children}
    </Fragment>
  );
}

export default App;
