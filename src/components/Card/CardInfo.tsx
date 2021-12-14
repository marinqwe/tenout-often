import React from 'react';
import { StarOutlined } from '@ant-design/icons';

interface Props {
  name: string,
  date: string,
  rating: number
}

export const CardInfo = ({ name, date, rating }: Props): JSX.Element => (
  <div className="cardInfo">
    <span className="cardInfoName">
      {' '}
      {name}
      {' '}
    </span>
    <span className="cardInfoRating">
      <StarOutlined />
      {' '}
      {`${rating} / 10`}
    </span>
  </div>
);
