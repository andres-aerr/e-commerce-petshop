'use client';

interface CheckoutStepperProps {
  currentStep: number;
}

const steps = [
  { number: 1, label: 'Envio' },
  { number: 2, label: 'Pago' },
  { number: 3, label: 'Confirmacion' },
];

export default function CheckoutStepper({ currentStep }: CheckoutStepperProps) {
  const percent = Math.round((currentStep / 3) * 100);

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-3">
        <span className="font-sans text-xs text-gray-dark">
          Paso {currentStep}/3: {steps[currentStep - 1]?.label}
        </span>
        <span className="font-sans text-xs text-gray-dark">{percent}%</span>
      </div>
      <div className="h-2 bg-gray-light rounded-full overflow-hidden">
        <div
          className="h-full bg-accent rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="flex justify-between mt-2">
        {steps.map((step) => (
          <span
            key={step.number}
            className={`font-sans text-xs ${
              step.number <= currentStep ? 'text-accent font-semibold' : 'text-gray-dark'
            }`}
          >
            {step.label}
          </span>
        ))}
      </div>
    </div>
  );
}
