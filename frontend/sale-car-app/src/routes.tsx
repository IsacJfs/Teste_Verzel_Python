import Cars from './components/Cars'
import Layout from './components/Layout'

const Rotas = () => {
  return (
    <>
      <Layout>
        <div>
          <h3>lista de carros</h3>
          <Cars />
        </div>
      </Layout>
    </>
  )
}

export default Rotas
