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
  // {
  //   loader: () => {
  //     const access_token = localStorage.getItem(`access_token`)
  //     if(!access_token) {
  //       throw redirect(`/login`)
  //     }
  //     return null
  //   },
  //   path: "/admin/foods",
  //   element: <AdminFood/>
  // },
  // {
  //   loader: () => {
  //     const access_token = localStorage.getItem(`access_token`)
  //     if(!access_token) {
  //       throw redirect(`/login`)
  //     }
  //     return null
  //   },
  //   path: "/admin/foods/create",
  //   element: <AdminAddFood/>
  // },
  // {
  //   loader: () => {
  //     const access_token = localStorage.getItem(`access_token`)
  //     if(!access_token) {
  //       throw redirect(`/login`)
  //     }
  //     return null
  //   },
  //   path: "/admin/foods/:id",
  //   element: <AdminEditFood/>
  // },
  // {
  //   loader: () => {
  //     const access_token = localStorage.getItem(`access_token`)
  //     if(!access_token) {
  //       throw redirect(`/login`)
  //     }
  //     return null
  //   },
  //   path: "/payment/stripe",
  //   element: <Payment/>
  // },
]);

function App() {

  return <RouterProvider router={router} />
}

export default App
