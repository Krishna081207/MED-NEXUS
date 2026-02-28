import { useState } from "react";
import { Link } from "react-router";
import { Button } from "@/react-app/components/ui/button";
import { Textarea } from "@/react-app/components/ui/textarea";
import { Card } from "@/react-app/components/ui/card";
import { ArrowLeft, Brain, Heart, Loader2, AlertCircle, CheckCircle } from "lucide-react";

interface AssessmentResult {
  mental_health: string;
  physical_health: string;
  overall_recommendation: string;
  risk_level: 'low' | 'moderate' | 'high';
}

export default function HealthAssessment() {
  const [mentalSymptoms, setMentalSymptoms] = useState("");
  const [physicalSymptoms, setPhysicalSymptoms] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [error, setError] = useState("");

  const handleAssess = async () => {
    if (!mentalSymptoms.trim() && !physicalSymptoms.trim()) {
      setError("Please enter at least one symptom to assess.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/assess-health", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mental_symptoms: mentalSymptoms,
          physical_symptoms: physicalSymptoms,
        }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setResult(data);
        setMentalSymptoms("");
        setPhysicalSymptoms("");
      }
    } catch (err) {
      setError("Failed to connect to assessment service. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case "low":
        return "text-green-600 dark:text-green-400";
      case "moderate":
        return "text-yellow-600 dark:text-yellow-400";
      case "high":
        return "text-red-600 dark:text-red-400";
      default:
        return "text-slate-600";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/50 dark:from-slate-950 dark:via-blue-950/20 dark:to-purple-950/30">
      {/* Header Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200/50 dark:border-slate-800/50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              HealthMate
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <Link to="/chat">
              <Button variant="ghost" size="sm">Chat</Button>
            </Link>
            <Link to="/assessment">
              <Button variant="ghost" size="sm" className="text-blue-600">Assessment</Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="flex-1 flex flex-col pt-20 max-w-4xl mx-auto w-full px-4 pb-8">
        {/* Header */}
        <div className="py-6">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Health Assessment</h1>
              <p className="text-slate-600 dark:text-slate-400">Assess your mental and physical health by describing your symptoms</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-6">
            {/* Mental Health Symptoms */}
            <Card className="p-6 bg-white dark:bg-slate-800 border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <Brain className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Mental Health</h2>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                Describe any mental health symptoms you're experiencing (stress, anxiety, mood changes, sleep issues, etc.)
              </p>
              <Textarea
                value={mentalSymptoms}
                onChange={(e) => setMentalSymptoms(e.target.value)}
                placeholder="E.g., I've been feeling anxious and having trouble sleeping for the past week..."
                className="min-h-[150px] bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600"
                disabled={isLoading}
              />
            </Card>

            {/* Physical Health Symptoms */}
            <Card className="p-6 bg-white dark:bg-slate-800 border-purple-200 dark:border-purple-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                  <Heart className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Physical Health</h2>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                Describe any physical symptoms you're experiencing (pain, fatigue, fever, digestive issues, etc.)
              </p>
              <Textarea
                value={physicalSymptoms}
                onChange={(e) => setPhysicalSymptoms(e.target.value)}
                placeholder="E.g., I have a persistent headache and mild body aches..."
                className="min-h-[150px] bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600"
                disabled={isLoading}
              />
            </Card>

            {/* Error Message */}
            {error && (
              <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
              </div>
            )}

            {/* Assess Button */}
            <Button
              onClick={handleAssess}
              disabled={isLoading || (!mentalSymptoms.trim() && !physicalSymptoms.trim())}
              className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold shadow-lg shadow-blue-500/25"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Get Assessment"
              )}
            </Button>
          </div>

          {/* Results Section */}
          <div>
            {isLoading ? (
              <Card className="p-8 bg-white dark:bg-slate-800 flex flex-col items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500 mb-4" />
                <p className="text-slate-600 dark:text-slate-400">Analyzing your health...</p>
              </Card>
            ) : result ? (
              <div className="space-y-4">
                {/* Risk Level*/}
                <Card className="p-6 bg-white dark:bg-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Risk Level</h3>
                    <div className={`flex items-center gap-2 ${getRiskColor(result.risk_level)}`}>
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-semibold capitalize">{result.risk_level}</span>
                    </div>
                  </div>
                </Card>

                {/* Mental Health Assessment */}
                <Card className="p-6 bg-gradient-to-br from-blue-50 to-transparent dark:from-blue-900/20 dark:to-transparent border-blue-200 dark:border-blue-800">
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white mb-3">
                    <Brain className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    Mental Health Analysis
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                    {result.mental_health}
                  </p>
                </Card>

                {/* Physical Health Assessment */}
                <Card className="p-6 bg-gradient-to-br from-purple-50 to-transparent dark:from-purple-900/20 dark:to-transparent border-purple-200 dark:border-purple-800">
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white mb-3">
                    <Heart className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    Physical Health Analysis
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                    {result.physical_health}
                  </p>
                </Card>

                {/* Overall Recommendation */}
                <Card className="p-6 bg-gradient-to-br from-emerald-50 to-transparent dark:from-emerald-900/20 dark:to-transparent border-emerald-200 dark:border-emerald-800">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">Recommendations</h3>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                    {result.overall_recommendation}
                  </p>
                </Card>

                <div className="pt-4">
                  <p className="text-xs text-slate-500 dark:text-slate-500 text-center">
                    ⚠️ This is not medical advice. Always consult a healthcare professional for proper diagnosis and treatment.
                  </p>
                </div>
              </div>
            ) : (
              <Card className="p-8 bg-white dark:bg-slate-800 flex flex-col items-center justify-center min-h-[400px] border-dashed">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-6 h-6 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">No Assessment Yet</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Describe your symptoms on the left to get an AI-powered health assessment.
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
