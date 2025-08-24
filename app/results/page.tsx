"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"
import { AlertTriangle, CheckCircle, Home } from "lucide-react"
import React from "react"

export default function ResultsPage() {
  const router = useRouter()
  const [results, setResults] = React.useState<any>(null)

  React.useEffect(() => {
    const stored = sessionStorage.getItem("ai_results")
    if (stored) {
      try {
        setResults(JSON.parse(stored))
      } catch (err) {
        console.error("Failed to parse stored results:", err)
      }
    }
  }, [])

  const handleStartOver = () => {
    sessionStorage.removeItem("ai_results") // clear results
    router.push("/")
  }

  if (!results) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <p className="text-slate-600 text-lg">
          No analysis results found. Please upload images to analyze.
        </p>
      </div>
    )
  }

  const best = results.best
  const allResults = results.results
  const reliabilityPercentage = Math.round(best.confidence_adjusted)
  const hasDeficiencies = allResults.some((r: any) => r.index !== 0) // assuming index 0 = "healthy"

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 to-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-700 text-center mb-8 font-sans">
          Analysis Results
        </h1>

        {/* Top Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 rounded-2xl shadow-lg">
            <div className="flex items-start gap-3 mb-4">
              {hasDeficiencies ? (
                <AlertTriangle className="h-6 w-6 text-amber-600 mt-1 flex-shrink-0" />
              ) : (
                <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
              )}
              <div>
                <h2 className="text-xl font-semibold text-slate-700 mb-2">
                  Potential Issues Detected
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  {hasDeficiencies
                    ? "Based on your photos, our AI has detected potential deficiencies or issues. See details below."
                    : "No significant deficiencies detected. Your photos appear healthy based on AI analysis."}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold text-slate-700 mb-4">Reliability Score</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Analysis Confidence</span>
                <span className="text-2xl font-bold text-teal-600">{reliabilityPercentage}%</span>
              </div>
              <Progress value={reliabilityPercentage} className="h-3 rounded-full" />
              <p className="text-sm text-slate-500">
                This score reflects how confident our AI is in the analysis based on image quality and visible indicators.
              </p>
            </div>
          </Card>
        </div>

        {/* Detailed Results */}
        <Card className="p-8 rounded-2xl shadow-lg mb-8">
          <h2 className="text-2xl font-semibold text-slate-700 mb-6">Detailed Analysis</h2>
          <div className="space-y-6 text-slate-600 leading-relaxed">
            {allResults.map((res: any) => (
              <div key={res.filename}>
                <h3 className="text-lg font-medium text-slate-700 mb-2">{res.filename}</h3>
                <p>Prediction: {res.class}</p>
                <p>Confidence: {res.confidence_adjusted}%</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <Button
            onClick={handleStartOver}
            variant="outline"
            className="px-6 py-3 rounded-xl border-slate-300 hover:bg-slate-50 bg-transparent"
          >
            <Home className="h-4 w-4 mr-2" />
            Start Over
          </Button>
          <Button
            onClick={() => window.print()}
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl"
          >
            Save Results
          </Button>
        </div>
      </div>
    </div>
  )
}
