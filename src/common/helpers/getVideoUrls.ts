import { Video } from '../types';

export const getVideoUrls = (videos: Video[]): string[] => videos.map((vid) => `https://www.youtube.com/watch?v=${vid.key}`);
