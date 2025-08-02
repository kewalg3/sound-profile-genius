import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingLayout from "@/components/OnboardingLayout";
import FileUpload from "@/components/FileUpload";
import VoiceRecorder from "@/components/VoiceRecorder";
import ProfilePhotoUpload from "@/components/ProfilePhotoUpload";
import ExperienceCard from "@/components/ExperienceCard";
import WorkStyleInterviewDialog from "@/components/WorkStyleInterviewDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, Briefcase } from "lucide-react";
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
    phoneCountry: string;
    streetAddress: string;
    city: string;
    stateProvince: string;
    zipPostalCode: string;
    country: string;
    linkedinProfile: string;
    githubProfile: string;
    portfolioWebsite: string;
    behanceProfile: string;
    dribbbleProfile: string;
    mediumProfile: string;
    twitterProfile: string;
    stackOverflowProfile: string;
  };
  profilePhoto?: File;
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
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [showWorkStyleDialog, setShowWorkStyleDialog] = useState(false);
  const [data, setData] = useState<OnboardingData>({
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      phoneCountry: "+1",
      streetAddress: "",
      city: "",
      stateProvince: "",
      zipPostalCode: "",
      country: "United States",
      linkedinProfile: "",
      githubProfile: "",
      portfolioWebsite: "",
      behanceProfile: "",
      dribbbleProfile: "",
      mediumProfile: "",
      twitterProfile: "",
      stackOverflowProfile: "",
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
        return true; // AI interview is optional
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
                Complete your profile with detailed information
              </p>
            </div>
            
            <Card className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Basic Information</h3>
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
                </div>
              </div>

              <Separator />

              {/* Address */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Address</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="streetAddress">Street Address</Label>
                    <Input
                      id="streetAddress"
                      value={data.personalInfo.streetAddress}
                      onChange={(e) => updatePersonalInfo('streetAddress', e.target.value)}
                      placeholder="Street address"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={data.personalInfo.city}
                        onChange={(e) => updatePersonalInfo('city', e.target.value)}
                        placeholder="City"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="stateProvince">State/Province</Label>
                      <Input
                        id="stateProvince"
                        value={data.personalInfo.stateProvince}
                        onChange={(e) => updatePersonalInfo('stateProvince', e.target.value)}
                        placeholder="State/Province"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipPostalCode">ZIP/Postal Code</Label>
                      <Input
                        id="zipPostalCode"
                        value={data.personalInfo.zipPostalCode}
                        onChange={(e) => updatePersonalInfo('zipPostalCode', e.target.value)}
                        placeholder="ZIP/Postal Code"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Select
                      value={data.personalInfo.country}
                      onValueChange={(value) => updatePersonalInfo('country', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="United States">United States</SelectItem>
                        <SelectItem value="Canada">Canada</SelectItem>
                        <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                        <SelectItem value="Australia">Australia</SelectItem>
                        <SelectItem value="Germany">Germany</SelectItem>
                        <SelectItem value="France">France</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Phone Number */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Phone Number</h3>
                <div className="flex gap-2">
                  <div className="w-24">
                    <Select
                      value={data.personalInfo.phoneCountry}
                      onValueChange={(value) => updatePersonalInfo('phoneCountry', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="+1">🇺🇸 +1</SelectItem>
                        <SelectItem value="+44">🇬🇧 +44</SelectItem>
                        <SelectItem value="+49">🇩🇪 +49</SelectItem>
                        <SelectItem value="+33">🇫🇷 +33</SelectItem>
                        <SelectItem value="+61">🇦🇺 +61</SelectItem>
                        <SelectItem value="+1">🇨🇦 +1</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex-1">
                    <Input
                      value={data.personalInfo.phone}
                      onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Online Presence */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">Online Presence (Optional)</h3>
                  <p className="text-sm text-muted-foreground">Add your professional profiles and portfolios</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="linkedinProfile">LinkedIn Profile</Label>
                    <Input
                      id="linkedinProfile"
                      value={data.personalInfo.linkedinProfile}
                      onChange={(e) => updatePersonalInfo('linkedinProfile', e.target.value)}
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="githubProfile">GitHub Profile</Label>
                    <Input
                      id="githubProfile"
                      value={data.personalInfo.githubProfile}
                      onChange={(e) => updatePersonalInfo('githubProfile', e.target.value)}
                      placeholder="https://github.com/yourusername"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="portfolioWebsite">Portfolio/Website</Label>
                    <Input
                      id="portfolioWebsite"
                      value={data.personalInfo.portfolioWebsite}
                      onChange={(e) => updatePersonalInfo('portfolioWebsite', e.target.value)}
                      placeholder="https://yourportfolio.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="behanceProfile">Behance (Designers)</Label>
                    <Input
                      id="behanceProfile"
                      value={data.personalInfo.behanceProfile}
                      onChange={(e) => updatePersonalInfo('behanceProfile', e.target.value)}
                      placeholder="https://behance.net/yourprofile"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dribbbleProfile">Dribbble (Designers)</Label>
                    <Input
                      id="dribbbleProfile"
                      value={data.personalInfo.dribbbleProfile}
                      onChange={(e) => updatePersonalInfo('dribbbleProfile', e.target.value)}
                      placeholder="https://dribbble.com/yourprofile"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mediumProfile">Medium (Writers)</Label>
                    <Input
                      id="mediumProfile"
                      value={data.personalInfo.mediumProfile}
                      onChange={(e) => updatePersonalInfo('mediumProfile', e.target.value)}
                      placeholder="https://medium.com/@yourusername"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twitterProfile">Twitter/X</Label>
                    <Input
                      id="twitterProfile"
                      value={data.personalInfo.twitterProfile}
                      onChange={(e) => updatePersonalInfo('twitterProfile', e.target.value)}
                      placeholder="https://twitter.com/yourusername"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stackOverflowProfile">Stack Overflow (Developers)</Label>
                    <Input
                      id="stackOverflowProfile"
                      value={data.personalInfo.stackOverflowProfile}
                      onChange={(e) => updatePersonalInfo('stackOverflowProfile', e.target.value)}
                      placeholder="https://stackoverflow.com/users/yourprofile"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Profile Photo */}
              <div className="space-y-4">
                <ProfilePhotoUpload
                  onPhotoSelect={(file) => setData(prev => ({ ...prev, profilePhoto: file }))}
                  currentPhoto={data.profilePhoto}
                />
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
                Experience the future of resume processing with AI-powered skills extraction, contextual job analysis, and intelligent career insights.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-6">
                <FileText className="w-5 h-5" />
                <h3 className="text-lg font-semibold">Experience Enhancement</h3>
              </div>

              {/* Experience Cards */}
              <div className="space-y-4">
                {[
                  {
                    title: "Senior Software Engineer",
                    company: "AeroSpace Dynamics",
                    duration: "2024 - Present",
                    location: "Denver, CO",
                    description: "Leading development of mission-critical flight control software systems for commercial and military aircraft. Architecting real-time embedded systems using C++ and Python for avionics platforms. Implementing safety-critical software following DO-178C aviation standards and conducting comprehensive testing protocols. Collaborating with systems engineers and hardware teams to integrate software with flight hardware. Managing technical documentation and regulatory compliance for FAA certification processes.",
                    skills: ["C++", "Python", "Embedded Systems", "Real-time Systems", "DO-178C Standards", "MATLAB", "Linux Operating System"],
                    software: ["Git Version Control Tool", "AI Suggested Software", "Excel", "PowerPoint", "Slack", "Trello", "Asana", "Monday.com", "Tableau", "Power BI", "Salesforce", "HubSpot", "Zoom", "Teams"],
                    aiSuggestedSkills: ["Leadership", "Communication", "Problem Solving", "Team Collaboration", "Strategic Planning", "Project Management", "Data Analysis", "Quality Assurance", "Budget Management", "Risk Management", "Change Management", "Training"],
                    aiSuggestedSoftware: []
                  },
                  {
                    title: "Senior Software Engineer",
                    company: "TechCorp Inc.",
                    duration: "2022 - 2024",
                    location: "San Francisco, CA",
                    description: "Developed scalable web applications using modern JavaScript frameworks and cloud technologies. Led a team of 5 engineers in delivering high-quality software solutions. Implemented microservices architecture and improved system performance by 40%.",
                    skills: ["JavaScript", "React", "Node.js", "AWS", "Docker", "Kubernetes", "TypeScript"],
                    software: ["Git", "Jira", "Slack", "VS Code", "Docker Desktop", "AWS Console"],
                    aiSuggestedSkills: ["Team Leadership", "Agile Methodology", "System Design"],
                    aiSuggestedSoftware: ["Jenkins", "Terraform", "New Relic"]
                  },
                  {
                    title: "Product Manager",
                    company: "StartupX",
                    duration: "2020 - 2022",
                    location: "Austin, TX",
                    description: "Managed product roadmap and strategy for B2B SaaS platform. Collaborated with cross-functional teams to define requirements and prioritize features. Increased user engagement by 60% through data-driven product decisions.",
                    skills: ["Product Strategy", "Data Analysis", "User Research", "Agile", "Scrum"],
                    software: ["Figma", "Mixpanel", "Amplitude", "Notion", "Slack"],
                    aiSuggestedSkills: ["Market Research", "Competitive Analysis", "Stakeholder Management"],
                    aiSuggestedSoftware: ["ProductBoard", "Miro", "Confluence"]
                  },
                  {
                    title: "Software Developer",
                    company: "SecureLife Insurance",
                    duration: "2018 - 2020",
                    location: "Chicago, IL",
                    description: "Built and maintained insurance management systems using Java and Spring framework. Developed RESTful APIs and integrated with third-party services. Improved application security and implemented automated testing.",
                    skills: ["Java", "Spring Framework", "SQL", "REST APIs", "JUnit"],
                    software: ["IntelliJ IDEA", "Maven", "Jenkins", "Oracle Database"],
                    aiSuggestedSkills: ["Software Architecture", "Database Design", "API Design"],
                    aiSuggestedSoftware: ["SonarQube", "Postman", "Swagger"]
                  }
                ].map((job, index) => (
                  <ExperienceCard
                    key={index}
                    job={job}
                    isExpanded={expandedCard === index}
                    onToggle={() => setExpandedCard(expandedCard === index ? null : index)}
                  />
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Work Style & Career Goals</h2>
              <p className="text-muted-foreground">
                Experience the future of resume processing with AI-powered skills extraction, contextual job analysis, and intelligent career insights.
              </p>
            </div>
            
            <div className="flex justify-center">
              <Card className="p-8 max-w-md w-full text-center space-y-6">
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Briefcase className="w-8 h-8 text-primary" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="inline-block bg-muted px-3 py-1 rounded-full text-sm font-medium">
                      Work Style & Career Goals
                    </div>
                    <p className="text-muted-foreground">
                      This interview will focus on your work type and career objectives
                    </p>
                  </div>
                </div>
                
                <Button 
                  onClick={() => setShowWorkStyleDialog(true)}
                  className="w-full bg-gradient-primary hover:opacity-90"
                  size="lg"
                >
                  Start Interview
                </Button>
              </Card>
            </div>
            
            <WorkStyleInterviewDialog 
              isOpen={showWorkStyleDialog}
              onClose={() => setShowWorkStyleDialog(false)}
            />
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