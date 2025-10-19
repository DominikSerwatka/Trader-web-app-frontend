import React from 'react';
import PropTypes from 'prop-types';

function CollectionCard({ children, bg = 'bg-white' }) {
  return <div className={`${bg} rounded-xl shadow-lg w-72 shrink-0`}>{children}</div>;
}

export default CollectionCard;

CollectionCard.propTypes = {
  children: PropTypes.node.isRequired,
  bg: PropTypes.string,
};
