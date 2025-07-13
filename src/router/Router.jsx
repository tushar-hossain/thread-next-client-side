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
import Dashboard from "../Pages/Dashboard/Dashboard";
import MyProfile from "../Pages/Dashboard/MyProfile/MyProfile";
import AddPost from "../Pages/Dashboard/AddPost/AddPost";
import MyPost from "../Pages/Dashboard/MyPost/MyPost";
import CommentsPage from "../Pages/Dashboard/CommentsPage/CommentsPage";

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
  // dashboard
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "add-post",
        element: (
          <PrivateRoute>
            <AddPost />
          </PrivateRoute>
        ),
      },
      {
        path: "my-posts",
        element: (
          <PrivateRoute>
            <MyPost />
          </PrivateRoute>
        ),
      },
      {
        path: "commentsPage/:id",
        element: (
          <PrivateRoute>
            <CommentsPage />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
