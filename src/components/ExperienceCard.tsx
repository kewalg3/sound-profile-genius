import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Briefcase, ChevronDown, ChevronUp, Calendar, MapPin, Plus } from "lucide-react";

interface Job {
  title: string;
  company: string;
  duration: string;
  location: string;
  description: string;
  skills: string[];
  software: string[];
  aiSuggestedSkills: string[];
  aiSuggestedSoftware: string[];
}

interface ExperienceCardProps {
  job: Job;
  isExpanded: boolean;
  onToggle: () => void;
}

export default function ExperienceCard({ job, isExpanded, onToggle }: ExperienceCardProps) {
  const [skillsToAdd, setSkillsToAdd] = useState({
    skills: '',
    software: ''
  });

  const handleAddSkill = (type: 'skills' | 'software', value: string) => {
    if (value.trim()) {
      // In a real app, this would update the job data
      console.log(`Adding ${type}: ${value}`);
      setSkillsToAdd(prev => ({ ...prev, [type]: '' }));
    }
  };

  return (
    <Card className="p-6 border border-border hover:shadow-md transition-shadow">
      <div className="space-y-4">
        {/* Card Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
              <Briefcase className="w-5 h-5 text-muted-foreground" />
            </div>
            
            <div className="space-y-2 flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-foreground">{job.title}</h3>
              <div className="space-y-1">
                <p className="text-muted-foreground font-medium">{job.company}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{job.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{job.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button className="bg-gradient-primary hover:opacity-90">
              Start AI Interview
            </Button>
            <Button variant="outline" onClick={onToggle}>
              Skills & Software
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 ml-1" />
              ) : (
                <ChevronDown className="w-4 h-4 ml-1" />
              )}
            </Button>
          </div>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <>
            <Separator />
            
            {/* Job Description */}
            <div className="space-y-3">
              <h4 className="font-medium">Description</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {job.description}
              </p>
            </div>

            <Separator />

            {/* Skills & Software Section */}
            <div className="space-y-6">
              <h4 className="font-medium">Skills & Software</h4>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Skills Column */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="font-medium text-sm">Skills</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    
                    {job.aiSuggestedSkills.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-muted-foreground">AI Suggested Skills</p>
                        <div className="flex flex-wrap gap-2">
                          {job.aiSuggestedSkills.map((skill, index) => (
                            <button
                              key={index}
                              className="text-xs px-2 py-1 rounded border border-blue-200 text-blue-600 hover:bg-blue-50 transition-colors flex items-center gap-1"
                            >
                              <Plus className="w-3 h-3" />
                              {skill}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      <p className="text-xs font-medium">Skills Lookup</p>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Start typing to add a skill..."
                          value={skillsToAdd.skills}
                          onChange={(e) => setSkillsToAdd(prev => ({ ...prev, skills: e.target.value }))}
                          className="text-xs"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleAddSkill('skills', skillsToAdd.skills);
                            }
                          }}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => handleAddSkill('skills', skillsToAdd.skills)}
                        >
                          Add
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Software Column */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="font-medium text-sm">Software</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {job.software.map((software, index) => (
                        <Badge key={index} variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                          {software}
                        </Badge>
                      ))}
                    </div>
                    
                    {job.aiSuggestedSoftware.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-muted-foreground">AI Suggested Software</p>
                        <div className="flex flex-wrap gap-2">
                          {job.aiSuggestedSoftware.map((software, index) => (
                            <button
                              key={index}
                              className="text-xs px-2 py-1 rounded border border-green-200 text-green-600 hover:bg-green-50 transition-colors flex items-center gap-1"
                            >
                              <Plus className="w-3 h-3" />
                              {software}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      <p className="text-xs font-medium">Software Lookup</p>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Start typing to add software..."
                          value={skillsToAdd.software}
                          onChange={(e) => setSkillsToAdd(prev => ({ ...prev, software: e.target.value }))}
                          className="text-xs"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleAddSkill('software', skillsToAdd.software);
                            }
                          }}
                        />
                        <Button 
                          size="sm" 
                          onClick={() => handleAddSkill('software', skillsToAdd.software)}
                        >
                          Add
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Card>
  );
}