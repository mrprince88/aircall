import Header from "src/components/Header";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import RecordsContainer from "src/components/RecordsContainer";
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
      { path: "/", element: <RecordsContainer type={Tab.ALL} /> },
      { path: "/archived", element: <RecordsContainer type={Tab.ARCHIVED} /> },
    ],
    errorElement: <div>Not Found</div>,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
