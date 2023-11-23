import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { PublicFood } from "./components/PublicFood";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Food } from "./components/Food";
import { Profile } from "./components/Profile";
import { EditProfile } from "./components/EditProfile";
import { Payment } from "./components/Payment";
import { Success } from "./components/Success";
import { AdminFood } from "./components/AdminFood";
import { AdminAddFood } from "./components/AdminAddFood";
import { AdminEditFood } from "./components/AdminEditFood";

const router = createBrowserRouter([
  {
    path: "/pub/foods",
    element: <PublicFood/>
  },
  {
    loader: () => {
      const access_token = localStorage.getItem(`access_token`)
      if(access_token) {
        throw redirect(`/foods`)
      }
      return null
    },
    path: "/register",
    element: <Register/>
  },
  {
    loader: () => {
      const access_token = localStorage.getItem(`access_token`)
      if(access_token) {
        throw redirect(`/foods`)
      }
      return null
    },
    path: "/login",
    element: <Login/>
  },
  {
    loader: () => {
      const access_token = localStorage.getItem(`access_token`)
      if(!access_token) {
        throw redirect(`/login`)
      }
      return null
    },
    path: "/foods",
    element: <Food/>
  },
  {
    loader: () => {
      const access_token = localStorage.getItem(`access_token`)
      if(!access_token) {
        throw redirect(`/login`)
      }
      return null
    },
    path: "/profile",
    element: <Profile/>
  },
  {
    loader: () => {
      const access_token = localStorage.getItem(`access_token`)
      if(!access_token) {
        throw redirect(`/login`)
      }
      return null
    },
    path: "/profile/edit",
    element: <EditProfile/>
  },
  {
    loader: () => {
      const access_token = localStorage.getItem(`access_token`)
      if(!access_token) {
        throw redirect(`/login`)
      }
      return null
    },
    path: "/foods/admin",
    element: <AdminFood/>
  },
  {
    loader: () => {
      const access_token = localStorage.getItem(`access_token`)
      if(!access_token) {
        throw redirect(`/login`)
      }
      return null
    },
    path: "/foods/admin/create",
    element: <AdminAddFood/>
  },
  {
    loader: () => {
      const access_token = localStorage.getItem(`access_token`)
      if(!access_token) {
        throw redirect(`/login`)
      }
      return null
    },
    path: "/foods/admin/:id",
    element: <AdminEditFood/>
  },
  {
    loader: () => {
      const access_token = localStorage.getItem(`access_token`)
      if(!access_token) {
        throw redirect(`/login`)
      }
      return null
    },
    path: "/payment",
    element: <Payment/>
  },
  // {
  //   loader: () => {
  //     const access_token = localStorage.getItem(`access_token`)
  //     if(!access_token) {
  //       throw redirect(`/login`)
  //     }
  //     return null
  //   },
  //   path: "/success",
  //   element: <Success/>
  // },
]);

function App() {

  return <RouterProvider router={router} />
}

export default App
