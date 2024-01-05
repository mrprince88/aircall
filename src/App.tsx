import Header from "src/components/Header";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import RecordsContainer from "src/components/RecordsContainer";
import RecordDetails from "src/components/RecordDetails";
import Tabs from "src/components/Tabs";
import { Tab } from "./types";

function AppLayout() {
  return (
    <div className="appContainer">
      <Header />
      <Outlet />
    </div>
  );
}

function TabLayout() {
  return (
    <>
      <Tabs />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/activities",
        element: <TabLayout />,
        children: [
          {
            path: "",
            element: <RecordsContainer type={Tab.ALL} />,
          },
          {
            path: "archived",
            element: <RecordsContainer type={Tab.ARCHIVED} />,
          },
        ],
      },
      {
        path: "/activities/:id",
        element: <RecordDetails />,
      },
    ],
    errorElement: (
      <div
        style={{
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Not Found
        <button
          onClick={() => router.navigate("/activities")}
          style={{ marginTop: 20 }}
        >
          Go to activities
        </button>
      </div>
    ),
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
