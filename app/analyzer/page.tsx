"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, X, ChevronLeft, ChevronRight, Check, Camera } from "lucide-react"
import { useRouter } from "next/navigation"

type BodyPart = "skin" | "nail" | "hair" | "mouth" | "eyes"

export default function HealthAnalyzer() {
  const router = useRouter()
  const [uploadedFiles, setUploadedFiles] = useState<Record<BodyPart, File[]>>({
    skin: [],
    nail: [],
    hair: [],
    mouth: [],
    eyes: [],
  })
  const [currentBodyPart, setCurrentBodyPart] = useState<BodyPart>("skin")
  const [completedParts, setCompletedParts] = useState<Set<BodyPart>>(new Set())
  const cameraInputRef = useRef<HTMLInputElement>(null)

  const bodyParts: BodyPart[] = ["skin", "nail", "hair", "mouth", "eyes"]
  const bodyPartLabels = {
    skin: "Skin",
    nail: "Nails",
    hair: "Hair",
    mouth: "Mouth",
    eyes: "Eyes",
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    if (files.length > 0) {
      setUploadedFiles((prev) => ({
        ...prev,
        [currentBodyPart]: [...prev[currentBodyPart], ...files],
      }))

      const newCompleted = new Set(completedParts)
      newCompleted.add(currentBodyPart)
      setCompletedParts(newCompleted)

      const currentIndex = bodyParts.indexOf(currentBodyPart)
      const nextPart = bodyParts.find((part, index) => index > currentIndex && !newCompleted.has(part))
      if (nextPart) {
        setCurrentBodyPart(nextPart)
      }
    }
  }

  const handleCameraCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    if (files.length > 0) {
      setUploadedFiles((prev) => ({
        ...prev,
        [currentBodyPart]: [...prev[currentBodyPart], ...files],
      }))

      const newCompleted = new Set(completedParts)
      newCompleted.add(currentBodyPart)
      setCompletedParts(newCompleted)

      const currentIndex = bodyParts.indexOf(currentBodyPart)
      const nextPart = bodyParts.find((part, index) => index > currentIndex && !newCompleted.has(part))
      if (nextPart) {
        setCurrentBodyPart(nextPart)
      }
    }
  }

  const removeFile = (bodyPart: BodyPart, index: number) => {
    setUploadedFiles((prev) => ({
      ...prev,
      [bodyPart]: prev[bodyPart].filter((_, i) => i !== index),
    }))
  }

  const navigateBodyPart = (direction: "prev" | "next") => {
    const currentIndex = bodyParts.indexOf(currentBodyPart)
    if (direction === "prev" && currentIndex > 0) {
      setCurrentBodyPart(bodyParts[currentIndex - 1])
    } else if (direction === "next" && currentIndex < bodyParts.length - 1) {
      setCurrentBodyPart(bodyParts[currentIndex + 1])
    }
  }

  const handleBeginAnalysis = () => {
    router.push("/analysis")
  }

  const currentFiles = uploadedFiles[currentBodyPart]
  const totalFiles = Object.values(uploadedFiles).flat().length

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 to-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-700 text-center mb-12 font-sans">Health Analyzer</h1>

        <div className="flex items-center justify-center gap-12 mb-12">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigateBodyPart("prev")}
            disabled={bodyParts.indexOf(currentBodyPart) === 0}
            className="rounded-full w-32 h-32"
          >
            <ChevronLeft className="h-20 w-20" />
          </Button>

          <Card className="w-[500px] p-12 rounded-3xl shadow-lg">
            <div className="text-center">
              <div className="border-2 border-dashed border-teal-300 rounded-2xl p-12 mb-6">
                <Upload className="h-16 w-16 text-teal-500 mx-auto mb-6" />
                <p className="text-slate-600 mb-6 text-lg">Upload {bodyPartLabels[currentBodyPart]} photo</p>
                <div className="flex gap-4 justify-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                    multiple
                  />
                  <label
                    htmlFor="file-upload"
                    className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 text-lg rounded-xl cursor-pointer inline-block transition-colors"
                  >
                    Choose Files
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleCameraCapture}
                    className="hidden"
                    id="camera-capture"
                    ref={cameraInputRef}
                  />
                  <label
                    htmlFor="camera-capture"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg rounded-xl cursor-pointer inline-flex items-center gap-2 transition-colors"
                  >
                    <Camera className="h-5 w-5" />
                    Take Photo
                  </label>
                </div>
              </div>
              {currentFiles.length > 0 && (
                <div className="space-y-3">
                  <p className="text-sm text-slate-500 mb-2">
                    {currentFiles.length} file(s) for {bodyPartLabels[currentBodyPart]}
                  </p>
                  {currentFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-slate-50 p-3 rounded-xl">
                      <span className="text-base text-slate-600 truncate">{file.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(currentBodyPart, index)}
                        className="text-red-500 hover:text-red-700 rounded-full"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigateBodyPart("next")}
            disabled={bodyParts.indexOf(currentBodyPart) === bodyParts.length - 1}
            className="rounded-full w-32 h-32"
          >
            <ChevronRight className="h-20 w-20" />
          </Button>
        </div>

        <div className="flex justify-center gap-6 mb-12">
          {bodyParts.map((part) => (
            <Card
              key={part}
              className={`p-6 rounded-2xl transition-all cursor-pointer ${
                currentBodyPart === part ? "bg-teal-100 border-teal-300 shadow-md" : "bg-white hover:bg-slate-50"
              }`}
              onClick={() => setCurrentBodyPart(part)}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                    completedParts.has(part) ? "bg-teal-600 border-teal-600" : "border-slate-300"
                  }`}
                >
                  {completedParts.has(part) && <Check className="h-5 w-5 text-white" />}
                </div>
                <span className="text-slate-700 font-medium text-lg">{bodyPartLabels[part]}</span>
                {uploadedFiles[part].length > 0 && (
                  <span className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded-full">
                    {uploadedFiles[part].length}
                  </span>
                )}
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            onClick={handleBeginAnalysis}
            disabled={totalFiles === 0}
            className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 text-lg font-medium rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200"
            size="lg"
          >
            Begin Analysis
          </Button>
        </div>
      </div>
    </div>
  )
}
