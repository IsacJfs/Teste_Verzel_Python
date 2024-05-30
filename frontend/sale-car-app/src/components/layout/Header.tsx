import { useLogin } from "@/features/auth/useLogin";

interface HeaderProps {
  title: string;
  children: React.ReactNode;
}

const Header: React.FC<HeaderProps> = () => {

  const { onOpen} = useLogin()

  const handleOpen = () => {
    onOpen()
  }

  return (
    <header className="w-full h-20 flex items-center p-1">
      <div className="flex justify-between w-full">
        <h1 className="text-3xl font-bold">KAVAK</h1>
        <ul className="flex gap-3">
          <li><a>Comprar Carro</a></li>
          <li><a>Vender Carro</a></li>
          <li><button onClick={handleOpen}>Cadastre-se</button></li>
        </ul>
      </div>
    </header>
  )
}

export default Header
