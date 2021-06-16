/* istanbul ignore file */
import React from 'react';
import type { AppProps } from 'next/app';
import '../styles/globals.scss';

const MyApp = ({ Component, pageProps }: AppProps): React.ReactElement => {
  /* eslint-disable react/jsx-props-no-spreading */
  return <Component {...pageProps} />;
};

export default MyApp;
