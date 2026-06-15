'use client';

import { useState } from 'react';

export type PaymentMethodType = 'webpay' | 'mercado_pago' | 'contra_entrega';

interface PaymentMethodProps {
  total: number;
  onNext: (data: { method: PaymentMethodType; installments: number }) => void;
  onBack: () => void;
}

const methods = [
  {
    id: 'webpay' as PaymentMethodType,
    label: 'Tarjeta Debito/Credito',
    description: 'Webpay Plus - VISA, Mastercard, AMEX',
    icon: '💳',
    supportsInstallments: true,
  },
  {
    id: 'mercado_pago' as PaymentMethodType,
    label: 'Mercado Pago',
    description: 'Billetera digital, debito, credito',
    icon: '📱',
    supportsInstallments: true,
  },
  {
    id: 'contra_entrega' as PaymentMethodType,
    label: 'Contra Entrega',
    description: 'Paga al recibir (Solo RM, sin descuento adicional)',
    icon: '💵',
    supportsInstallments: false,
  },
];

const installmentOptions = [
  { value: 1, label: '1 cuota' },
  { value: 3, label: '3 cuotas sin interes' },
  { value: 6, label: '6 cuotas sin interes' },
];

function formatPrice(price: number) {
  return `$${price.toLocaleString('es-CL')} CLP`;
}

export default function PaymentMethod({ total, onNext, onBack }: PaymentMethodProps) {
  const [method, setMethod] = useState<PaymentMethodType>('webpay');
  const [installments, setInstallments] = useState(1);

  const showInstallments = total > 100000 && methods.find((m) => m.id === method)?.supportsInstallments;

  return (
    <div>
      <h2 className="text-h2 mb-6">Metodo de pago</h2>

      <div className="space-y-3 max-w-lg mb-8">
        {methods.map((m) => (
          <label
            key={m.id}
            className={`block border-2 rounded-lg p-4 cursor-pointer transition-all ${
              method === m.id
                ? 'border-accent bg-accent/5'
                : 'border-gray-light hover:border-accent'
            }`}
          >
            <input
              type="radio"
              name="payment"
              value={m.id}
              checked={method === m.id}
              onChange={() => setMethod(m.id)}
              className="sr-only"
            />
            <div className="flex items-center gap-3">
              <span className="text-2xl">{m.icon}</span>
              <div className="flex-1">
                <p className="font-sans text-sm font-medium text-primary">{m.label}</p>
                <p className="font-sans text-xs text-gray-dark">{m.description}</p>
              </div>
            </div>
          </label>
        ))}
      </div>

      {showInstallments && (
        <div className="mb-8">
          <h3 className="font-sans text-sm font-semibold text-primary mb-3 uppercase tracking-wider">
            Cuotas sin interes
          </h3>
          <div className="flex gap-3 max-w-lg">
            {installmentOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setInstallments(opt.value)}
                className={`flex-1 font-sans text-sm py-3 rounded-md border transition-colors min-h-[48px] ${
                  installments === opt.value
                    ? 'bg-primary text-white border-primary'
                    : 'border-gray-light text-primary hover:border-primary'
                }`}
              >
                {opt.label}
                <br />
                <span className="text-xs opacity-70">
                  {formatPrice(Math.round(total / opt.value))}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-4 max-w-lg">
        <button
          onClick={onBack}
          className="flex-1 border-2 border-primary text-primary font-sans font-semibold text-base py-4 rounded-md hover:bg-primary hover:text-white transition-colors min-h-[56px]"
        >
          Volver
        </button>
        <button
          onClick={() => onNext({ method, installments })}
          className="flex-[2] bg-accent text-white font-sans font-semibold text-base py-4 rounded-md hover:opacity-90 transition-opacity min-h-[56px]"
        >
          Continuar a confirmacion
        </button>
      </div>
    </div>
  );
}
