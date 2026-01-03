import "./App.css";
import {
  BrowserRouter as Router,
  useLocation
} from "react-router-dom";

import Landing from "./components/Landing/Landing";
import Airlines from "./components/Airlines/Airlines";
import Airports from "./components/Airports/Airports";
import Flights from "./components/Flights/Flights";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { DataProvider } from "./context/DataContext";

const PageContainer = () => {
  const location = useLocation();
  const path = location.pathname;

  if (path === '/' || path === '/landing') {
    return <Landing />;
  }

  return (
    <>
      <Navbar />
      <div style={{ display: path === '/airlines' ? 'block' : 'none' }}>
        <Airlines />
      </div>
      <div style={{ display: path === '/airports' ? 'block' : 'none' }}>
        <Airports />
      </div>
      <div style={{ display: path === '/flights' ? 'block' : 'none' }}>
        <Flights />
      </div>
      <Footer />
    </>
  );
};

function App() {
  return (
    <DataProvider>
      <div className="App">
        <Router>
          <PageContainer />
        </Router>
      </div>
    </DataProvider>
  );
}

export default App;



