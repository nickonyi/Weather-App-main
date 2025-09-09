import Navbar from "./components/navbar";
import SearchBox from "./components/searchBox";
import MainContent from "./components/mainContent";
import "./styles/App.scss";
import "./styles/index.css";

function App() {
  return (
    <>
      <Navbar />
      <SearchBox />
      <MainContent />
    </>
  );
}

export default App;
