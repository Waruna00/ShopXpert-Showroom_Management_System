import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Directions from "./Directions";
import Navbar from "./layout/navbar";
import { UserProvider } from "./UserProvider";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <UserProvider>
      <Provider store={store}>
        <div>
          <Directions />
        </div>
      </Provider>
    </UserProvider>
  );
}

export default App;
