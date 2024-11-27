import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import * as sessionActions from './store/session';
import LandingPage from "./components/LandingPage/LandingPage";
import SpotPage from "./components/SpotsPage/SpotPage";
import UserSpotsPage from "./components/UserSpotsPage/UserSpotsPage";
import SpotCreatePage from "./components/SpotsCreatePage/SpotCreatePage";

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

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
        path: '/spots/:spotId',
        element: <SpotPage />
      },
      {
        path: '/spots/new',
        element: <SpotCreatePage />
      },
      {
        path: '/user/spots',
        element: <UserSpotsPage />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
