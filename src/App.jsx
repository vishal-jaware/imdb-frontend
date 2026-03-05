import { createBrowserRouter,RouterProvider } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Nav from "./COMPONENTS/Nav";
import Home from "./COMPONENTS/Home";
import Register from "./COMPONENTS/Register";
import Login from "./COMPONENTS/Login";
import About from "./COMPONENTS/About";
import NotFound from "./COMPONENTS/NotFound";
import Profile from "./COMPONENTS/Profile";
import Logout from "./COMPONENTS/Logout";
import ProtectedRoute from "./COMPONENTS/ProtectedRoute";
import Admin from "./COMPONENTS/Admin"
import AdminRoute from "./COMPONENTS/AdminRoute"
import AddMovie from "./COMPONENTS/AddMovie";


function App() {
 
let router = createBrowserRouter([

  {
    path:"/",
    element:<>
    <Nav></Nav>
    <Home></Home>
    </>
  },
  {
    path:"/about",
    element:<>
    <ProtectedRoute>
    <Nav></Nav>
    <About></About>
    </ProtectedRoute>
    </>
  },
  {
    path:"/profile",
    element:<>
    <ProtectedRoute>
    <Nav></Nav>
    <Profile></Profile>
    </ProtectedRoute>
    </>
  },{
 path:"/admin",
 element:(
  <AdminRoute>
    <Nav/>
    <Admin></Admin>
  </AdminRoute>
 )
},
{
 path:"/admin/movies",
 element:(
 <AdminRoute>
    <Nav/>
 <AddMovie/>
 </AdminRoute>
 )
},
  {
    path:"/login",
    element:<>
    <Nav></Nav>
    <Login></Login>
    </>
  },
  {
    path:"/logout",
    element:<>
    <Nav></Nav>
    <Logout></Logout>
    </>
  },{
    path:"/register",
    element:<>
    <Nav></Nav>
    <Register></Register>
    </>
  },{
        path:"*",
        element:<> <NotFound></NotFound> </>
      }
])
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
