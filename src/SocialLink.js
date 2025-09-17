import React, { useState } from 'react';
import { Anchor, Box, useMantineTheme } from '@mantine/core';

const SocialLink = ({ link, iconMap }) => {
  const theme = useMantineTheme();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Anchor
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Box
        sx={{
          color: isHovered ? theme.colors.blue[6] : theme.colors.dimmed,
          transform: isHovered ? 'scale(1.2)' : 'scale(1.0)',
          transition: 'transform 0.2s, color 0.2s',
        }}
      >
        {React.createElement(iconMap[link.icon], { size: 32 })}
      </Box>
    </Anchor>
  );
};

export default SocialLink;