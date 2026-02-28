import { Link } from "react-router";
import { Button } from "@/react-app/components/ui/button";
import { Heart, ArrowLeft, Stethoscope } from "lucide-react";

export default function DoctorsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/50 dark:from-slate-950 dark:via-emerald-950/20 dark:to-teal-950/30">
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
            <Link to="/reports">
              <Button variant="ghost" size="sm">Reports</Button>
            </Link>
            <Link to="/doctors">
              <Button variant="ghost" size="sm" className="text-emerald-600">Doctors</Button>
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
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/25">
              <Stethoscope className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                Connect with Doctors
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Find healthcare professionals
              </p>
            </div>
          </div>

          {/* Placeholder for doctor directory */}
          <div className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-800/50 shadow-xl min-h-[500px] flex items-center justify-center">
            <div className="text-center p-8">
              <Stethoscope className="w-16 h-16 text-purple-500/50 mx-auto mb-4" />
              <p className="text-slate-500 dark:text-slate-400 text-lg">
                Doctor directory coming soon...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
