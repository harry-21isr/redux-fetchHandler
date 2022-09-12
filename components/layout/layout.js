import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { notificationActions } from '../../store';
import Notification from '../ui/notification';
import MainHeader from './main-header';

function Layout(props) {

const notiState = useSelector(state => state.notiState);
  
  return (
    <>
     <MainHeader />
      <main>{props.children}</main>
      {notiState.status != '' && <Notification title={notiState.title} message={notiState.message} status={notiState.status}/>}
    </>
  );
}

export default Layout;
