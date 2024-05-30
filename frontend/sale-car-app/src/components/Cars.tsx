import { useEffect } from 'react'
import { useCars } from '../features/cars/useCars'
import CardItem from './CardItem'

const Cars: React.FC = () => {
  const { cars, loadCars } = useCars()

  useEffect(() => {
    loadCars()
  }, [loadCars])

  return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cars.map((car) => (
          <CardItem key={car.id} cars={car} />
        ))}
      </div>
  )
}

export default Cars
