import MainLayout from "./layouts/MainLayout"
import './App.css'
import { Provider } from "react-redux"
import { store } from "./redux/store"

function App() {

  return (
    <div className="font-bangla">

      <Provider store={store}>
        <MainLayout />
      </Provider>


    </div>
  )
}

export default App
