import Navigation from '../components/ui/navigation'
import { BrowserRouter } from 'react-router-dom'
import { Loading } from '../components/ui/loading'
import { navLinksData, Routing } from '../pages'
import { Suspense } from 'react'
import './index.css'

export default function App() {
  return (
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Navigation navLinksData={navLinksData} />
          <div className='container mx-auto p-4'>
            <Routing />
          </div>
        </Suspense>
      </BrowserRouter>
  );
}
