'use client';

import { useState } from 'react';

export interface AddressData {
  fullName: string;
  street: string;
  number: string;
  apartment: string;
  commune: string;
  shippingMethod: 'standard' | 'express';
}

const communes = [
  'Santiago', 'Providencia', 'Las Condes', 'Vitacura', 'Lo Barnechea',
  'La Reina', 'Ñuñoa', 'Macul', 'Peñalolen', 'La Florida',
  'San Miguel', 'San Joaquin', 'Pedro Aguirre Cerda', 'Maipu',
  'Pudahuel', 'Cerro Navia', 'Quinta Normal', 'Recoleta',
  'Independencia', 'Conchali', 'Huechuraba', 'Quilicura',
  'Renca', 'Estacion Central', 'Cerrillos', 'Lo Prado',
];

interface AddressFormProps {
  onNext: (data: AddressData) => void;
  defaultData?: AddressData;
}

export default function AddressForm({ onNext, defaultData }: AddressFormProps) {
  const [data, setData] = useState<AddressData>(
    defaultData || {
      fullName: '',
      street: '',
      number: '',
      apartment: '',
      commune: '',
      shippingMethod: 'standard',
    }
  );

  const isValid = data.fullName && data.street && data.number && data.commune;

  return (
    <div>
      <h2 className="text-h2 mb-6">Direccion de envio</h2>

      <div className="space-y-4 max-w-lg">
        <div>
          <label className="font-sans text-sm font-medium text-primary block mb-1">
            Nombre completo
          </label>
          <input
            type="text"
            value={data.fullName}
            onChange={(e) => setData({ ...data, fullName: e.target.value })}
            placeholder="Ej: Maria Gonzalez"
            className="w-full font-sans text-sm border border-gray-light rounded-md px-4 py-3 focus:outline-none focus:border-secondary transition-colors"
          />
        </div>

        <div>
          <label className="font-sans text-sm font-medium text-primary block mb-1">
            Direccion
          </label>
          <input
            type="text"
            value={data.street}
            onChange={(e) => setData({ ...data, street: e.target.value })}
            placeholder="Calle / Avenida"
            className="w-full font-sans text-sm border border-gray-light rounded-md px-4 py-3 focus:outline-none focus:border-secondary transition-colors"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-sans text-sm font-medium text-primary block mb-1">
              Numero
            </label>
            <input
              type="text"
              value={data.number}
              onChange={(e) => setData({ ...data, number: e.target.value })}
              placeholder="1234"
              className="w-full font-sans text-sm border border-gray-light rounded-md px-4 py-3 focus:outline-none focus:border-secondary transition-colors"
            />
          </div>
          <div>
            <label className="font-sans text-sm font-medium text-primary block mb-1">
              Dpto / Oficina
            </label>
            <input
              type="text"
              value={data.apartment}
              onChange={(e) => setData({ ...data, apartment: e.target.value })}
              placeholder="Opcional"
              className="w-full font-sans text-sm border border-gray-light rounded-md px-4 py-3 focus:outline-none focus:border-secondary transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="font-sans text-sm font-medium text-primary block mb-1">
            Comuna
          </label>
          <select
            value={data.commune}
            onChange={(e) => setData({ ...data, commune: e.target.value })}
            className="w-full font-sans text-sm border border-gray-light rounded-md px-4 py-3 focus:outline-none focus:border-secondary bg-white"
          >
            <option value="">Seleccionar comuna</option>
            {communes.sort().map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <h3 className="font-sans text-lg font-semibold text-primary mt-8 mb-4">
        Costo de envio
      </h3>
      <div className="space-y-3 max-w-lg">
        <label
          className={`block border-2 rounded-lg p-4 cursor-pointer transition-all ${
            data.shippingMethod === 'standard'
              ? 'border-accent bg-accent/5'
              : 'border-gray-light hover:border-accent'
          }`}
        >
          <input
            type="radio"
            name="shipping"
            value="standard"
            checked={data.shippingMethod === 'standard'}
            onChange={() => setData({ ...data, shippingMethod: 'standard' })}
            className="sr-only"
          />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-sans text-sm font-medium text-primary">Envio Estandar</p>
              <p className="font-sans text-xs text-gray-dark">3-5 dias habiles</p>
            </div>
            <p className="font-sans text-sm font-semibold">$2.990 CLP</p>
          </div>
        </label>

        <label
          className={`block border-2 rounded-lg p-4 cursor-pointer transition-all ${
            data.shippingMethod === 'express'
              ? 'border-accent bg-accent/5'
              : 'border-gray-light hover:border-accent'
          }`}
        >
          <input
            type="radio"
            name="shipping"
            value="express"
            checked={data.shippingMethod === 'express'}
            onChange={() => setData({ ...data, shippingMethod: 'express' })}
            className="sr-only"
          />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-sans text-sm font-medium text-primary">Envio Express</p>
              <p className="font-sans text-xs text-gray-dark">24 horas (RM)</p>
            </div>
            <p className="font-sans text-sm font-semibold">$4.990 CLP</p>
          </div>
        </label>
      </div>

      <button
        onClick={() => onNext(data)}
        disabled={!isValid}
        className="mt-8 w-full max-w-lg bg-accent text-white font-sans font-semibold text-base py-4 rounded-md hover:opacity-90 transition-opacity min-h-[56px] disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Continuar a pago
      </button>
    </div>
  );
}
