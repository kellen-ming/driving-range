'use client'

import { FancyCounter } from '../components/FancyCounter'

export default function HeadlessDemo() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-3xl p-8">
        <FancyCounter>
          <FancyCounter.Fireworks at={10} />
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">My Counter App</h1>
            <FancyCounter.Count />
            <div className="flex space-x-4">
              <FancyCounter.IncrementBtn by={1}>
                Increment by 1
              </FancyCounter.IncrementBtn>
              <FancyCounter.IncrementBtn by={2}>
                Increment by 2
              </FancyCounter.IncrementBtn>
              <FancyCounter.DecrementBtn by={1}>
                Decrement by 1
              </FancyCounter.DecrementBtn>
              <FancyCounter.DecrementBtn by={2}>
                Decrement by 2
              </FancyCounter.DecrementBtn>
            </div>
          </div>
        </FancyCounter>
      </div>
    </div>
  )
} 