import Image from 'next/image'
import CalculatorForm from './components/calculatorForm'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12">
      <CalculatorForm />
    </main>
  )
}
