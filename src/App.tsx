import MainLayout from "./layouts/MainLayout"
import './App.css'
import { Provider } from "react-redux"
import { store } from "./redux/store"

function App() {

  return (
    <>

      <Provider store={store}>
        <MainLayout />
      </Provider>


    </>
  )
}

export default App
