import { Provider } from 'react-redux'
import './App.css'
import Rotas from './routes'
import { store } from './features/store'
import LoginModal from './components/modals/LoginModal'
import { Toaster } from 'react-hot-toast'
import RegisterModal from './components/modals/UserRegisterModal'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Toaster position="top-center" reverseOrder={false} />
          <LoginModal />
          <RegisterModal />
          <Rotas />
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
