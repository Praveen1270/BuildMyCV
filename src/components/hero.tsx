import Link from "next/link";
import { ArrowUpRight, Check, FileText, Eye, Download } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 opacity-70" />

      <div className="relative pt-24 pb-32 sm:pt-32 sm:pb-40">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                <FileText className="w-4 h-4 mr-2" />
                Professional Resume Builder
              </div>
            </div>

            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-8 tracking-tight">
              Create Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Perfect Resume
              </span>{" "}
              in Minutes
            </h1>

            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Build a professional resume with our intuitive 6-step process.
              Real-time preview, multiple templates, and instant PDF export -
              everything you need to land your dream job.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                href="/resume-builder"
                className="inline-flex items-center px-8 py-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium shadow-lg"
              >
                Start Building Now
                <ArrowUpRight className="ml-2 w-5 h-5" />
              </Link>

              <Link
                href="#how-it-works"
                className="inline-flex items-center px-8 py-4 text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-lg font-medium"
              >
                See How It Works
              </Link>
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto mb-16">
              <div className="flex items-center justify-center gap-3 p-4 bg-white/60 rounded-lg backdrop-blur-sm">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">
                    6-Step Process
                  </div>
                  <div className="text-sm text-gray-600">Guided creation</div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 p-4 bg-white/60 rounded-lg backdrop-blur-sm">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Eye className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">
                    Live Preview
                  </div>
                  <div className="text-sm text-gray-600">Real-time updates</div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 p-4 bg-white/60 rounded-lg backdrop-blur-sm">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Download className="w-5 h-5 text-purple-600" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">PDF Export</div>
                  <div className="text-sm text-gray-600">Instant download</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>100% Free to use</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>No registration required</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>Professional templates</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
