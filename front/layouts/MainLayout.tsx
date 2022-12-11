/** @format */

import React from 'react';
import clsx from 'clsx';
import LeftMenu from '../components/LeftMenu';
import SideComments from '../components/SideComments';
import SideStatistic from '../components/SideStatistic';

interface MainLayoutProps {
  hideComments?: boolean;
  hideMenu?: boolean;
  contentFullWidth?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  contentFullWidth,
  hideComments,
  hideMenu,
  className,
}) => {
  return (
    <div className={clsx('wrapper', className)}>
      {!hideMenu && (
        <>
          <div className="leftSide">
            <LeftMenu />
            <SideComments />
          </div>
        </>
      )}

      <div className={clsx('content', { 'content--full': contentFullWidth })}>
        {children}
      </div>
      {!hideComments && (
        <div className="rightSide">
          <SideStatistic />
        </div>
      )}
    </div>
  );
};

export default MainLayout;