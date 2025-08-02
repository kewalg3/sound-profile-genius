import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingLayout from "@/components/OnboardingLayout";
import FileUpload from "@/components/FileUpload";
import VoiceRecorder from "@/components/VoiceRecorder";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TOTAL_STEPS = 6;

interface OnboardingData {
  resume?: File;
  voiceRecording?: Blob;
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location: string;
  };
  workStyle: {
    careerGoals: string;
    workPreferences: string[];
    industries: string[];
  };
  skills: string[];
  verificationComplete: boolean;
}

export default function BetaOnboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      location: "",
    },
    workStyle: {
      careerGoals: "",
      workPreferences: [],
      industries: [],
    },
    skills: [],
    verificationComplete: false,
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Complete onboarding
      toast({
        title: "Onboarding Complete!",
        description: "Welcome to Job Twin. Your voice-enhanced profile is ready.",
      });
      navigate("/dashboard");
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return !!data.resume;
      case 2:
        return data.personalInfo.firstName && data.personalInfo.lastName && data.personalInfo.email;
      case 3:
        return true; // Optional step
      case 4:
        return data.workStyle.careerGoals.length > 0;
      case 5:
        return data.skills.length > 0;
      case 6:
        return data.verificationComplete;
      default:
        return true;
    }
  };

  const updatePersonalInfo = (field: keyof OnboardingData['personalInfo'], value: string) => {
    setData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value,
      },
    }));
  };

  const updateWorkStyle = (field: keyof OnboardingData['workStyle'], value: any) => {
    setData(prev => ({
      ...prev,
      workStyle: {
        ...prev.workStyle,
        [field]: value,
      },
    }));
  };

  const addSkill = (skill: string) => {
    if (skill && !data.skills.includes(skill)) {
      setData(prev => ({
        ...prev,
        skills: [...prev.skills, skill],
      }));
    }
  };

  const removeSkill = (skill: string) => {
    setData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill),
    }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
                <Upload className="w-6 h-6" />
                Resume Upload & AI Parsing
              </h2>
              <p className="text-muted-foreground">
                Upload your resume for AI-powered analysis and enhancement
              </p>
            </div>
            <FileUpload
              onFileSelect={(file) => setData(prev => ({ ...prev, resume: file }))}
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Personal Information</h2>
              <p className="text-muted-foreground">
                Tell us about yourself to personalize your experience
              </p>
            </div>
            <Card className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={data.personalInfo.firstName}
                    onChange={(e) => updatePersonalInfo('firstName', e.target.value)}
                    placeholder="Enter your first name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={data.personalInfo.lastName}
                    onChange={(e) => updatePersonalInfo('lastName', e.target.value)}
                    placeholder="Enter your last name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={data.personalInfo.email}
                    onChange={(e) => updatePersonalInfo('email', e.target.value)}
                    placeholder="Enter your email address"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={data.personalInfo.phone}
                    onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                    placeholder="Enter your phone number"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={data.personalInfo.location}
                    onChange={(e) => updatePersonalInfo('location', e.target.value)}
                    placeholder="City, State/Province, Country"
                  />
                </div>
              </div>
            </Card>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Experience Enhancement</h2>
              <p className="text-muted-foreground">
                Record your voice to add personality and authenticity to your profile
              </p>
            </div>
            <VoiceRecorder
              onRecordingComplete={(blob) => setData(prev => ({ ...prev, voiceRecording: blob }))}
            />
            <Card className="p-4 bg-gradient-subtle">
              <div className="text-sm text-muted-foreground">
                <p className="font-medium mb-2">💡 Pro Tips for Voice Recording:</p>
                <ul className="space-y-1 text-xs">
                  <li>• Speak clearly and at a normal pace</li>
                  <li>• Record in a quiet environment</li>
                  <li>• Aim for 30-60 seconds of speaking</li>
                  <li>• Introduce yourself and mention your career interests</li>
                </ul>
              </div>
            </Card>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Work Style & Career Goals</h2>
              <p className="text-muted-foreground">
                Help us understand your professional aspirations and work preferences
              </p>
            </div>
            <Card className="p-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="careerGoals">Career Goals & Aspirations *</Label>
                <Textarea
                  id="careerGoals"
                  value={data.workStyle.careerGoals}
                  onChange={(e) => updateWorkStyle('careerGoals', e.target.value)}
                  placeholder="Describe your career goals, what you're looking for in your next role, and your long-term aspirations..."
                  rows={4}
                />
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <div>
                  <Label>Preferred Work Environment</Label>
                  <p className="text-sm text-muted-foreground mb-3">Select all that apply</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {["Remote", "Hybrid", "In-Office", "Flexible Hours", "Team Collaboration", "Independent Work"].map((pref) => (
                      <label key={pref} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={data.workStyle.workPreferences.includes(pref)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              updateWorkStyle('workPreferences', [...data.workStyle.workPreferences, pref]);
                            } else {
                              updateWorkStyle('workPreferences', data.workStyle.workPreferences.filter(p => p !== pref));
                            }
                          }}
                          className="rounded border-gray-300"
                        />
                        <span className="text-sm">{pref}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Skills Intelligence</h2>
              <p className="text-muted-foreground">
                Add your key skills to enhance AI matching with relevant opportunities
              </p>
            </div>
            <Card className="p-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="skillInput">Add Skills</Label>
                <div className="flex gap-2">
                  <Input
                    id="skillInput"
                    placeholder="Type a skill and press Enter..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const skill = e.currentTarget.value.trim();
                        if (skill) {
                          addSkill(skill);
                          e.currentTarget.value = '';
                        }
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      const input = document.getElementById('skillInput') as HTMLInputElement;
                      const skill = input.value.trim();
                      if (skill) {
                        addSkill(skill);
                        input.value = '';
                      }
                    }}
                  >
                    Add
                  </Button>
                </div>
              </div>
              
              {data.skills.length > 0 && (
                <div className="space-y-2">
                  <Label>Your Skills</Label>
                  <div className="flex flex-wrap gap-2">
                    {data.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                        onClick={() => removeSkill(skill)}
                      >
                        {skill} ×
                      </Badge>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">Click on a skill to remove it</p>
                </div>
              )}
              
              <div className="bg-gradient-subtle p-4 rounded-lg">
                <p className="text-sm font-medium mb-2">💡 Skill Suggestions:</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                  {["JavaScript", "Python", "Project Management", "Communication", "Leadership", "Data Analysis"].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => addSkill(suggestion)}
                      className="text-left p-2 rounded border hover:bg-primary/10 transition-colors"
                      disabled={data.skills.includes(suggestion)}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Identity Verification</h2>
              <p className="text-muted-foreground">
                Complete your profile setup and review your information
              </p>
            </div>
            <Card className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 mx-auto bg-gradient-primary rounded-full flex items-center justify-center">
                    <span className="text-2xl text-primary-foreground font-bold">
                      {data.personalInfo.firstName.charAt(0)}{data.personalInfo.lastName.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">
                      {data.personalInfo.firstName} {data.personalInfo.lastName}
                    </h3>
                    <p className="text-muted-foreground">{data.personalInfo.email}</p>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  <div>
                    <h4 className="font-medium mb-2">Profile Completion</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <span className={data.resume ? "text-success" : "text-muted-foreground"}>
                          {data.resume ? "✓" : "○"}
                        </span>
                        Resume uploaded
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-success">✓</span>
                        Personal information
                      </li>
                      <li className="flex items-center gap-2">
                        <span className={data.voiceRecording ? "text-success" : "text-muted-foreground"}>
                          {data.voiceRecording ? "✓" : "○"}
                        </span>
                        Voice recording (optional)
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-success">✓</span>
                        Career goals defined
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-success">✓</span>
                        Skills added ({data.skills.length})
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Next Steps</h4>
                    <ul className="space-y-1 text-muted-foreground text-sm">
                      <li>• AI will process your resume and voice profile</li>
                      <li>• Receive personalized job recommendations</li>
                      <li>• Access enhanced networking tools</li>
                      <li>• Get AI-powered interview preparation</li>
                    </ul>
                  </div>
                </div>

                <div className="text-center">
                  <Button
                    onClick={() => setData(prev => ({ ...prev, verificationComplete: true }))}
                    className="bg-gradient-primary hover:opacity-90"
                    size="lg"
                    disabled={data.verificationComplete}
                  >
                    {data.verificationComplete ? "✓ Verified" : "Complete Setup"}
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <OnboardingLayout
      currentStep={currentStep}
      totalSteps={TOTAL_STEPS}
      title="Job Twin - Transform Your Resume with Voice"
      subtitle="AI-Powered Resume Enhancement"
    >
      {renderStepContent()}
      
      {/* Navigation */}
      <div className="flex justify-between mt-8 pt-6 border-t">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 1}
        >
          Previous
        </Button>
        
        <Button
          onClick={handleNext}
          disabled={!canProceed()}
          className="bg-gradient-primary hover:opacity-90"
        >
          {currentStep === TOTAL_STEPS ? "Complete Setup" : "Next"}
        </Button>
      </div>
    </OnboardingLayout>
  );
}