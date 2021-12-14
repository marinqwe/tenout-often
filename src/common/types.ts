export interface MovieListItem {
  title: string,
  rating: number,
  releaseDate: string,
  id: number,
  cardImage: string
}

export interface Movie {
  title: string,
  overview: string,
  poster: string,
  videos: Video[],
  releaseDate: string,
}

export interface TvShowListItem {
  name: string,
  rating: number,
  airDate: string,
  id: number,
  cardImage: string
}

export interface TvShow {
  name: string,
  overview: string,
  poster: string,
  videos: Video[],
  airDate: string
}

export interface Video {
  key: string,
}
