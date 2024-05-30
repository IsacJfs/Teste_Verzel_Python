import Header from './layout/Header'
import TextCarousel from './layout/OffersCarousel'
import Sidebar from './layout/Sidebar'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

  const carouselItems = [
    { text: 'Teste', background: 'red' },
    { text: 'Teste', background: 'blue' },
    { text: 'Teste', background: 'green' },
  ]

  return (
    <div className="h-screen bg-white">
      <div className="container h-full mx-auto xl:px-30 max-w-7xl">
        <Header title={''} children={undefined} />
        <TextCarousel items={carouselItems} />
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
