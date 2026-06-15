'use client';

import { useState } from 'react';

interface NutritionalCalculatorProps {
  weightKg: number;
  isOpen: boolean;
  onClose: () => void;
}

const activityLevels = [
  { label: 'Bajo', value: 1, desc: 'Sedentario, poca actividad' },
  { label: 'Medio', value: 2, desc: 'Actividad normal' },
  { label: 'Alto', value: 3, desc: 'Muy activo o trabajo' },
];

function calcDailyDose(weight: number, activity: number) {
  const base = weight * 12;
  const factor = activity === 1 ? 0.8 : activity === 2 ? 1 : 1.2;
  return Math.round(base * factor);
}

export default function NutritionalCalculator({
  weightKg,
  isOpen,
  onClose,
}: NutritionalCalculatorProps) {
  const [weight, setWeight] = useState(weightKg || 20);
  const [activity, setActivity] = useState(2);

  const dailyDose = calcDailyDose(weight, activity);
  const bagDuration = Math.round((weightKg * 1000) / dailyDose);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-dark hover:text-primary transition-colors"
          aria-label="Cerrar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <h3 className="font-sans text-xl font-semibold text-primary mb-2">
          ¿Cuanto debe comer tu mascota?
        </h3>
        <p className="font-sans text-sm text-gray-dark mb-6">
          Calcula la porcion ideal segun el peso y actividad de tu perro.
        </p>

        <div className="space-y-6">
          <div>
            <label className="font-sans text-sm font-medium text-primary block mb-2">
              Peso de tu perro: <span className="font-semibold text-accent">{weight} kg</span>
            </label>
            <input
              type="range"
              min={2}
              max={80}
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="w-full accent-accent"
            />
            <div className="flex justify-between font-sans text-xs text-gray-dark mt-1">
              <span>2 kg</span>
              <span>80 kg</span>
            </div>
          </div>

          <div>
            <p className="font-sans text-sm font-medium text-primary mb-3">Nivel de actividad</p>
            <div className="flex gap-2">
              {activityLevels.map((level) => (
                <button
                  key={level.value}
                  onClick={() => setActivity(level.value)}
                  className={`flex-1 font-sans text-sm py-3 rounded-md border transition-colors min-h-[48px] ${
                    activity === level.value
                      ? 'bg-accent text-white border-accent'
                      : 'border-gray-light text-primary hover:border-accent bg-white'
                  }`}
                >
                  {level.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="bg-white rounded-lg p-4 text-center border border-gray-light">
              <p className="font-sans text-2xl font-bold text-primary">{dailyDose}g</p>
              <p className="font-sans text-xs text-gray-dark">Dosis diaria</p>
            </div>
            <div className="bg-white rounded-lg p-4 text-center border border-gray-light">
              <p className="font-sans text-2xl font-bold text-primary">{bagDuration} dias</p>
              <p className="font-sans text-xs text-gray-dark">Duracion del saco</p>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="font-sans text-xs text-amber-800">
              <strong>Dosis estandar estimada.</strong> Siempre consulta a tu veterinario para ajustar la porcion ideal para tu mascota.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
