import React from 'react'
import { VehicleResponse } from '../features/cars/types'

interface CardItemProps {
  cars: VehicleResponse
}

const CardItem: React.FC<CardItemProps> = ({ cars }) => {
  return (
    <div className="max-w-72 rounded-md overflow-hidden shadow-lg border">
      <img className="w-full h-[48%] sm:h-[40%] object-contain overflow-hidden" src={`http://localhost:8000/images/${cars.images[0].image_name}`} alt={"asdf"} />
      <div className="px-6 py-4 border-b">
        <div className="text-start font-bold text-xl mb-2">
          {cars.car_model_id} - {cars.brand_id}
        </div>
        <p className="text-gray-700 text-base text-start">
          {cars.year} - {cars.car_model_id}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2 border-b">
        <p className="text-gray-700 text-base text-start">Preço à vista</p>
        <p className="text-start font-bold text-3xl">
          <span className="text-sm">R$</span>
          {cars.price}
        </p>
      </div>
      <div className="px-6 py-4">
        <div className="flex items-center">
          <svg
            className="w-6 h-6 text-gray-600"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
          </svg>
          <p className="text-gray-700 text-base ml-2">{cars.location}</p>
        </div>
      </div>
    </div>
  )
}

export default CardItem
