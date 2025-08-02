import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Mic, MapPin, User } from "lucide-react";

export default function Profile() {
  const [isInterviewContextOpen, setIsInterviewContextOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isSkillsOpen, setIsSkillsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Gradient Header */}
      <div className="relative h-64 bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-400">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="flex items-center gap-6">
            {/* Profile Photo */}
            <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
              <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <User className="w-16 h-16 text-gray-400" />
              </div>
            </div>
            
            {/* Profile Info */}
            <div className="text-white">
              <h1 className="text-4xl font-bold mb-2">Sarah Johnson</h1>
              <p className="text-xl text-white/90 mb-2">Senior Frontend Developer</p>
              <div className="flex items-center gap-1 text-white/80">
                <MapPin className="w-4 h-4" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          {/* Interactive Voice Screening */}
          <Card className="p-6 bg-muted/30 border-2 border-dashed border-muted-foreground/20">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2">
                <Mic className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold">Interactive Voice Screening</h2>
              </div>
              <p className="text-muted-foreground">
                Start a voice conversation to learn more about my experience and qualifications
              </p>
              
              {/* Audio Bars */}
              <div className="flex items-center justify-center gap-1">
                <div className="w-1 h-6 bg-muted-foreground/40 rounded-full"></div>
                <div className="w-1 h-8 bg-muted-foreground/40 rounded-full"></div>
                <div className="w-1 h-4 bg-muted-foreground/40 rounded-full"></div>
                <div className="w-1 h-7 bg-muted-foreground/40 rounded-full"></div>
                <div className="w-1 h-5 bg-muted-foreground/40 rounded-full"></div>
              </div>

              {/* Interview Context Dropdown */}
              <Collapsible 
                open={isInterviewContextOpen} 
                onOpenChange={setIsInterviewContextOpen}
                className="w-full"
              >
                <CollapsibleTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-between text-left font-normal"
                  >
                    <span>Interview Context (Optional)</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isInterviewContextOpen ? 'rotate-180' : ''}`} />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2">
                  <div className="p-4 bg-background rounded-lg border text-sm text-muted-foreground">
                    This section can include additional context for the interview.
                  </div>
                </CollapsibleContent>
              </Collapsible>

              <Button 
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90 text-white px-8"
              >
                <Mic className="w-4 h-4 mr-2" />
                Start Voice Screening
              </Button>
            </div>
          </Card>

          {/* About Me */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">About Me</h2>
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                I'm a passionate Senior Frontend Developer with over 5 years of experience building scalable React applications. 
                I've led teams on high-impact projects serving 100,000+ users and successfully reduced application load times 
                by up to 60% through strategic optimization techniques.
              </p>
              <p>
                What drives me most is creating seamless user experiences through clean, performant code. I'm actively 
                contributing to open-source projects and love collaborating with teams that share my passion for innovation 
                and quality craftsmanship.
              </p>
            </div>
          </Card>

          {/* View Resume */}
          <Collapsible open={isResumeOpen} onOpenChange={setIsResumeOpen}>
            <Card className="overflow-hidden">
              <CollapsibleTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="w-full p-6 justify-between text-left font-normal h-auto"
                >
                  <div>
                    <h2 className="text-xl font-semibold">View Resume</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      Complete professional background and experience
                    </p>
                  </div>
                  <ChevronDown className={`w-5 h-5 transition-transform ${isResumeOpen ? 'rotate-180' : ''}`} />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <Separator />
                <div className="p-6 bg-muted/20">
                  <p className="text-sm text-muted-foreground">
                    Complete resume content would be displayed here, including work experience, 
                    education, certifications, and other professional details.
                  </p>
                </div>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          {/* Skills & Expertise */}
          <Collapsible open={isSkillsOpen} onOpenChange={setIsSkillsOpen}>
            <Card className="overflow-hidden">
              <CollapsibleTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="w-full p-6 justify-between text-left font-normal h-auto"
                >
                  <div>
                    <h2 className="text-xl font-semibold">Skills & Expertise</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      Advanced skills intelligence and analysis
                    </p>
                  </div>
                  <ChevronDown className={`w-5 h-5 transition-transform ${isSkillsOpen ? 'rotate-180' : ''}`} />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <Separator />
                <div className="p-6 bg-muted/20">
                  <p className="text-sm text-muted-foreground">
                    Detailed skills analysis would be displayed here, including technical skills, 
                    software proficiency, years of experience, and industry-specific expertise.
                  </p>
                </div>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        </div>
      </div>
    </div>
  );
}