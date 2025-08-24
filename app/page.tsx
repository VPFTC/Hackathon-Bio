"use client"

import { DeficiencyDetectLogo } from "@/components/deficiency-detect-logo"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function LandingPage() {
  const router = useRouter()

  const handleStartScreening = () => {
    router.push("/analyzer")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 to-white flex items-center justify-center px-6">
      <div className="text-center max-w-lg mx-auto">
        {/* Logo and Title */}
        <div className="mb-8 flex flex-col items-center gap-6">
          <DeficiencyDetectLogo />

          <div className="text-center">
            <h1 className="text-4xl font-bold text-slate-700 leading-tight font-sans">Deficiency</h1>
            <h1 className="text-4xl font-bold text-slate-700 leading-tight font-sans">Detection</h1>
          </div>
        </div>

        <p className="text-lg text-slate-600 leading-relaxed font-sans mb-8 max-w-md mx-auto">
          Check your skin, nails, hair, and mouth for deficiencies with the click of a button.
        </p>

        <Button
          onClick={handleStartScreening}
          className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 text-lg font-medium rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200"
          size="lg"
        >
          Start Screening
        </Button>
      </div>
    </div>
  )
}
