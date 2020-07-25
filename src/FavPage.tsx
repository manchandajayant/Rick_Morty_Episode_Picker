import React, { useContext, Suspense, lazy } from "react";
import { Store } from "./store";
import { toggleFavAction } from "./actions";
import { IEpisodeprops } from "./interfaces";

const EpisodesList = lazy<any>(() => import("./EpisodesList"));

export default function FavPage(): JSX.Element {
  const { state, dispatch } = useContext(Store);

  const props: IEpisodeprops = {
    episodes: state.favourites,
    store: { state, dispatch },
    toggleFavAction,
    favourites: state.favourites,
  };
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="episode-layout">
        <EpisodesList {...props} />
      </div>
    </Suspense>
  );
}
