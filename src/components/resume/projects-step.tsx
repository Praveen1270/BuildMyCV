"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string;
  url?: string;
}

interface ProjectsStepProps {
  data: Project[];
  onChange: (data: Project[]) => void;
}

export function ProjectsStep({ data, onChange }: ProjectsStepProps) {
  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: "",
      description: "",
      technologies: "",
      url: "",
    };
    onChange([...data, newProject]);
  };

  const removeProject = (id: string) => {
    onChange(data.filter((project) => project.id !== id));
  };

  const updateProject = (id: string, field: keyof Project, value: string) => {
    onChange(
      data.map((project) =>
        project.id === id ? { ...project, [field]: value } : project,
      ),
    );
  };

  return (
    <div className="space-y-4 bg-white">
      {data.map((project, index) => (
        <Card key={project.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg">Project {index + 1}</CardTitle>
            {data.length > 1 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeProject(project.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Project Name *</Label>
                <Input
                  value={project.name}
                  onChange={(e) =>
                    updateProject(project.id, "name", e.target.value)
                  }
                  placeholder="E-commerce Website"
                  required
                />
              </div>
              <div>
                <Label>Project URL (Optional)</Label>
                <Input
                  value={project.url || ""}
                  onChange={(e) =>
                    updateProject(project.id, "url", e.target.value)
                  }
                  placeholder="https://github.com/username/project"
                />
              </div>
            </div>

            <div>
              <Label>Technologies Used</Label>
              <Input
                value={project.technologies}
                onChange={(e) =>
                  updateProject(project.id, "technologies", e.target.value)
                }
                placeholder="React, Node.js, MongoDB, AWS"
              />
            </div>

            <div>
              <Label>Project Description</Label>
              <Textarea
                value={project.description}
                onChange={(e) =>
                  updateProject(project.id, "description", e.target.value)
                }
                placeholder="Describe the project, your role, key features, and achievements..."
                rows={4}
              />
            </div>
          </CardContent>
        </Card>
      ))}

      <Button onClick={addProject} variant="outline" className="w-full">
        <Plus className="w-4 h-4 mr-2" />
        Add Project
      </Button>
    </div>
  );
}
