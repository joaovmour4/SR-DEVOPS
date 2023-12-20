import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const icons = ({ icon, label, ...props }) => {
  return (
    <div {...props}>
      <FontAwesomeIcon icon={icon} className="mr-2" />
      {label && <span>{label}</span>}
    </div>
  );
};

export default icons;