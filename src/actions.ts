import { IEpisode, IState } from "./interfaces";

export const fetchDataAction = async (dispatch: any) => {
  const url =
    "https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes";

  const data = await fetch(url);
  const dataJSON = await data.json();
  return dispatch({
    type: "FETCH_DATA",
    payload: dataJSON._embedded.episodes,
  });
};

export const toggleFavAction = (
  state: IState,
  episode: IEpisode | any,
  dispatch: any
): void => {
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
