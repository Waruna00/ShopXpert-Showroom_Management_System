import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Directions from "./Directions";
import { UserProvider } from "./UserProvider";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <UserProvider>
        <div>
          <Directions />
        </div>
      </UserProvider>
    </Provider>
  );
}

export default App;
