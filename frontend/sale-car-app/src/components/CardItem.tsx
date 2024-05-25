import React from 'react';
import { CarsProps } from '../features/cars/Types';

interface CardItemProps {
  cars: CarsProps
}

const CardItem: React.FC<CardItemProps> = ({
  cars
}) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img className="w-full" src={cars.photo} alt={`${cars.name}`} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">"{cars.name} - {cars.brand}"</div>
        <p className="text-gray-700 text-base">
          {cars.year}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <p className="text-gray-700 text-base">Preço à vista</p>
        <p className="font-bold text-xl">R${cars.price}</p>
      </div>
      <div className="px-6 py-4">
        <div className="flex items-center">
          <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/>
          </svg>
          <p className="text-gray-700 text-base ml-2">{cars.location}</p>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
