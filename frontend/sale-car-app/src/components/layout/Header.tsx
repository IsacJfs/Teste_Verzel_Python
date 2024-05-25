interface HeaderProps {
  title: string;
  children: React.ReactNode;
}

const Header: React.FC<HeaderProps> = () => {
  return (
    <header>
      <div>
        <h1 className="text-3xl font-bold">Carros</h1>
      </div>
    </header>
  )
}

export default Header
