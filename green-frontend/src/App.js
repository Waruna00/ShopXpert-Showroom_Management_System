import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Directions from './Directions';
import Navbar from './layout/navbar';



function App() {
  return (
    <>
    <div>
      <Navbar/>
    </div>

    <div>
      <Directions/>
    </div>
    </>

    
    
  );
}

export default App;
