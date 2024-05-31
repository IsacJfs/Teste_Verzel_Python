import { useLogin } from '@/features/auth/useLogin'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

interface HeaderProps {
  title: string
  children: React.ReactNode
}

const Header: React.FC<HeaderProps> = () => {
  const { onOpen, isAuthenticated } = useLogin()
  const navigate = useNavigate()

  useEffect(() => {
    console.log(isAuthenticated)
  }, [isAuthenticated])

  const handleSell = () => {
    if (isAuthenticated) {
      navigate('/register')
    } else {
      onOpen()
    }
  }

  const handleHome = () => {
    navigate('/')
  }

  const handleOpen = () => {
    onOpen()
  }

  return (
    <header className="w-full h-20 flex items-center p-1">
      <div className="flex justify-between w-full">
        <h1 className="text-3xl font-bold cursor-pointer">
          <a onClick={handleHome}>KAVAK</a>
        </h1>
        <ul className="flex gap-3 cursor-pointer">
          <li>
            <a onClick={handleHome}>Comprar Carro</a>
          </li>
          <li>
            <a onClick={handleSell}>Vender Carro</a>
          </li>
          {isAuthenticated ? (
            <li>
              <a>Minha Conta</a>
            </li>
          ) : (
            <li>
              <button onClick={handleOpen}>Cadastre-se</button>
            </li>
          )}
        </ul>
      </div>
    </header>
  )
}

export default Header
