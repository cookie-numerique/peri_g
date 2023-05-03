import React from 'react';
import PropTypes from 'prop-types';
import {Stack} from "@mui/material";

type TypeLayout = {
  children: React.ReactNode
}
/**
 * @description Component who wrap all the pages
 * @param {TypeLayout} props
 * @constructor
 */
export default function Layout(props: TypeLayout) {
  const {children} = props;

  const borderY = "1px solid";

  return (
    <Stack
      alignItems="center"

    >
      <Stack
        borderLeft={borderY}
        borderRight={borderY}
        height="100vh"
        borderColor="lightgray"
        width={{
          xs: '100%',
          md: '80%',
          lg: '70%'
        }}
        padding="2em"
      >
        {children}
      </Stack>
    </Stack>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}