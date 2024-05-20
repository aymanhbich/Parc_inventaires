import React, { useState } from 'react';
import { Group, Box, Collapse, ThemeIcon, Text, UnstyledButton } from '@mantine/core';
import { IconCalendarStats, IconChevronRight } from '@tabler/icons-react';
import classes from './NavbarLinksGroup.module.css';

function LinksGroup({ icon: Icon, label, initiallyOpened, links }) {
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const items = (hasLinks ? links : []).map(function (link) {
    return React.createElement(
      Text,
      {
        component: 'a',
        className: classes.link,
        href: link.link,
        key: link.label,
        onClick: function (event) {
          event.preventDefault();
        }
      },
      link.label
    );
  });

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      UnstyledButton,
      {
        onClick: function () {
          return setOpened(function (o) {
            return !o;
          });
        },
        className: classes.control
      },
      React.createElement(
        Group,
        { justify: 'space-between', gap: 0 },
        React.createElement(
          Box,
          { style: { display: 'flex', alignItems: 'center' } },
          React.createElement(
            ThemeIcon,
            { variant: 'light', size: 30 },
            React.createElement(Icon, { style: { width: '1rem', height: '1rem' } })
          ),
          React.createElement(Box, { ml: 'md' }, label)
        ),
        hasLinks &&
          React.createElement(IconChevronRight, {
            className: classes.chevron,
            stroke: 1.5,
            style: {
              width: '1rem',
              height: '1rem',
              transform: opened ? 'rotate(-90deg)' : 'none'
            }
          })
      )
    ),
    hasLinks && React.createElement(Collapse, { in: opened }, items)
  );
}

const mockdata = {
  label: 'Releases',
  icon: IconCalendarStats,
  links: [
    { label: 'Upcoming releases', link: '/' },
    { label: 'Previous releases', link: '/' },
    { label: 'Releases schedule', link: '/' }
  ]
};

function NavbarLinksGroup() {
  return React.createElement(
    Box,
    { mih: 220, p: 'md' },
    React.createElement(LinksGroup, mockdata)
  );
}
