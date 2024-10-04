import "bootstrap/dist/css/bootstrap.css";
import ListEmployee from "./components/ListEmployee";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import AddEmployee from "./components/AddEmployee";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index:true,
          element: <ListEmployee />,
        },
        {
          path:"/add-employee",
          element:<AddEmployee/>
        },
        {
          path:"/edit-employee/:id",
          element:<AddEmployee/>
        }
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
