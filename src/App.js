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

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <section className="container-fluid d-flex justify-content-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/upload" element={<Upload />} />
          {/* Add more routes as needed */}
          <Route path="*" element={<NotFound />} /> {/* Handle 404 */}
        </Routes>
      </section>
    </div>
  );
}

export default App;
