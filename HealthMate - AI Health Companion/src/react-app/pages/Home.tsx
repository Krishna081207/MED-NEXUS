import { Link } from "react-router";
import { Button } from "@/react-app/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/react-app/components/ui/card";
import { MessageCircleHeart, FileText, Stethoscope, Heart, Shield, Sparkles } from "lucide-react";

export default function HomePage() {
  const features = [
    {
      icon: MessageCircleHeart,
      title: "AI Health Companion",
      description: "Chat with our AI assistant about your health concerns, share your feelings, and get supportive guidance anytime.",
      link: "/chat",
      color: "from-emerald-500 to-teal-600",
    },
    {
      icon: FileText,
      title: "Health Report Analysis",
      description: "Upload your health reports and get instant AI-powered insights and explanations in simple language.",
      link: "/reports",
      color: "from-blue-500 to-indigo-600",
    },
    {
      icon: Stethoscope,
      title: "Connect with Doctors",
      description: "Find and connect with healthcare professionals for consultations and expert medical advice.",
      link: "/doctors",
      color: "from-purple-500 to-pink-600",
    },
  ];

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
              <Button variant="ghost" size="sm">Doctors</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            AI-Powered Health Assistant
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
            Your Personal
            <span className="block bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
              Health Companion
            </span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Talk about your health, analyze reports with AI, and connect with healthcare professionals — all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/chat">
              <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg shadow-emerald-500/25 px-8">
                <MessageCircleHeart className="w-5 h-5 mr-2" />
                Start Chatting
              </Button>
            </Link>
            <Link to="/reports">
              <Button size="lg" variant="outline" className="px-8 border-slate-300 dark:border-slate-700">
                <FileText className="w-5 h-5 mr-2" />
                Upload Report
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Everything You Need for Better Health
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Comprehensive health support powered by artificial intelligence
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <Link key={feature.title} to={feature.link} className="group">
                <Card className="h-full bg-white/70 dark:bg-slate-900/50 backdrop-blur-sm border-slate-200/50 dark:border-slate-800/50 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                    <CardTitle className="text-xl text-slate-900 dark:text-white">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-transparent to-emerald-50/50 dark:to-emerald-950/20">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-sm border-slate-200/50 dark:border-slate-800/50 overflow-hidden">
            <div className="p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0 shadow-2xl shadow-emerald-500/30">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                  Your Privacy Matters
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Your health data is encrypted and secure. Our AI provides supportive guidance but is not a replacement for professional medical advice. Always consult healthcare providers for medical decisions.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-200/50 dark:border-slate-800/50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-emerald-500" />
            <span className="text-slate-600 dark:text-slate-400">HealthMate</span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-500">
            Not a substitute for professional medical advice
          </p>
        </div>
      </footer>
    </div>
  );
}
