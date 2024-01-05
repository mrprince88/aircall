import Header from "src/components/Header";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import CallsContainer from "src/components/CallsContainer";
import Tabs from "src/components/Tabs";
import { Tab } from "./types";

function AppLayout() {
  return (
    <div className="appContainer">
      <Header />
      <Tabs />
      <Outlet />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <CallsContainer type={Tab.ALL} /> },
      { path: "/archived", element: <CallsContainer type={Tab.ARCHIVED} /> },
    ],
    errorElement: <div>Not Found</div>,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
