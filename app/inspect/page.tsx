"use client";

import { useState } from "react";
import { MachineSelection } from "@/components/inspect/machine-selection";
import { InspectionCapture } from "@/components/inspect/inspection-capture";
import { InspectionResults } from "@/components/inspect/inspection-results";
import { machines, Machine, mockInspectionResult } from "@/lib/mock-data";

type Step = "select" | "capture" | "processing" | "results";

export default function InspectPage() {
  const [step, setStep] = useState<Step>("select");
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);
  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([]);
  const [voiceNotes, setVoiceNotes] = useState<string>("");

  const handleMachineSelect = (machine: Machine) => {
    setSelectedMachine(machine);
    setStep("capture");
  };

  const handleCaptureComplete = (photos: string[], notes: string) => {
    setCapturedPhotos(photos);
    setVoiceNotes(notes);
    setStep("processing");
    
    // Simulate AI processing
    setTimeout(() => {
      setStep("results");
    }, 2500);
  };

  const handleNewInspection = () => {
    setStep("select");
    setSelectedMachine(null);
    setCapturedPhotos([]);
    setVoiceNotes("");
  };

  return (
    <div className="min-h-screen">
      {step === "select" && (
        <MachineSelection
          machines={machines}
          onSelect={handleMachineSelect}
        />
      )}

      {step === "capture" && selectedMachine && (
        <InspectionCapture
          machine={selectedMachine}
          onComplete={handleCaptureComplete}
          onBack={() => setStep("select")}
        />
      )}

      {step === "processing" && (
        <ProcessingScreen machine={selectedMachine} />
      )}

      {step === "results" && selectedMachine && (
        <InspectionResults
          machine={selectedMachine}
          result={mockInspectionResult}
          onNewInspection={handleNewInspection}
        />
      )}
    </div>
  );
}

function ProcessingScreen({ machine }: { machine: Machine | null }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-cat-gray">
      <div className="text-center">
        {/* Loading Triangle */}
        <div className="mb-8">
          <svg
            viewBox="0 0 60 52"
            className="w-16 h-16 mx-auto animate-pulse"
          >
            <polygon
              points="30,0 60,52 0,52"
              fill="#FFCD11"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-black text-cat-black mb-2">
          Analyzing Inspection
        </h2>
        <p className="text-muted-foreground mb-8">
          {machine?.name || "Machine"}
        </p>

        {/* Progress bar */}
        <div className="w-64 h-2 bg-white rounded overflow-hidden mx-auto">
          <div className="h-full bg-cat-yellow animate-[progress_2.5s_ease-in-out]" />
        </div>

        <style jsx>{`
          @keyframes progress {
            0% { width: 0%; }
            100% { width: 100%; }
          }
        `}</style>
      </div>
    </div>
  );
}
