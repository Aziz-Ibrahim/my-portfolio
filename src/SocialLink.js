import React from 'react';
import { Anchor } from '@mantine/core';

const SocialLink = ({ link, iconMap }) => (
  <Anchor
    href={link.href}
    target="_blank"
    rel="noopener noreferrer"
    className="social-link"
    aria-label={link.icon}
  >
    {React.createElement(iconMap[link.icon], { size: 30 })}
  </Anchor>
);

export default SocialLink;
