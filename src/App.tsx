import MainLayout from "./layouts/MainLayout"
import './App.css'
import { Provider } from "react-redux"
import { store } from "./redux/store"
import SideBar from "./layouts/SideBar"

function App() {

  return (
    <div className="font-bangla">

      <Provider store={store}>
        <SideBar />
        <MainLayout />
      </Provider>


    </div>
  )
}

export default App
