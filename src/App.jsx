import Navbar from "./components/navbar";
import SearchBox from "./components/searchBox";
import MainContent from "./components/mainContent";
import "./styles/App.scss";

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
