import React from "react";
import { IEpisode } from "./interfaces";

export default function EpisodesList(props: any): void {
  const { episodes, toggleFavAction, favourites, store } = props;
  const { state, dispatch } = store;
  console.log(episodes);

  return episodes.map((episode: IEpisode) => {
    const onclick = () => {
      toggleFavAction(state, episode, dispatch);
    };
    return (
      <section key={episode.id} className="episode-box">
        <img src={episode.image.medium} alt={`Rick and morty${episode.name}`} />
        <div>{episode.name}</div>
        <section style={{ display: "flex", justifyContent: "spaceBetween" }}>
          <div>
            {" "}
            Season:{episode.season}Number:{episode.number}
          </div>
          <button type="button" onClick={onclick}>
            {favourites.find((fav: IEpisode) => fav.id === episode.id)
              ? "Unfav"
              : "Fav"}
          </button>
        </section>
      </section>
    );
  });
}
