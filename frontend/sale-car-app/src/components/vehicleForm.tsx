// E:\dev\Teste_Verzel_Python\frontend\sale-car-app\src\components\VehicleForm.tsx

import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Input from './Input';
import Button from './Button';

const VehicleForm: React.FC = () => {
  const [name, setName] = useState('');
  const [model, setModel] = useState('');
  const [version, setVersion] = useState('');
  const [mileage, setMileage] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    setImage(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 1,
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
    <form onSubmit={handleSubmit} className="w-full p-6 bg-gray-100 rounded-md">
      <div {...getRootProps()} className="border-2 border-dashed border-gray-500 p-4 mb-4 cursor-pointer text-center">
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the image here ...</p>
        ) : (
          <p>Drag 'n' drop an image here, or click to select one</p>
        )}
      </div>
      {image && (
        <div className="mb-4">
          <img src={URL.createObjectURL(image)} alt="Vehicle" className="w-full h-auto" />
        </div>
      )}
      <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <Input label="Model" value={model} onChange={(e) => setModel(e.target.value)} />
      <Input label="Version" value={version} onChange={(e) => setVersion(e.target.value)} />
      <Input label="Mileage" value={mileage} onChange={(e) => setMileage(e.target.value)} />
      <Input label="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
      <div className="mb-4">
        <label className="text-xl text-black font-semibold mb-2 block">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="
            w-full
            p-4
            text-lg
            bg-white
            border-2
            border-neutral-500
            rounded-md
            outline-none
            text-black
            focus:border-sky-500
            focus:border-2
            transition
            disabled:bg-neutral-900
            disabled:opacity-70
            disabled:cursor-not-allowed
          "
        />
      </div>
      <Button label="Submit" onClick={() => {handleSubmit}} disabled={false} />
    </form>
  );
};

export default VehicleForm;

