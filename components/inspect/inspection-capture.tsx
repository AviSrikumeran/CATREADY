"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowLeft, Camera, Mic, MicOff, Check, X, ChevronRight } from "lucide-react";
import { Machine, inspectionCategories } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface InspectionCaptureProps {
  machine: Machine;
  onComplete: (photos: string[], notes: string) => void;
  onBack: () => void;
}

export function InspectionCapture({ machine, onComplete, onBack }: InspectionCaptureProps) {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [photosByCategory, setPhotosByCategory] = useState<Record<string, string[]>>({});
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [displayedTranscript, setDisplayedTranscript] = useState("");
  
  const currentCategory = inspectionCategories[currentCategoryIndex];
  const currentPhotos = photosByCategory[currentCategory.id] || [];
  const totalRequiredPhotos = inspectionCategories.reduce((sum, cat) => sum + cat.requiredPhotos, 0);
  const totalCapturedPhotos = Object.values(photosByCategory).flat().length;

  // Simulate voice recording with typing effect
  useEffect(() => {
    if (!isRecording) return;

    const sampleNotes = [
      "Left track tensioner showing minor hydraulic seepage.",
      "Recommend monitoring over next 48 hours.",
      "All other components appear within normal tolerance.",
    ];
    const fullText = sampleNotes.join(" ");
    let charIndex = 0;

    const interval = setInterval(() => {
      if (charIndex < fullText.length) {
        setDisplayedTranscript(fullText.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(interval);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [isRecording]);

  const handleCapturePhoto = () => {
    // Simulate photo capture
    const newPhoto = `photo-${Date.now()}`;
    setPhotosByCategory((prev) => ({
      ...prev,
      [currentCategory.id]: [...(prev[currentCategory.id] || []), newPhoto],
    }));
  };

  const handleRemovePhoto = (index: number) => {
    setPhotosByCategory((prev) => ({
      ...prev,
      [currentCategory.id]: prev[currentCategory.id]?.filter((_, i) => i !== index) || [],
    }));
  };

  const handleToggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      setTranscript(displayedTranscript);
    } else {
      setIsRecording(true);
      setDisplayedTranscript("");
    }
  };

  const handleNextCategory = () => {
    if (currentCategoryIndex < inspectionCategories.length - 1) {
      setCurrentCategoryIndex(currentCategoryIndex + 1);
    }
  };

  const handlePrevCategory = () => {
    if (currentCategoryIndex > 0) {
      setCurrentCategoryIndex(currentCategoryIndex - 1);
    }
  };

  const handleSubmit = () => {
    const allPhotos = Object.values(photosByCategory).flat();
    onComplete(allPhotos, transcript || displayedTranscript);
  };

  const canSubmit = totalCapturedPhotos >= totalRequiredPhotos * 0.5; // Allow submit if at least 50% photos captured

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-border">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onBack}
              className="p-2 -ml-2 hover:bg-cat-gray rounded transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">{machine.id}</p>
              <h1 className="text-lg font-bold text-cat-black">{machine.name}</h1>
            </div>
            <div className="w-10" /> {/* Spacer */}
          </div>

          {/* Progress */}
          <div className="flex items-center gap-2 mb-2">
            <div className="flex-1 h-2 bg-cat-gray rounded overflow-hidden">
              <div
                className="h-full bg-cat-yellow transition-all"
                style={{
                  width: `${((currentCategoryIndex + 1) / inspectionCategories.length) * 100}%`,
                }}
              />
            </div>
            <span className="text-sm font-medium text-muted-foreground">
              {currentCategoryIndex + 1}/{inspectionCategories.length}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Category Header */}
        <div className="px-4 py-4 bg-cat-gray">
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevCategory}
              disabled={currentCategoryIndex === 0}
              className="p-2 hover:bg-white rounded disabled:opacity-30 disabled:pointer-events-none"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="text-center">
              <h2 className="text-xl font-black text-cat-black">
                {currentCategory.name}
              </h2>
              <p className="text-sm text-muted-foreground">
                {currentPhotos.length}/{currentCategory.requiredPhotos} photos required
              </p>
            </div>
            <button
              onClick={handleNextCategory}
              disabled={currentCategoryIndex === inspectionCategories.length - 1}
              className="p-2 hover:bg-white rounded disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Camera View / Photo Grid */}
        <div className="flex-1 p-4">
          {/* Photo Grid */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {currentPhotos.map((photo, index) => (
              <div
                key={photo}
                className="aspect-square bg-cat-gray rounded relative overflow-hidden"
              >
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  <Camera className="h-8 w-8 opacity-30" />
                </div>
                <button
                  onClick={() => handleRemovePhoto(index)}
                  className="absolute top-1 right-1 p-1 bg-cat-red text-white rounded"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="absolute bottom-1 left-1 px-2 py-0.5 bg-cat-black/70 text-white text-xs rounded">
                  Photo {index + 1}
                </div>
              </div>
            ))}
            
            {/* Add Photo Button */}
            <button
              onClick={handleCapturePhoto}
              className="aspect-square bg-cat-yellow hover:brightness-95 rounded flex flex-col items-center justify-center transition-all"
            >
              <Camera className="h-8 w-8 text-cat-black" />
              <span className="text-xs font-bold text-cat-black mt-1">Add Photo</span>
            </button>
          </div>

          {/* Checklist Items */}
          <div className="mb-6">
            <p className="text-sm font-medium text-muted-foreground mb-2">
              Check these items:
            </p>
            <div className="flex flex-wrap gap-2">
              {currentCategory.items.map((item) => (
                <span
                  key={item}
                  className="px-3 py-1 bg-cat-gray text-cat-black text-sm rounded"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Voice Notes */}
          <div className="bg-cat-gray rounded p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-cat-black">Voice Notes</span>
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "w-2 h-2 rounded-full",
                    isRecording ? "bg-cat-red animate-pulse" : "bg-gray-300"
                  )}
                />
                <span className="text-xs text-muted-foreground">
                  {isRecording ? "Recording..." : "Tap to record"}
                </span>
              </div>
            </div>

            {/* Transcript Display */}
            <div className="bg-white rounded p-3 min-h-[80px] mb-3">
              <p className="text-sm text-cat-black leading-relaxed">
                {displayedTranscript || transcript || (
                  <span className="text-muted-foreground italic">
                    Speak your inspection findings...
                  </span>
                )}
                {isRecording && (
                  <span className="inline-block w-0.5 h-4 bg-cat-yellow ml-1 animate-pulse" />
                )}
              </p>
            </div>

            {/* Record Button */}
            <button
              onClick={handleToggleRecording}
              className={cn(
                "w-full py-4 rounded font-bold flex items-center justify-center gap-2 transition-all",
                isRecording
                  ? "bg-cat-red text-white"
                  : "bg-cat-black text-white"
              )}
            >
              {isRecording ? (
                <>
                  <MicOff className="h-5 w-5" />
                  Stop Recording
                </>
              ) : (
                <>
                  <Mic className="h-5 w-5" />
                  Start Voice Note
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-white border-t border-border p-4">
          <div className="flex gap-3">
            <button
              onClick={handleNextCategory}
              disabled={currentCategoryIndex === inspectionCategories.length - 1}
              className="flex-1 py-4 bg-cat-gray text-cat-black font-bold rounded disabled:opacity-50"
            >
              Next Category
            </button>
            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className={cn(
                "flex-1 py-4 font-bold rounded flex items-center justify-center gap-2",
                canSubmit
                  ? "bg-cat-yellow text-cat-black"
                  : "bg-gray-200 text-gray-400"
              )}
            >
              <Check className="h-5 w-5" />
              Submit Inspection
            </button>
          </div>
          <p className="text-xs text-center text-muted-foreground mt-2">
            {totalCapturedPhotos} of {totalRequiredPhotos} required photos captured
          </p>
        </div>
      </div>
    </div>
  );
}
