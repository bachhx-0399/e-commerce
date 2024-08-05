import React from 'react';
import ReactDOM from 'react-dom/client';
import { Providers } from '@/redux/provider';
import { Button } from '@/components/ui/button';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Providers>
      <div className='flex gap-x-5'>
        <Button>Button</Button>
        <Button variant='secondary'>Secondary</Button>
        <Button variant='destructive'>Destructive</Button>
        <Button variant='outline'>Outline</Button>
        <Button variant='ghost'>Ghost</Button>
        <li className="py-4 flex">
          <img className="h-10 w-10 rounded-full" src={"team.logo"} alt="" />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{"team.name"}</p>
            <p className="text-sm text-gray-500">{"team.city"}</p>
          </div>
        </li>
      </div>
    </Providers>
  </React.StrictMode>,
);
