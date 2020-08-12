import React from 'react';

import NoteLine from './NoteLine';

const BackgroundLine = () => {
  const items = [
    <NoteLine xPos={40} key={`NoteLine_${40}`} />,
    <NoteLine xPos={90} key={`NoteLine_${90}`} />,
  ];

  let _xPos = 90;

  for (let idx = 0; idx < 14; idx++) {
    idx % 2 === 0 ? (_xPos += 74) : (_xPos += 99);
    items.push(<NoteLine xPos={_xPos} key={`NoteLine_${_xPos}`} />);
  }
  return <>{items}</>;
};

export default BackgroundLine;
