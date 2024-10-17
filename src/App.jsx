import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import './App.css'
import RedirectLink from './pages/redirect-link'
import Auth from './pages/auth';
import Link from './pages/link';
import Dashboard from './pages/dashboard';
import LandingPage from './pages/landing';
import AppLayout from './layouts/app-layout';


function App() {
  
  const router=createBrowserRouter([
    {
      element:<AppLayout/>,
      children:[
        {
          path:'/',
          element:<LandingPage />
        },
        {
          path:'/dashboard',
          element:<Dashboard />
        },
        {
          path:'/auth',
          element:<Auth />
        },
        {
          path:'/link/:id',
          element:<Link />
        },
        {
          path:'/:id',
          element:<RedirectLink />
        }
      ]
    }
  ]);
  return <RouterProvider router={router} />;
}

export default App;
