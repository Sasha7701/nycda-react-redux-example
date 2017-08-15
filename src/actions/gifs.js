import GiphyAPI from "util/giphyApi";

export function searchGifs(q) {
	return (dispatch) => {
		dispatch({ type: "GIFS_SEARCH_START" });

		GiphyAPI.get("/gifs/search", {
			args: { q },
		}).then((res) => {
			if (res.data) {
				dispatch({
					type: "GIFS_SEARCH_SUCCESS",
					gifs: res.data,
				});
			}
			else {
				dispatch({
					type: "GIFS_SEARCH_FAILURE",
					error: "Search failed!",
				});
			}
		}).catch((err) => {
			dispatch({
				type: "GIFS_SEARCH_FAILURE",
				error: "Something went wrong, please refresh and try again",
			});
		});
	};
}

export function loadGif(id) {
	return (dispatch, getStore) => {
		const { gifs } = getStore().gifs;

		// First check if we have the gif. If we do, serve it right away!
		const cachedGif = gifs.find((gif) => gif.id === id);
		if (cachedGif) {
			return dispatch({
				type: "GIFS_LOAD_SUCCESS",
				gif: cachedGif,
			});
		}

		// Otherwise, request it
		dispatch({ type: "GIFS_LOAD_START" });

		GiphyAPI.get(`/gifs/${id}`).then((res) => {
			if (res.data && res.data.id) {
				dispatch({
					type: "GIFS_LOAD_SUCCESS",
					gif: res.data,
				});
			}
			else {
				dispatch({
					type: "GIFS_LOAD_FAILURE",
					error: "Unable to find that gif",
				});
			}
		}).catch(() => {
			dispatch({
				type: "GIFS_LOAD_FAILURE",
				error: "Something went wrong, please refresh and try again",
			});
		});
	};
}
