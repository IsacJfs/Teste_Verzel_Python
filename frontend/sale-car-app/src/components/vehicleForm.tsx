import React, { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Input from './Input';
import Button from './Button';
import Dropdown from './Dropdown';
import { useDb } from '@/features/dbModels/useDb';
import { useCars } from '@/features/cars/useCars';
import toast from 'react-hot-toast';
import { VehicleCreate } from '@/features/cars/types';

const VehicleForm: React.FC = () => {
  const [year, setYear] = useState('');
  const [location, setLocation] = useState('');
  const [version, setVersion] = useState('');
  const [mileage, setMileage] = useState('');
  const [price, setPrice] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const { brands, loadBrands, models, loadModels } = useDb();
  const { handleCreateVehicle } = useCars();
  const [selectedBrandId, setSelectedBrandId] = useState<number | null>(null);
  const [selectedModelId, setSelectedModelId] = useState<number | null>(null);
  const [token, setToken] = useState('')

  useEffect(() => {
    loadBrands();
  }, [loadBrands]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setSelectedImage(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 1,
  });

  useEffect(() => {
    if (selectedBrandId) {
      loadModels(selectedBrandId)
    }
    setToken(sessionStorage.getItem('access_token') || '')
  }, [loadModels, selectedBrandId, token])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedImage) {
      toast.error('Por favor, selecione uma imagem.');
      return;
    }

    const selectedBrand = brands.Brands.find((brand) => brand.id === selectedBrandId);
    const selectedModel = models.Models.find((model) => model.id === selectedModelId);

    if (!selectedBrand || !selectedModel) {
      toast.error('Por favor, selecione uma marca e um modelo.');
      return;
    }

    const vehicleData : VehicleCreate = {
      brand: selectedBrand.nome,
      model: selectedModel.nome,
      photo: selectedImage,
      price: parseFloat(price),
      year: parseInt(year, 10),
      location: location,
      name: version,
      description: '',
    };

    try {
      await handleCreateVehicle(vehicleData, token);
      setYear('');
      setLocation('');
      setPrice('');
      setSelectedImage(null);
      setSelectedBrandId(null);
      setSelectedModelId(null);
    } catch (error) {
      console.error('Erro ao criar veículo:', error);
      toast.error('Erro ao criar veículo. Por favor, tente novamente.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full p-6 bg-gray-100 rounded-md">
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-gray-500 p-4 mb-4 cursor-pointer text-center"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the image here ...</p>
        ) : (
          <p>Drag 'n' drop an image here, or click to select one</p>
        )}
      </div>
      {selectedImage && (
        <div className="mb-4">
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Vehicle"
            className="w-full h-auto"
          />
        </div>
      )}
      <Dropdown
        label="Fabricante"
        options={brands.Brands.map((brand) => brand.nome)}
        selectedValue={
          selectedBrandId
            ? brands.Brands.find((brand) => brand.id === selectedBrandId)?.nome ?? "" : ""
          }
        onChange={(brandName) => {
          const selectedBrand = brands.Brands.find(
            (brand) => brand.nome === brandName
          )
          setSelectedBrandId(selectedBrand?.id || null)
        }}
      />
      <Dropdown
        label="Modelo"
        options={models.Models.map((model) => model.nome)}
        selectedValue={
          selectedModelId
            ? models.Models.find((model) => model.id === selectedModelId)?.nome?? "" : ""
        }
        onChange={(modelName) => {
          const selectedModel = models.Models.find((model) => model.nome === modelName)
          setSelectedModelId(selectedModel?.id || null)
        }}
      />
      <Input
        label="Versão"
        value={version}
        onChange={(e) => setVersion(e.target.value)}
      />
      <Input
        label="Quilometragem"
        value={mileage}
        onChange={(e) => setMileage(e.target.value)}
      />
      <Input
        label="Ano de Fabricação"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />
      <Input
        label="Preço"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <Input
        label="Localização"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <div className="mb-4">
        <label className="text-xl text-black font-semibold mb-2 block">
          Description
        </label>
      </div>
      <Button
        label="Submit"
        onClick={() => {
          handleSubmit
        }}
        disabled={false}
      />
    </form>
  )
}

export default VehicleForm
