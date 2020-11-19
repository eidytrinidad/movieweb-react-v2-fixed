
import AppRouter from "./components/routes/AppRouter";
import {Provider} from "react-redux";
import { store } from "./store/store";

function MovieWeb() {

  return (
    <>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </>
  );
}

export default MovieWeb;
