import React, { useContext, useEffect, lazy, Suspense } from "react";
import { IEpisodeprops } from "./interfaces";
import { Store } from "./store";
import { fetchDataAction, toggleFavAction } from "./actions";

const EpisodesList = lazy<any>(() => import("./EpisodesList"));
function HomePage() {
  const { state, dispatch } = useContext(Store);

  useEffect(() => {
    state.episodes.length === 0 && fetchDataAction(dispatch);
  });

  const props: IEpisodeprops = {
    episodes: state.episodes,
    store: { state, dispatch },
    toggleFavAction,
    favourites: state.favourites,
  };
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <section className="episode-layout">
          <EpisodesList {...props} />
        </section>
      </Suspense>
    </div>
  );
}

export default HomePage;
