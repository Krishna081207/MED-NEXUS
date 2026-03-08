import { useState } from "react";
import { Link } from "react-router";
import { Button } from "@/react-app/components/ui/button";
import { Card } from "@/react-app/components/ui/card";
import { Input } from "@/react-app/components/ui/input";
import { Heart, ArrowLeft, Stethoscope, Search, MapPin, Star, Video, Phone } from "lucide-react";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  location: string;
  available: string;
  image?: string;
  bio: string;
}

const DOCTORS: Doctor[] = [
  {
    id: "1",
    name: "Dr. Sarah Chen",
    specialty: "General Practice",
    rating: 4.9,
    reviews: 234,
    location: "San Francisco, CA",
    available: "Available today",
    bio: "Board-certified physician with 12 years of experience. Focus on preventive care and chronic disease management.",
  },
  {
    id: "2",
    name: "Dr. Michael Rodriguez",
    specialty: "Cardiology",
    rating: 4.8,
    reviews: 189,
    location: "Los Angeles, CA",
    available: "Tomorrow",
    bio: "Specialist in heart health and cardiovascular conditions. Passionate about patient education.",
  },
  {
    id: "3",
    name: "Dr. Emily Watson",
    specialty: "Mental Health",
    rating: 5.0,
    reviews: 312,
    location: "New York, NY",
    available: "Available today",
    bio: "Psychiatrist and therapist. Expertise in anxiety, depression, and stress management.",
  },
  {
    id: "4",
    name: "Dr. James Okonkwo",
    specialty: "Internal Medicine",
    rating: 4.7,
    reviews: 156,
    location: "Chicago, IL",
    available: "This week",
    bio: "Comprehensive internal medicine with focus on diabetes, hypertension, and wellness.",
  },
  {
    id: "5",
    name: "Dr. Priya Sharma",
    specialty: "Pediatrics",
    rating: 4.9,
    reviews: 278,
    location: "Houston, TX",
    available: "Available today",
    bio: "Caring for children from infancy through adolescence. Vaccinations and developmental care.",
  },
  {
    id: "6",
    name: "Dr. David Kim",
    specialty: "Dermatology",
    rating: 4.6,
    reviews: 98,
    location: "Seattle, WA",
    available: "Next week",
    bio: "Skin health, acne treatment, and dermatological conditions. Board-certified dermatologist.",
  },
];

export default function DoctorsPage() {
  const [search, setSearch] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState<string>("all");

  const specialties = ["all", ...new Set(DOCTORS.map((d) => d.specialty))];

  const filteredDoctors = DOCTORS.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(search.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(search.toLowerCase()) ||
      doctor.location.toLowerCase().includes(search.toLowerCase());
    const matchesSpecialty =
      specialtyFilter === "all" || doctor.specialty === specialtyFilter;
    return matchesSearch && matchesSpecialty;
  });

  const handleConnect = (doctor: Doctor) => {
    // In a real app, this would open a booking modal or redirect to a booking service
    alert(`Connecting to ${doctor.name}...\n\nIn a full implementation, this would open a booking flow or video consultation.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-rose-50/50 dark:from-slate-950 dark:via-purple-950/20 dark:to-rose-950/30">
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
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-rose-600 flex items-center justify-center shadow-lg shadow-purple-500/25">
              <Stethoscope className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                Connect with Doctors
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Find healthcare professionals for consultations
              </p>
            </div>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                placeholder="Search by name, specialty, or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 h-12 bg-white/80 dark:bg-slate-900/60 border-slate-200 dark:border-slate-700"
              />
            </div>
            <select
              value={specialtyFilter}
              onChange={(e) => setSpecialtyFilter(e.target.value)}
              className="h-12 px-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/60 text-slate-900 dark:text-white"
            >
              {specialties.map((s) => (
                <option key={s} value={s}>
                  {s === "all" ? "All Specialties" : s}
                </option>
              ))}
            </select>
          </div>

          {/* Doctor Cards */}
          <div className="space-y-6">
            {filteredDoctors.length === 0 ? (
              <Card className="p-12 text-center bg-white/80 dark:bg-slate-900/60">
                <Stethoscope className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600 dark:text-slate-400">
                  No doctors match your search. Try adjusting your filters.
                </p>
              </Card>
            ) : (
              filteredDoctors.map((doctor) => (
                <Card
                  key={doctor.id}
                  className="bg-white/80 dark:bg-slate-900/60 border-slate-200/50 dark:border-slate-800/50 overflow-hidden hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-48 flex-shrink-0 p-6 flex items-center justify-center bg-gradient-to-br from-purple-100 to-rose-100 dark:from-purple-900/30 dark:to-rose-900/30">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-rose-600 flex items-center justify-center text-2xl font-bold text-white">
                        {doctor.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div>
                          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                            {doctor.name}
                          </h2>
                          <p className="text-purple-600 dark:text-purple-400 font-medium">
                            {doctor.specialty}
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-slate-600 dark:text-slate-400">
                            <span className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                              {doctor.rating} ({doctor.reviews} reviews)
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {doctor.location}
                            </span>
                          </div>
                          <p className="text-sm text-slate-500 dark:text-slate-500 mt-2">
                            {doctor.available}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-purple-200 dark:border-purple-800"
                          >
                            <Phone className="w-4 h-4 mr-2" />
                            Call
                          </Button>
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-purple-500 to-rose-600 hover:from-purple-600 hover:to-rose-700 text-white"
                            onClick={() => handleConnect(doctor)}
                          >
                            <Video className="w-4 h-4 mr-2" />
                            Connect
                          </Button>
                        </div>
                      </div>
                      <p className="mt-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {doctor.bio}
                      </p>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-500 text-center mt-8">
            This is a demo directory. In production, connect to a real healthcare provider network.
          </p>
        </div>
      </div>
    </div>
  );
}
