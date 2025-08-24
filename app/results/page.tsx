"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"
import { AlertTriangle, CheckCircle, Home } from "lucide-react"

export default function ResultsPage() {
  const router = useRouter()

  // Placeholder data - will be replaced with AI results
  const reliabilityPercentage = 87
  const hasDeficiencies = true

  const handleStartOver = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 to-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-700 text-center mb-8 font-sans">Analysis Results</h1>

        {/* Top Section - Problem Summary and Reliability */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Problem Summary Box */}
          <Card className="p-6 rounded-2xl shadow-lg">
            <div className="flex items-start gap-3 mb-4">
              {hasDeficiencies ? (
                <AlertTriangle className="h-6 w-6 text-amber-600 mt-1 flex-shrink-0" />
              ) : (
                <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
              )}
              <div>
                <h2 className="text-xl font-semibold text-slate-700 mb-2">Potential Issues Detected</h2>
                <p className="text-slate-600 leading-relaxed">
                  Based on your photos, our AI has identified potential signs of vitamin D deficiency and iron
                  deficiency. These findings suggest you may benefit from dietary adjustments or supplements.
                </p>
              </div>
            </div>
          </Card>

          {/* Reliability Percentage Box */}
          <Card className="p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold text-slate-700 mb-4">Reliability Score</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Analysis Confidence</span>
                <span className="text-2xl font-bold text-teal-600">{reliabilityPercentage}%</span>
              </div>
              <Progress value={reliabilityPercentage} className="h-3 rounded-full" />
              <p className="text-sm text-slate-500">
                This score reflects how confident our AI is in the analysis based on image quality and visible
                indicators.
              </p>
            </div>
          </Card>
        </div>

        {/* Bottom Section - Detailed Description */}
        <Card className="p-8 rounded-2xl shadow-lg mb-8">
          <h2 className="text-2xl font-semibold text-slate-700 mb-6">Detailed Analysis</h2>
          <div className="space-y-6 text-slate-600 leading-relaxed">
            <div>
              <h3 className="text-lg font-medium text-slate-700 mb-2">Vitamin D Deficiency Indicators</h3>
              <p>
                Your skin analysis shows signs of dullness and potential texture changes that may indicate vitamin D
                deficiency. The nail examination revealed possible brittleness and slow growth patterns. Consider
                increasing sun exposure or discussing vitamin D supplementation with your healthcare provider.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-slate-700 mb-2">Iron Deficiency Signs</h3>
              <p>
                The analysis of your nail beds and overall skin tone suggests potential iron deficiency. Pale nail beds
                and subtle changes in skin coloration were detected. Iron-rich foods like leafy greens, lean meats, and
                legumes may help address this deficiency.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-slate-700 mb-2">Recommendations</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Consult with a healthcare professional for proper testing and diagnosis</li>
                <li>Consider a balanced diet rich in vitamins and minerals</li>
                <li>Monitor symptoms and track any changes over time</li>
                <li>Follow up with another screening in 4-6 weeks</li>
              </ul>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-6">
              <p className="text-amber-800 text-sm">
                <strong>Disclaimer:</strong> This analysis is for informational purposes only and should not replace
                professional medical advice. Always consult with a qualified healthcare provider for proper diagnosis
                and treatment recommendations.
              </p>
            </div>
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
