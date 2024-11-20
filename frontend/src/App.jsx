import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Navigation from "./components/Navigation/Navigation";
import * as sessionActions from "./store/session/sessionSlice";

const Layout = () => {
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsUserLoaded(true);
    });
  }, [dispatch]);

  if (!isUserLoaded) {
    return <h1>Loading</h1>;
  }

  return (
    <>
      <Navigation isUserLoaded={isUserLoaded} />
      {isUserLoaded && <Outlet />}
    </>
  );
};

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <h1>Welcome!</h1>,
      },
      // {
      //   path: "*",
      //   element: <h1>Page Not Found</h1>,
      // },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
