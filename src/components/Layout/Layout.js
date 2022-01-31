import { Fragment } from 'react';

import MainNavigation from './MainNavigation';

const Layout = (props) => {
  return (
    <Fragment>
      <MainNavigation />
      <div style={{width:"300px"}}>

      </div>
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
