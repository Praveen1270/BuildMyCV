"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

interface Award {
  id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
}

interface AwardsStepProps {
  data: Award[];
  onChange: (data: Award[]) => void;
}

export function AwardsStep({ data, onChange }: AwardsStepProps) {
  const addAward = () => {
    const newAward: Award = {
      id: Date.now().toString(),
      title: "",
      organization: "",
      date: "",
      description: "",
    };
    onChange([...data, newAward]);
  };

  const removeAward = (id: string) => {
    onChange(data.filter((award) => award.id !== id));
  };

  const updateAward = (id: string, field: keyof Award, value: string) => {
    onChange(
      data.map((award) =>
        award.id === id ? { ...award, [field]: value } : award,
      ),
    );
  };

  return (
    <div className="space-y-4 bg-white">
      {data.map((award, index) => (
        <Card key={award.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg">Award {index + 1}</CardTitle>
            {data.length > 1 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeAward(award.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Award Title *</Label>
                <Input
                  value={award.title}
                  onChange={(e) =>
                    updateAward(award.id, "title", e.target.value)
                  }
                  placeholder="Employee of the Year"
                  required
                />
              </div>
              <div>
                <Label>Organization</Label>
                <Input
                  value={award.organization}
                  onChange={(e) =>
                    updateAward(award.id, "organization", e.target.value)
                  }
                  placeholder="Tech Corp Inc."
                />
              </div>
            </div>

            <div>
              <Label>Date Received</Label>
              <Input
                type="month"
                value={award.date}
                onChange={(e) => updateAward(award.id, "date", e.target.value)}
              />
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                value={award.description}
                onChange={(e) =>
                  updateAward(award.id, "description", e.target.value)
                }
                placeholder="Describe the achievement and its significance..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      ))}

      <Button onClick={addAward} variant="outline" className="w-full">
        <Plus className="w-4 h-4 mr-2" />
        Add Award
      </Button>
    </div>
  );
}
