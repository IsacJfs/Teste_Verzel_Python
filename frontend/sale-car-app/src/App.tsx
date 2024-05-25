import { Provider } from 'react-redux'
import './App.css'
import Rotas from './routes'
import { store } from './features/store'

function App() {
  return (
    <>  
      <Provider store={store}>
        <Rotas />
      </Provider>
    </>
  )
}

export default App
