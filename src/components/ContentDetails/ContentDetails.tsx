import React from 'react';
import ReactPlayer from 'react-player';
import { CalendarOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../Loader';
import { BASE_IMG_URL } from '../../common/constants';
import { getVideoUrls } from '../../common/helpers';
import { Video } from '../../common/types';

interface Props {
  loading: boolean,
  name: string,
  overview: string,
  poster: string,
  videoList: Video[],
  date: string,
}

export const ContentDetails = ({
  loading, videoList, name, overview, poster, date,
}: Props): JSX.Element => {
  const navigate = useNavigate();

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="content">
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
      <span className="go-back" role="button" tabIndex={0} onClick={() => navigate(-1)}>{'<- Back'}</span>
      {videoList.length > 0 ? <ReactPlayer style={{ padding: '10px' }} controls width="100%" url={getVideoUrls(videoList)} />
        : <img className="content-img" src={`${BASE_IMG_URL}${poster}`} alt="poster" /> }
      <div className="content-info">
        <span className="content-name">{name}</span>
        <span className="content-date">
          <CalendarOutlined />
          {' '}
          {date}
        </span>
      </div>
      <span className="content-description">{overview}</span>
    </div>
  );
};
