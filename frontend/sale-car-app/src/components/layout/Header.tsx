interface HeaderProps {
  title: string;
  children: React.ReactNode;
}

const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="w-full h-20 flex items-center p-1">
      <div className="flex justify-between w-full">
        <h1 className="text-3xl font-bold">KAVAK</h1>
        <ul className="flex gap-3">
          <li><a>Comprar Carro</a></li>
          <li><a>Vender Carro</a></li>
          <li><a>Cadastre-se</a></li>
        </ul>
      </div>
    </header>
  )
}

export default Header
