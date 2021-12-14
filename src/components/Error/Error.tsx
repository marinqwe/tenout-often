import React from 'react';

interface Props {
  errorMessage: string | null
}

export const Error = ({ errorMessage }: Props): JSX.Element => (
  <div className="error">
    <span>An error occured: </span>
    <span>
      {errorMessage}
    </span>
  </div>
);
