import React, { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'

function DonationModal({ isOpen, setIsOpen }) {
  const [amount, setAmount] = useState('')
  const [phone, setPhone] = useState('')
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    
    // Validate amount
    if (amount < 10) {
      newErrors.amount = 'Minimum donation is KES 10'
    } else if (amount > 70000) {
      newErrors.amount = 'Maximum donation is KES 70,000'
    }

    // Validate phone number (Safaricom format)
    const phoneRegex = /^254(7\d{8})$/
    if (!phoneRegex.test(phone)) {
      newErrors.phone = 'Please enter a valid Safaricom number (format: 254XXXXXXXXX)'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      // Here you would integrate with the Mpesa API
      console.log('Processing donation:', { amount, phone })
      setIsOpen(false)
      // Reset form
      setAmount('')
      setPhone('')
      setErrors({})
    }
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-60 z-40" />
      <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-sm w-[90vw] rounded-lg bg-white p-6 shadow-2xl z-50">
          <Dialog.Title className="text-2xl font-bold mb-4 text-green-800">Support FC United Warriors</Dialog.Title>
          <Dialog.Description className="text-gray-600 mb-6">
            Your contribution helps build our community stadium and youth programs.
          </Dialog.Description>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Amount (KES)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className={`mt-1 block w-full rounded-md border ${
                  errors.amount ? 'border-red-500' : 'border-gray-300'
                } shadow-sm focus:border-green-500 focus:ring-green-500 px-3 py-2`}
                placeholder="Enter amount (KES 10 - 70,000)"
                required
                min="10"
                max="70000"
              />
              {errors.amount && (
                <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">M-Pesa Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`mt-1 block w-full rounded-md border ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                } shadow-sm focus:border-green-500 focus:ring-green-500 px-3 py-2`}
                placeholder="254XXXXXXXXX"
                required
                pattern="^254[7][0-9]{8}$"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">Format: 254XXXXXXXXX (Safaricom only)</p>
            </div>
            <div className="flex gap-4 mt-6">
              <button
                type="submit"
                className="flex-1 bg-green-600 text-white rounded-md py-2 hover:bg-green-700 transition-colors font-medium"
              >
                Donate
              </button>
              <Dialog.Close asChild>
                <button
                  type="button"
                  onClick={() => {
                    setErrors({})
                    setAmount('')
                    setPhone('')
                  }}
                  className="flex-1 bg-gray-200 text-gray-800 rounded-md py-2 hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancel
                </button>
              </Dialog.Close>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

function App() {
  const [isDonationOpen, setIsDonationOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-800 to-green-900">
      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center text-white">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-6xl font-bold mb-4">FC United Warriors</h1>
          <p className="text-2xl mb-8">Coming to the Premier League 2025</p>
          <div className="space-x-4">
            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition-colors">
              Join the Waitlist
            </button>
            <button
              onClick={() => setIsDonationOpen(true)}
              className="bg-white hover:bg-gray-100 text-green-800 font-bold py-3 px-8 rounded-full transition-colors"
            >
              Donate with M-Pesa
            </button>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">What to Expect</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="text-4xl mb-4">⚽</div>
              <h3 className="text-xl font-bold mb-2">World-Class Stadium</h3>
              <p className="text-gray-600">State-of-the-art 60,000 capacity arena with modern amenities</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-bold mb-2">Elite Training</h3>
              <p className="text-gray-600">Top-tier coaching staff and training facilities</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-bold mb-2">Community Focus</h3>
              <p className="text-gray-600">Strong emphasis on local talent and community development</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4 bg-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Road to 2025</h2>
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-24 text-right font-bold">2024 Q2</div>
              <div className="w-4 h-4 rounded-full bg-green-600"></div>
              <div className="flex-1 bg-white p-4 rounded-lg shadow">
                Stadium Construction Begins
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-24 text-right font-bold">2024 Q3</div>
              <div className="w-4 h-4 rounded-full bg-green-600"></div>
              <div className="flex-1 bg-white p-4 rounded-lg shadow">
                Player Recruitment Phase
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-24 text-right font-bold">2024 Q4</div>
              <div className="w-4 h-4 rounded-full bg-green-600"></div>
              <div className="flex-1 bg-white p-4 rounded-lg shadow">
                Training Facility Launch
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-24 text-right font-bold">2025 Q1</div>
              <div className="w-4 h-4 rounded-full bg-green-600"></div>
              <div className="flex-1 bg-white p-4 rounded-lg shadow">
                Premier League Debut
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="mb-4">FC United Warriors © 2024</p>
          <div className="flex justify-center gap-4">
            <a href="#" className="hover:text-green-400">Twitter</a>
            <a href="#" className="hover:text-green-400">Facebook</a>
            <a href="#" className="hover:text-green-400">Instagram</a>
          </div>
        </div>
      </footer>

      <DonationModal isOpen={isDonationOpen} setIsOpen={setIsDonationOpen} />
    </div>
  )
}

export default App