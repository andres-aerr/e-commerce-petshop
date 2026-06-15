'use client';

import { useState } from 'react';
import CheckoutStepper from '@/components/checkout/CheckoutStepper';
import AddressForm, { type AddressData } from '@/components/checkout/AddressForm';
import PaymentMethod, { type PaymentMethodType } from '@/components/checkout/PaymentMethod';
import { useCartStore } from '@/store/cart';
import Link from 'next/link';

function formatPrice(price: number) {
  return `$${price.toLocaleString('es-CL')} CLP`;
}

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCartStore();
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState<AddressData | null>(null);
  const [payment, setPayment] = useState<{ method: PaymentMethodType; installments: number } | null>(null);

  if (items.length === 0 && step > 1) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <p className="font-sans text-gray-dark">Tu carrito esta vacio.</p>
        <Link href="/products" className="text-secondary font-sans underline mt-4 inline-block">
          Ir al catalogo
        </Link>
      </div>
    );
  }

  const shippingCost = address?.shippingMethod === 'express' ? 4990 : 2990;
  const total = subtotal() + shippingCost;

  function handleConfirm() {
    alert('✅ Compra confirmada! (Demo - integracion de pago pendiente)');
    clearCart();
  }

  function CartSummary() {
    return (
      <div className="border border-gray-light rounded-lg p-6 h-fit sticky top-24">
        <h3 className="font-sans text-lg font-semibold text-primary mb-4">Resumen del carrito</h3>
        <div className="space-y-3 mb-4">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between items-start font-sans text-sm">
              <div className="flex-1 min-w-0 mr-2">
                <p className="text-primary truncate">{item.name}</p>
                <p className="text-xs text-gray-dark">{item.quantity}x</p>
              </div>
              <p className="font-semibold shrink-0">{formatPrice(item.price * item.quantity)}</p>
            </div>
          ))}
        </div>
        <hr className="border-gray-light mb-3" />
        <div className="space-y-1 mb-3 font-sans text-sm">
          <div className="flex justify-between text-gray-dark">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal())}</span>
          </div>
          <div className="flex justify-between text-gray-dark">
            <span>Envio</span>
            <span>{formatPrice(shippingCost)}</span>
          </div>
        </div>
        <hr className="border-gray-light mb-3" />
        <div className="flex justify-between font-sans text-base font-bold">
          <span>Total</span>
          <span className="text-accent">{formatPrice(total)}</span>
        </div>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-8">
        <CheckoutStepper currentStep={3} />

        <h2 className="text-h2 mb-6">Confirma tu compra</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="border border-gray-light rounded-lg p-6">
              <h3 className="font-sans text-sm font-semibold text-primary uppercase tracking-wider mb-3">
                Direccion de envio
              </h3>
              <p className="font-sans text-sm text-primary">{address?.fullName}</p>
              <p className="font-sans text-sm text-gray-dark">
                {address?.street} {address?.number}, {address?.apartment}
              </p>
              <p className="font-sans text-sm text-gray-dark">{address?.commune}</p>
              <p className="font-sans text-sm text-gray-dark mt-2">
                Envio: {address?.shippingMethod === 'express' ? 'Express (24h)' : 'Estandar (3-5 dias)'} - {formatPrice(shippingCost)}
              </p>
            </div>

            <div className="border border-gray-light rounded-lg p-6">
              <h3 className="font-sans text-sm font-semibold text-primary uppercase tracking-wider mb-3">
                Metodo de pago
              </h3>
              <p className="font-sans text-sm text-primary">
                {payment?.method === 'webpay' ? '💳 Webpay Plus - Tarjeta Debito/Credito' :
                 payment?.method === 'mercado_pago' ? '📱 Mercado Pago' :
                 '💵 Contra Entrega'}
              </p>
              {payment && payment.installments > 1 && (
                <p className="font-sans text-sm text-gray-dark mt-1">
                  {payment.installments} cuotas sin interes de {formatPrice(Math.round(total / payment.installments))}
                </p>
              )}
            </div>

            <div className="border border-gray-light rounded-lg p-6">
              <h3 className="font-sans text-sm font-semibold text-primary uppercase tracking-wider mb-3">
                Productos
              </h3>
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between font-sans text-sm">
                    <span className="text-primary">{item.name} x{item.quantity}</span>
                    <span className="font-semibold">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep(2)}
                className="flex-1 border-2 border-primary text-primary font-sans font-semibold text-base py-4 rounded-md hover:bg-primary hover:text-white transition-colors min-h-[56px]"
              >
                Volver
              </button>
              <button
                onClick={handleConfirm}
                className="flex-[2] bg-accent text-white font-sans font-semibold text-base py-4 rounded-md hover:opacity-90 transition-opacity min-h-[56px]"
              >
                CONFIRMAR COMPRA
              </button>
            </div>
          </div>

          <CartSummary />
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-8">
        <CheckoutStepper currentStep={2} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <PaymentMethod
              total={total}
              onNext={(data) => {
                setPayment(data);
                setStep(3);
              }}
              onBack={() => setStep(1)}
            />
          </div>
          <CartSummary />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <CheckoutStepper currentStep={1} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <AddressForm
            onNext={(data) => {
              setAddress(data);
              setStep(2);
            }}
            defaultData={address || undefined}
          />
        </div>
        <CartSummary />
      </div>
    </div>
  );
}
