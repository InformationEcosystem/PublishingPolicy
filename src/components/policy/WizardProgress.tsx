interface WizardStep {
  id: number
  name: string
}

interface WizardProgressProps {
  steps: WizardStep[]
  currentStep: number
}

export function WizardProgress({ steps, currentStep }: WizardProgressProps) {
  return (
    <nav aria-label="Progress" className="mb-8">
      <ol className="flex items-center justify-center gap-2 sm:gap-4">
        {steps.map((step, index) => {
          const isCompleted = step.id < currentStep
          const isCurrent = step.id === currentStep

          return (
            <li key={step.id} className="flex items-center">
              {index > 0 && (
                <div
                  className={`h-0.5 w-8 sm:w-16 mx-2 ${
                    isCompleted ? 'bg-[#0074ff]' : 'bg-gray-200'
                  }`}
                />
              )}
              <div className="flex items-center gap-2">
                <span
                  className={`
                    flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium
                    ${isCompleted
                      ? 'bg-[#0074ff] text-white'
                      : isCurrent
                        ? 'border-2 border-[#0074ff] text-[#0074ff]'
                        : 'border-2 border-gray-200 text-gray-400'
                    }
                  `}
                >
                  {isCompleted ? '✓' : step.id}
                </span>
                <span
                  className={`hidden sm:block text-sm font-medium ${
                    isCurrent ? 'text-[#0074ff]' : isCompleted ? 'text-gray-900' : 'text-gray-400'
                  }`}
                >
                  {step.name}
                </span>
              </div>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
