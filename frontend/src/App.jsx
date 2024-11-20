import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage/SignupFormPage";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { restoreUser } from "./store/session/sessionSlice";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadUser = () => {
      dispatch(restoreUser());
      setIsUserLoaded(true);
    };

    loadUser();
  }, [dispatch]);

  if (!isUserLoaded) {
    return <h1>Loading</h1>;
  }

  return <Outlet />;
};

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <h1>Welcome!</h1>,
      },
      {
        path: "/login",
        element: <LoginFormPage />,
      },
      {
        path: "/signup",
        element: <SignupFormPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
