import Head from 'next/head';
import React from 'react';
import Notification from '../components/ui/notification'
import Layout from '../components/layout/layout';
import '../styles/globals.css';
import { Provider } from 'react-redux';
import store from '../store';

function MyApp({ Component, pageProps }) {



  return (
    <Provider store={store}>
       <Layout>
      <Head>
        <title>Next Events</title>
        <meta name='description' content='NextJS Events' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Component {...pageProps} />
 
    </Layout>
    </Provider>
   
  );
}

export default MyApp;
