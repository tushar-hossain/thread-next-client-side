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
import AdminRoute from "../Routes/AdminRoute";
import AdminProfile from "../Pages/Dashboard/Admin/AdminProfile/AdminProfile";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers/ManageUsers";
import AdminAnnouncement from "../Pages/Dashboard/Admin/AdminAnnouncement/AdminAnnouncement";
import AdminReportedComments from "../Pages/Dashboard/Admin/AdminReportedComments/AdminReportedComments";
import FAQs from "../Pages/FAQ/FAQs";
import PrivacyPolicy from "../Pages/PrivacyPolicy/PrivacyPolicy";
import TermsOfService from "../Pages/TermsOfService/TermsOfService";

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
      { path: "faqs", Component: FAQs },
      { path: "privacy", Component: PrivacyPolicy },
      { path: "terms", Component: TermsOfService },
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
    path: "dashboard",
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

      // Admin routes
      {
        path: "admin-profile",
        element: (
          <AdminRoute>
            <AdminProfile />
          </AdminRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "admin-announcement",
        element: (
          <AdminRoute>
            <AdminAnnouncement />
          </AdminRoute>
        ),
      },
      {
        path: "adminReportedComments",
        element: (
          <AdminRoute>
            <AdminReportedComments />
          </AdminRoute>
        ),
      },
    ],
  },
]);
