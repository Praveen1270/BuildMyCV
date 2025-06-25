"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PersonalInfoStep } from "@/components/resume/personal-info-step";
import { EducationStep } from "@/components/resume/education-step";
import { ExperienceStep } from "@/components/resume/experience-step";
import { SkillsStep } from "@/components/resume/skills-step";
import { ProjectsStep } from "@/components/resume/projects-step";
import { AwardsStep } from "@/components/resume/awards-step";
import { ResumePreview } from "@/components/resume/resume-preview";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    summary: string;
  };
  education: Array<{
    id: string;
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    gpa?: string;
  }>;
  experience: Array<{
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
    current: boolean;
  }>;
  skills: Array<{
    id: string;
    name: string;
    level: string;
  }>;
  projects: Array<{
    id: string;
    name: string;
    description: string;
    technologies: string;
    url?: string;
  }>;
  awards: Array<{
    id: string;
    title: string;
    organization: string;
    date: string;
    description: string;
  }>;
}

const STEPS = [
  { id: 1, title: "Personal Info", description: "Basic information" },
  { id: 2, title: "Education", description: "Academic background" },
  { id: 3, title: "Experience", description: "Work history" },
  { id: 4, title: "Skills", description: "Technical & soft skills" },
  { id: 5, title: "Projects", description: "Portfolio projects" },
  { id: 6, title: "Awards", description: "Achievements & honors" },
];

export default function ResumeBuilder() {
  const [currentStep, setCurrentStep] = useState(1);
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      summary: "",
    },
    education: [],
    experience: [],
    skills: [],
    projects: [],
    awards: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  const updateResumeData = (section: keyof ResumeData, data: any) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: data,
    }));
  };

  const saveResume = async () => {
    try {
      setIsLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/sign-in");
        return;
      }

      const { error } = await supabase.from("resumes").upsert({
        user_id: user.id,
        personal_info: resumeData.personalInfo,
        education: resumeData.education,
        experience: resumeData.experience,
        skills: resumeData.skills,
        projects: resumeData.projects,
        awards: resumeData.awards,
        updated_at: new Date().toISOString(),
      });

      if (error) throw error;
    } catch (error) {
      console.error("Error saving resume:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadResume = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("resumes")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (data && !error) {
        setResumeData({
          personalInfo: data.personal_info || resumeData.personalInfo,
          education: data.education || [],
          experience: data.experience || [],
          skills: data.skills || [],
          projects: data.projects || [],
          awards: data.awards || [],
        });
      }
    } catch (error) {
      console.error("Error loading resume:", error);
    }
  };

  useEffect(() => {
    loadResume();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      saveResume();
    }, 1000);

    return () => clearTimeout(timer);
  }, [resumeData]);

  const nextStep = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const exportToPDF = () => {
    window.print();
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoStep
            data={resumeData.personalInfo}
            onChange={(data) => updateResumeData("personalInfo", data)}
          />
        );
      case 2:
        return (
          <EducationStep
            data={resumeData.education}
            onChange={(data) => updateResumeData("education", data)}
          />
        );
      case 3:
        return (
          <ExperienceStep
            data={resumeData.experience}
            onChange={(data) => updateResumeData("experience", data)}
          />
        );
      case 4:
        return (
          <SkillsStep
            data={resumeData.skills}
            onChange={(data) => updateResumeData("skills", data)}
          />
        );
      case 5:
        return (
          <ProjectsStep
            data={resumeData.projects}
            onChange={(data) => updateResumeData("projects", data)}
          />
        );
      case 6:
        return (
          <AwardsStep
            data={resumeData.awards}
            onChange={(data) => updateResumeData("awards", data)}
          />
        );
      default:
        return null;
    }
  };

  const progressPercentage = (currentStep / STEPS.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Resume Builder
          </h1>
          <p className="text-gray-600">
            Create your professional resume in 6 easy steps
          </p>
        </div>

        {/* Progress Indicator */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">
                Step {currentStep} of {STEPS.length}
              </h2>
              <span className="text-sm text-gray-500">
                {Math.round(progressPercentage)}% Complete
              </span>
            </div>
            <Progress value={progressPercentage} className="mb-4" />
            <div className="flex justify-between text-xs text-gray-500">
              {STEPS.map((step) => (
                <div
                  key={step.id}
                  className={`text-center ${currentStep >= step.id ? "text-blue-600" : ""}`}
                >
                  <div className="font-medium">{step.title}</div>
                  <div>{step.description}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form Section */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>{STEPS[currentStep - 1]?.title}</CardTitle>
              </CardHeader>
              <CardContent>
                {renderCurrentStep()}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-6">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>

                  {currentStep === STEPS.length ? (
                    <Button onClick={exportToPDF}>
                      <Download className="w-4 h-4 mr-2" />
                      Export PDF
                    </Button>
                  ) : (
                    <Button onClick={nextStep}>
                      Next
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview Section */}
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Live Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <ResumePreview data={resumeData} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
