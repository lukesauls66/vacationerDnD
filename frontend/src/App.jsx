import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import * as sessionActions from './store/session';
import LandingPage from "./components/LandingPage/LandingPage";
import SpotPage from "./components/SpotsPage/SpotPage";
// import SpotCreatePage from "./components/SpotsCreatePage/SpotsCreatePage";

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  // const [error, setError] = useState(null);

  useEffect(() => {
    dispatch(sessionActions.restoreUser())
    .then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <LandingPage />
      },
      {
        path: '/spots'
      },
      {
        path: '/spots/:spotId',
        element: <SpotPage />
      },
      // {
      //   path: '/spots/new',
      //   element: <SpotCreatePage />
      // }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
