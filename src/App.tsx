import { Suspense, type FC } from 'react';
import { RouterProvider } from 'react-router-dom';

import { Loader } from '@/components/shared';

import router from './routes';

const App: FC = () => {
  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
