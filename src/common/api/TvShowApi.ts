import axios from 'axios';
import { TvShowListItem, TvShow } from '../types';

const { REACT_APP_API_KEY } = process.env;

class TvShowApi {
  baseUrl;

  apiKey;

  constructor(baseApiUrl: string) {
    this.baseUrl = `${baseApiUrl}`;
    this.apiKey = `api_key=${REACT_APP_API_KEY}`;
  }

  async get(): Promise<TvShowListItem[]> {
    const res = await axios.get(`${this.baseUrl}/tv/top_rated?${this.apiKey}`);
    const { results } = res.data;

    const showsToReturn: TvShowListItem[] = results.slice(0, 10).map((show: any) => ({
      name: show.name,
      rating: show.vote_average,
      airDate: show.first_air_date,
      id: show.id,
      cardImage: show.backdrop_path,
    }));

    return showsToReturn;
  }

  async find(id: number): Promise<TvShow> {
    const { data } = await axios.get(`${this.baseUrl}/tv/${id}?${this.apiKey}&append_to_response=videos`);

    return {
      name: data.name,
      overview: data.overview,
      poster: data.poster_path,
      videos: data.videos.results,
      airDate: data.first_air_date,
    };
  }

  async search(query: string): Promise<TvShowListItem[]> {
    const { data } = await axios.get(`${this.baseUrl}/search/tv?${this.apiKey}&query=${query}`);

    return data.results.map((show: any) => ({
      name: show.name,
      rating: show.vote_average,
      airDate: show.first_air_date,
      id: show.id,
      cardImage: show.backdrop_path,
    }));
  }
}
export { TvShowApi };
