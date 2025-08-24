"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function AnalysisPage() {
  const router = useRouter()
  const [isAnalyzing, setIsAnalyzing] = useState(true)

  useEffect(() => {
    // Simulate AI analysis time
    const timer = setTimeout(() => {
      setIsAnalyzing(false)
      // Redirect to results page after analysis
      router.push("/results")
    }, 3000) // 3 second analysis simulation

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 to-white flex items-center justify-center px-6">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-8">
          <Loader2 className="h-16 w-16 text-teal-600 animate-spin mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-slate-700 mb-4 font-sans">Analyzing</h1>
          <p className="text-lg text-slate-600 leading-relaxed font-sans">
            Our AI is carefully examining your photos for potential deficiency indicators...
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-3 h-3 bg-teal-600 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-teal-600 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
            <div className="w-3 h-3 bg-teal-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          </div>
          <p className="text-sm text-slate-500 mt-4">This may take a few moments</p>
        </div>
      </div>
    </div>
  )
}
