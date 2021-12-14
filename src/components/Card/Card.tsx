import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CardInfo } from '.';
import { BASE_IMG_URL } from '../../common/constants';
import placeholderMovieImage from './images/placeholder.jpg';

type cardNode = {
  id: number,
  name: string,
  date: string,
  rating: number,
  image: string
}

interface Props {
  card: cardNode,
  navString: string
}

export const Card = ({
  card: {
    id, name, date, rating, image,
  }, navString,
}: Props): JSX.Element => {
  const navigate = useNavigate();

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div className="card" role="button" tabIndex={0} onClick={() => navigate(`/${navString}/${id}`)}>
      <img
        className="cardImg"
        src={image ? `${BASE_IMG_URL}${image}` : placeholderMovieImage}
        alt="movieImage"
      />
      <CardInfo name={name} date={date} rating={rating} />
    </div>
  );
};
