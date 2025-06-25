"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  current: boolean;
}

interface ExperienceStepProps {
  data: Experience[];
  onChange: (data: Experience[]) => void;
}

export function ExperienceStep({ data, onChange }: ExperienceStepProps) {
  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
      current: false,
    };
    onChange([...data, newExperience]);
  };

  const removeExperience = (id: string) => {
    onChange(data.filter((exp) => exp.id !== id));
  };

  const updateExperience = (
    id: string,
    field: keyof Experience,
    value: string | boolean,
  ) => {
    onChange(
      data.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    );
  };

  return (
    <div className="space-y-4 bg-white">
      {data.map((experience, index) => (
        <Card key={experience.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg">Experience {index + 1}</CardTitle>
            {data.length > 1 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeExperience(experience.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Company *</Label>
                <Input
                  value={experience.company}
                  onChange={(e) =>
                    updateExperience(experience.id, "company", e.target.value)
                  }
                  placeholder="Tech Corp Inc."
                  required
                />
              </div>
              <div>
                <Label>Position *</Label>
                <Input
                  value={experience.position}
                  onChange={(e) =>
                    updateExperience(experience.id, "position", e.target.value)
                  }
                  placeholder="Software Engineer"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Start Date</Label>
                <Input
                  type="month"
                  value={experience.startDate}
                  onChange={(e) =>
                    updateExperience(experience.id, "startDate", e.target.value)
                  }
                />
              </div>
              <div>
                <Label>End Date</Label>
                <Input
                  type="month"
                  value={experience.endDate}
                  onChange={(e) =>
                    updateExperience(experience.id, "endDate", e.target.value)
                  }
                  disabled={experience.current}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id={`current-${experience.id}`}
                checked={experience.current}
                onCheckedChange={(checked) => {
                  updateExperience(
                    experience.id,
                    "current",
                    checked as boolean,
                  );
                  if (checked) {
                    updateExperience(experience.id, "endDate", "");
                  }
                }}
              />
              <Label htmlFor={`current-${experience.id}`}>
                I currently work here
              </Label>
            </div>

            <div>
              <Label>Job Description</Label>
              <Textarea
                value={experience.description}
                onChange={(e) =>
                  updateExperience(experience.id, "description", e.target.value)
                }
                placeholder="Describe your responsibilities, achievements, and key contributions..."
                rows={4}
              />
            </div>
          </CardContent>
        </Card>
      ))}

      <Button onClick={addExperience} variant="outline" className="w-full">
        <Plus className="w-4 h-4 mr-2" />
        Add Experience
      </Button>
    </div>
  );
}
