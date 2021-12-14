import axios from 'axios';
import { MovieListItem, Movie } from '../types';

const { REACT_APP_API_KEY } = process.env;

class MovieApi {
  baseUrl;

  apiKey;

  constructor(baseApiUrl: string) {
    this.baseUrl = `${baseApiUrl}`;
    this.apiKey = `api_key=${REACT_APP_API_KEY}`;
  }

  async get(): Promise<MovieListItem[]> {
    const res = await axios.get(`${this.baseUrl}/movie/top_rated?${this.apiKey}`);
    const { results } = res.data;

    return results.slice(0, 10).map((movie: any) => ({
      title: movie.title,
      rating: movie.vote_average,
      releaseDate: movie.release_date,
      id: movie.id,
      cardImage: movie.backdrop_path,
    }));
  }

  async find(id: number): Promise<Movie> {
    const { data } = await axios.get(`${this.baseUrl}/movie/${id}?${this.apiKey}&append_to_response=videos`);

    return {
      title: data.title,
      overview: data.overview,
      poster: data.poster_path,
      videos: data.videos.results,
      releaseDate: data.release_date,
    };
  }

  async search(query: string): Promise<MovieListItem[]> {
    const { data } = await axios.get(`${this.baseUrl}/search/movie?${this.apiKey}&query=${query}`);

    return data.results.map((movie: any) => ({
      title: movie.title,
      rating: movie.vote_average,
      releaseDate: movie.release_date,
      id: movie.id,
      cardImage: movie.backdrop_path,
    }));
  }
}
export { MovieApi };
