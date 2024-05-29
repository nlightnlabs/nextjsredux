
import React from 'react';
import { AppProps } from 'next/app';
import { wrapper } from './redux/store'; // Adjust the path as needed

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default wrapper.withRedux(MyApp);
