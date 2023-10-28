import './index.css';
import { Loading } from '../components/ui/loading';
import { Routing } from '../pages';
import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

export default function App() {
  return (
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
            <Routing />
        </Suspense>
      </BrowserRouter>
  );
}
