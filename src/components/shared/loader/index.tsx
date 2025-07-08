import type { FC } from 'react';

import './style.css';

const Loader: FC = () => {
  return (
    <div className="loading-container">
      <div className="loader" />
    </div>
  );
};

export default Loader;
