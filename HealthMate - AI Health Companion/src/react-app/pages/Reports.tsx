import { useState, useCallback } from "react";
import { Link } from "react-router";
import { Button } from "@/react-app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/react-app/components/ui/card";
import { Heart, ArrowLeft, FileText, Upload, Loader2, AlertCircle, CheckCircle, FileCheck } from "lucide-react";


interface AnalysisResult {
  summary: string;
  key_findings: string;
  recommendations: string;
  plain_language_explanation: string;
  error?: string;
}

export default function ReportsPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState("");

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files[0];
    if (f?.name.toLowerCase().endsWith(".pdf")) {
      setFile(f);
      setResult(null);
      setError("");
    } else {
      setError("Please upload a PDF file.");
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f?.name.toLowerCase().endsWith(".pdf")) {
      setFile(f);
      setResult(null);
      setError("");
    } else if (f) {
      setError("Please upload a PDF file.");
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setError("");
    setIsLoading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/analyze-report", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Analysis failed");
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to analyze report. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setResult(null);
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-pink-50/50 dark:from-slate-950 dark:via-indigo-950/20 dark:to-pink-950/30">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200/50 dark:border-slate-800/50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/25">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              HealthMate
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <Link to="/chat">
              <Button variant="ghost" size="sm">Chat</Button>
            </Link>
            <Link to="/assessment">
              <Button variant="ghost" size="sm">Assessment</Button>
            </Link>
            <Link to="/reports">
              <Button variant="ghost" size="sm" className="text-emerald-600">Reports</Button>
            </Link>
            <Link to="/doctors">
              <Button variant="ghost" size="sm">Doctors</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-pink-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <FileText className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                Health Report Analysis
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Upload your PDF health reports for AI-powered insights
              </p>
            </div>
          </div>

          {/* Upload Zone */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`relative rounded-2xl border-2 border-dashed transition-all duration-200 ${
              isDragging
                ? "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30"
                : "border-slate-300 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-600"
            } bg-white/80 dark:bg-slate-900/60 backdrop-blur-sm min-h-[280px] flex flex-col items-center justify-center p-8`}
          >
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileSelect}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            {file ? (
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
                  <FileCheck className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <p className="font-medium text-slate-900 dark:text-white">{file.name}</p>
                <p className="text-sm text-slate-500">{(file.size / 1024).toFixed(1)} KB</p>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault();
                      handleReset();
                    }}
                  >
                    Remove
                  </Button>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-indigo-500 to-pink-600 hover:from-indigo-600 hover:to-pink-700 text-white"
                    onClick={(e) => {
                      e.preventDefault();
                      handleAnalyze();
                    }}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      "Analyze Report"
                    )}
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="w-16 h-16 rounded-2xl bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center mb-4">
                  <Upload className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <p className="text-lg font-medium text-slate-700 dark:text-slate-300">
                  Drop your PDF here or click to browse
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Supports health reports, lab results, and medical documents
                </p>
              </>
            )}
          </div>

          {error && (
            <div className="mt-4 flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
            </div>
          )}

          {/* Results */}
          {result && (
            <div className="mt-8 space-y-6">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                <CheckCircle className="w-5 h-5" />
                <span className="font-semibold">Analysis Complete</span>
              </div>

              <Card className="bg-white/80 dark:bg-slate-900/60 border-slate-200/50 dark:border-slate-800/50">
                <CardHeader>
                  <CardTitle className="text-lg">Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                    {result.summary}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 dark:bg-slate-900/60 border-slate-200/50 dark:border-slate-800/50">
                <CardHeader>
                  <CardTitle className="text-lg">Key Findings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                    {result.key_findings}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 dark:bg-slate-900/60 border-slate-200/50 dark:border-slate-800/50">
                <CardHeader>
                  <CardTitle className="text-lg">Plain Language Explanation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                    {result.plain_language_explanation}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-indigo-50 to-pink-50 dark:from-indigo-950/30 dark:to-pink-950/30 border-indigo-200/50 dark:border-indigo-800/50">
                <CardHeader>
                  <CardTitle className="text-lg">Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                    {result.recommendations}
                  </p>
                </CardContent>
              </Card>

              <p className="text-xs text-slate-500 dark:text-slate-500 text-center pt-4">
                ⚠️ This analysis is for informational purposes only. Always consult a healthcare professional for medical decisions.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
