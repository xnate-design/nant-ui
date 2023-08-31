import React, { useContext, useEffect } from 'react';
import { useParams, useLocation, Outlet, useNavigate, useLoaderData } from 'react-router-dom';
import SiteContext from './SiteContext';
import { TopNav, SideBar, Main, MdxContainer } from './components/Layout';
import Home from './Home';
import type { Toc } from '@nant/vite-plugins';

interface ILayout {
  children?: React.ReactElement;
}

const Layout = (props: ILayout) => {
  const params = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const config = useContext(SiteContext);
  const toc = useLoaderData() as Toc;

  const isHome = pathname === '/';
  const hasSideBar = !isHome;

  console.log(toc, 'toc');

  let content = null;

  if (isHome) {
    content = <Home />;
  } else {
    content = (
      <>
        <Main hasSideBar={hasSideBar}>
          <Outlet />
        </Main>
      </>
    );
  }

  return (
    <div className="min-h-screen">
      <TopNav hasSideBar={hasSideBar} />
      {hasSideBar ? <SideBar /> : ''}
      {content}
    </div>
  );
};

export default Layout;
