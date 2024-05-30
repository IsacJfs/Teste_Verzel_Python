import React from 'react'
import SidebarItem from './SidebarItem'
import Button from '../Button'

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
            <div className="flex flex-col items-center space-y-2">
              <Button
                label="Ofertas"
                secondary
                onClick={function (): void {
                  throw new Error('Function not implemented.')
                }}
              />
              <Button
                label="Pronta Entrega"
                secondary
                onClick={function (): void {
                  throw new Error('Function not implemented.')
                }}
              />
              <Button
                label="Disponível em 30 dias"
                secondary
                onClick={function (): void {
                  throw new Error('Function not implemented.')
                }}
              />
              <Button
                label="Disponível em 90 dias"
                secondary
                onClick={function (): void {
                  throw new Error('Function not implemented.')
                }}
              />
            </div>
          </SidebarItem>
          <SidebarItem title="Localização - Estado e Loja">
            <div className="flex flex-col items-center space-y-2">
              <Button
                label="São Paulo"
                secondary
                onClick={function (): void {
                  throw new Error('Function not implemented.')
                }}
              />
            </div>
          </SidebarItem>
          <SidebarItem title="Marca e modelo">
            <div className="flex flex-col items-center space-y-2">
              <Button
                label="Toyota"
                secondary
                onClick={function (): void {
                  throw new Error('Function not implemented.')
                }}
              />
            </div>
          </SidebarItem>
          <SidebarItem title="Ano">
            <div className="flex flex-col items-center space-y-2">
              <Button
                label="2010"
                secondary
                onClick={function (): void {
                  throw new Error('Function not implemented.')
                }}
              />
            </div>
          </SidebarItem>
          <SidebarItem title="Preço">
            <div className="flex flex-col items-center space-y-2">
              <Button
                label="220000"
                secondary
                onClick={function (): void {
                  throw new Error('Function not implemented.')
                }}
              />
            </div>
          </SidebarItem>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
