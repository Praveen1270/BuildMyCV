import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import {
  ArrowUpRight,
  CheckCircle2,
  FileText,
  Eye,
  Download,
  User,
  GraduationCap,
  Briefcase,
  Award,
  Code,
  Trophy,
} from "lucide-react";
import { createClient } from "../../supabase/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const steps = [
    {
      icon: <User className="w-6 h-6" />,
      title: "Personal Info",
      description: "Add your contact details and professional summary",
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Education",
      description: "List your educational background and qualifications",
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "Experience",
      description: "Showcase your work history and achievements",
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Skills",
      description: "Highlight your technical and soft skills",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Projects",
      description: "Display your notable projects and contributions",
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Awards",
      description: "Add certifications, awards, and recognitions",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <Hero />

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              How It Works
            </Badge>
            <h2 className="text-3xl font-bold mb-4">
              Build Your Resume in 6 Simple Steps
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our intuitive process guides you through creating a professional
              resume with real-time preview and validation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {steps.map((step, index) => (
              <Card
                key={index}
                className="relative hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                      {step.icon}
                    </div>
                    <Badge variant="secondary">Step {index + 1}</Badge>
                  </div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    {step.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Progress Demo */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Resume Progress</h3>
                <span className="text-sm text-gray-600">Step 3 of 6</span>
              </div>
              <Progress value={50} className="mb-4" />
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Eye className="w-4 h-4" />
                <span>Live preview updates as you type</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Why Choose Our Resume Builder
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Professional features designed to help you create the perfect
              resume and land your dream job.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FileText className="w-6 h-6" />,
                title: "Multi-Step Form",
                description: "Guided process with validation at each step",
              },
              {
                icon: <Eye className="w-6 h-6" />,
                title: "Live Preview",
                description: "See your resume update in real-time",
              },
              {
                icon: <Download className="w-6 h-6" />,
                title: "PDF Export",
                description: "Download professional PDF instantly",
              },
              {
                icon: <CheckCircle2 className="w-6 h-6" />,
                title: "Form Validation",
                description: "Ensure all information is complete and correct",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-md transition-shadow"
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-blue-100">Resumes Created</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-blue-100">Success Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">5 Min</div>
              <div className="text-blue-100">Average Build Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Build Your Perfect Resume?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of job seekers who have successfully created
            professional resumes with our builder.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/resume-builder"
              className="inline-flex items-center px-8 py-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium shadow-lg"
            >
              Start Building Now
              <ArrowUpRight className="ml-2 w-5 h-5" />
            </a>
            <div className="text-sm text-gray-500">
              No registration required • 100% Free
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
