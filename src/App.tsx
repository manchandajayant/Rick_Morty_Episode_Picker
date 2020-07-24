import React, { Fragment, useContext, useEffect } from "react";
import { Store } from "./store";

function App(): JSX.Element {
  const { state, dispatch } = useContext(Store);

  const fetchDataAction = async () => {
    const url =
      "https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes";

    const data = await fetch(url);
    const dataJSON = await data.json();
    return dispatch({
      type: "FETCH_DATA",
      payload: dataJSON._embedded.episodes,
    });
  };
  useEffect(() => {
    state.episodes.length === 0 && fetchDataAction();
  });
  return (
    <Fragment>
      <h1>Rick and Morty Episode Picker</h1>
      <p>Pick one</p>

      <section>
        {state.episodes.map((episode: any) => {
          return (
            <section key={episode.id}>
              <img
                src={episode.image.medium}
                alt={`Rick and mort${episode.name}`}
              />
              <div>{episode.name}</div>
              <section>
                Season:{episode.season}Number:{episode.number}
              </section>
            </section>
          );
        })}
      </section>
    </Fragment>
  );
}

export default App;
