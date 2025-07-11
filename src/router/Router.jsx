import { createBrowserRouter } from "react-router";
import RootLayouts from "../Layouts/RootLayouts";
import Home from "../Pages/Home/Home";
import Membership from "../Pages/Membership/Membership";
import JoinUs from "../Pages/Register/JoinUs";
import Registration from "../Pages/Register/Registration";
import Announcement from "../Pages/Announcement/Announcement";
import PostDetails from "../Pages/Home/PostDetails/PostDetails";
import PrivateRoute from "../Routes/PrivateRoute";
import Payment from "../Pages/Membership/Payment/Payment";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayouts,
    children: [
      { index: true, Component: Home },
      {
        path: "membership",
        element: (
          <PrivateRoute>
            <Membership />
          </PrivateRoute>
        ),
      },
      { path: "joinUs", Component: JoinUs },
      { path: "register", Component: Registration },
      { path: "announcement", Component: Announcement },
      {
        path: "postDetails/:id",
        element: (
          <PrivateRoute>
            <PostDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "payment",
        Component: Payment,
      },
    ],
  },
]);
