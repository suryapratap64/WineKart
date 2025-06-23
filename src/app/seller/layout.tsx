'use client';

import Navbar from '@/components/seller/Navbar';
import Sidebar from '@/components/seller/Sidebar';
import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="flex w-full">
        <Sidebar />
        {children}
      </div>
    </div>
  );
};

export default Layout;

// 'use client'
// import Navbar from '@/components/seller/Navbar'
// import Sidebar from '@/components/seller/Sidebar'
// import React from 'react'

// const Layout = ({ children }) => {
//   return (
//     <div>
//       <Navbar />
//       <div className='flex w-full'>
//         <Sidebar />
//         {children}
//       </div>
//     </div>
//   )
// }

// export default Layout