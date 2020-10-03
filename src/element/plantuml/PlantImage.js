import React from 'react';
import PropTypes from 'prop-types';
export default function PlantImage({ src, title }) {
  return (
    <div>
      <img alt={title ? title : "Plant UML Diagram"} src={src} width="100%" />;
    </div>
  );
};
PlantImage.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string
}