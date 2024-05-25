import React from 'react'
import SidebarItem from './SidebarItem'

const Sidebar: React.FC = () => {
  return (
    <div className="col-span-1 h-full pr-4 md:pr-6">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px]">
          <div className="flex justify-between items-center">
            <button className="text-sm font-semibold">Ocultar Filtros</button>
            <button className="text-sm text-blue-500">Remover filtros</button>
          </div>
          <SidebarItem title="Promoção">
            <button className="border rounded-md px-2 py-1 m-1">
              Ofertas Da Semana
            </button>
            <button className="border rounded-md px-2 py-1 m-1">
              Pronta Entrega
            </button>
            <button className="border rounded-md px-2 py-1 m-1">
              Disponível Em 15 Dias
            </button>
            <button className="border rounded-md px-2 py-1 m-1">
              Disponível Em 30 Dias
            </button>
          </SidebarItem>
          <SidebarItem title="Localização - Estado e Loja">
            <button className="border rounded-md px-2 py-1 m-1">Cidade</button>
          </SidebarItem>
          <SidebarItem title="Marca e modelo">
            <button className="border rounded-md px-2 py-1 m-1">Marca</button>
          </SidebarItem>
          <SidebarItem title="Ano">
            <button className="border rounded-md px-2 py-1 m-1">Ano</button>
          </SidebarItem>
          <SidebarItem title="Preço">
            <button className="border rounded-md px-2 py-1 m-1">Preço</button>
          </SidebarItem>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
