"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

interface Skill {
  id: string;
  name: string;
  level: string;
}

interface SkillsStepProps {
  data: Skill[];
  onChange: (data: Skill[]) => void;
}

const SKILL_LEVELS = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
  { value: "expert", label: "Expert" },
];

export function SkillsStep({ data, onChange }: SkillsStepProps) {
  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: "",
      level: "intermediate",
    };
    onChange([...data, newSkill]);
  };

  const removeSkill = (id: string) => {
    onChange(data.filter((skill) => skill.id !== id));
  };

  const updateSkill = (id: string, field: keyof Skill, value: string) => {
    onChange(
      data.map((skill) =>
        skill.id === id ? { ...skill, [field]: value } : skill,
      ),
    );
  };

  return (
    <div className="space-y-4 bg-white">
      {data.map((skill, index) => (
        <Card key={skill.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg">Skill {index + 1}</CardTitle>
            {data.length > 1 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeSkill(skill.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Skill Name *</Label>
                <Input
                  value={skill.name}
                  onChange={(e) =>
                    updateSkill(skill.id, "name", e.target.value)
                  }
                  placeholder="JavaScript, Python, Project Management..."
                  required
                />
              </div>
              <div>
                <Label>Proficiency Level</Label>
                <Select
                  value={skill.level}
                  onValueChange={(value) =>
                    updateSkill(skill.id, "level", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    {SKILL_LEVELS.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <Button onClick={addSkill} variant="outline" className="w-full">
        <Plus className="w-4 h-4 mr-2" />
        Add Skill
      </Button>
    </div>
  );
}
