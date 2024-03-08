import "./App.css";
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Profile from "./components/UI/Profile";
import Home from "./components/Home";
import Header from "./components/Header";
import NotFound from "./components/NotFound";
import Upload from "./components/Upload";
import Login from "./components/Login";
import supabase from "./data/supabase";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginUser, logoutUser } from "./store/store";

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    // const session = supabase.auth?.session();
    // dispatch(loginUser(session?.user))
    const {data: authListener} = supabase.auth.onAuthStateChange((event, session) => {
      switch(event) {
        case "SIGNED_IN":
          dispatch(loginUser(session?.user))
          break;
        case "SIGNED_OUT":
          dispatch(logoutUser())
          break;
        default:
          break;
      }
    });
    // return () => {
    //   authListener.unsubscribe()
    // }
  })
  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <section className="container-fluid d-flex justify-content-center">
        <Routes>
          <Route path="/art-gallery" element={<Home />} />
          <Route path="/art-gallery/profile" element={<Profile />} />
          <Route path="/art-gallery/upload" element={<Upload />} />
          <Route path="/art-gallery/login" element={<Login />} />
          {/* Add more routes as needed */}
          <Route path="*" element={<NotFound />} /> {/* Handle 404 */}
        </Routes>
      </section>
    </div>
  );
}

export default App;
