import { useEffect } from "react"
import { useCars } from "../features/cars/useCars"
import CardItem from "./CardItem"


const Cars: React.FC = () => {
  const {cars, loadCars} = useCars()

  useEffect(() => {
    loadCars()
  }, [loadCars])

  return (
    <>
    {cars.map((car) => (
      <CardItem key={car.id} cars={car} />
    ))}
    </>
  )
}

export default Cars
