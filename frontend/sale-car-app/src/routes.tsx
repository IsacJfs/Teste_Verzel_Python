import { Routes, Route } from 'react-router-dom'
import Cars from './components/Cars'
import Layout from './components/Layout'
import VehicleForm from './components/vehicleForm'

const Rotas = () => {
  return (
    <>
      <Layout>
        <Routes>
          <Route path='/' element={<Cars />} />
          <Route path='/register' element={<VehicleForm />} />
        </Routes>
      </Layout>
    </>
  )
}

export default Rotas
