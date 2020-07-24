import React, { Fragment, useContext, useEffect } from "react";
import { Store } from "./store";
import { IEpisode } from "./interfaces";

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

  const toggleFavAction = (episode: IEpisode): void => {
    const episodeInFav = state.favourites.includes(episode);
    let dispatchObj = {
      type: "ADD_FAV",
      payload: episode,
    };
    if (episodeInFav) {
      const favWithoutEpisode = state.favourites.filter(
        (fav: IEpisode) => fav.id !== episode.id
      );
      dispatchObj = {
        type: "REMOVE_FAV",
        payload: favWithoutEpisode,
      };
    }
    dispatch(dispatchObj);
  };

  return (
    <Fragment>
      <header className="header">
        <h1>Rick and Morty Episode Picker</h1>
        <p>Fav(s): {state.favourites.length}</p>
      </header>
      <section className="episode-layout">
        {state.episodes.map((episode: IEpisode) => {
          return (
            <section key={episode.id} className="episode-box">
              <img
                src={episode.image.medium}
                alt={`Rick and mort${episode.name}`}
              />
              <div>{episode.name}</div>
              <section>
                <div>
                  {" "}
                  Season:{episode.season}Number:{episode.number}
                </div>
                <button type="button" onClick={() => toggleFavAction(episode)}>
                  {state.favourites.find(
                    (fav: IEpisode) => fav.id === episode.id
                  )
                    ? "Unfav"
                    : "Fav"}
                </button>
              </section>
            </section>
          );
        })}
      </section>
    </Fragment>
  );
}

export default App;
