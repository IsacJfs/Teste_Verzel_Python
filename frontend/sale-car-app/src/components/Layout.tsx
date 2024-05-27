import Header from './layout/Header'
import Sidebar from './layout/Sidebar'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

  return (
    <div className="h-screen bg-white">
      <div className="container h-full mx-auto xl:px-30 max-w-7xl">
        <Header title={''} children={undefined} />
        <div className="grid grid-cols-4 h-full">
          <Sidebar />
          <div
            className="
            col-span-3
            lg:col-span-3
            border-x-[1px]
            border-neutral-800
          "
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout
