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

function App() {
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
