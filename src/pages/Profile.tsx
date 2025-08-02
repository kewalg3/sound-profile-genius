import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronDown, Mic, MapPin, User, Target, ChevronUp } from "lucide-react";

export default function Profile() {
  const [isInterviewContextOpen, setIsInterviewContextOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isSkillsOpen, setIsSkillsOpen] = useState(false);
  const [sortColumn, setSortColumn] = useState<'years' | 'lastUsed' | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Skills data for the table (same as in Skills Intelligence)
  const skillsData = [
    { name: "Agile Development", type: "skill", years: 1.7, lastUsed: "2020" },
    { name: "ASP.NET", type: "software", years: 1.3, lastUsed: "2020" },
    { name: "AWS Cloud Platform", type: "software", years: 1.5, lastUsed: "2024" },
    { name: "C# .NET", type: "software", years: 1.5, lastUsed: "2020" },
    { name: "C++", type: "skill", years: 0.7, lastUsed: "Current" },
    { name: "Confluence Documentation Tool", type: "software", years: 1.5, lastUsed: "2022" },
    { name: "Cross-functional Leadership", type: "skill", years: 1.5, lastUsed: "2022" },
    { name: "Data Analysis", type: "skill", years: 1.5, lastUsed: "2022" },
    { name: "DO-178C Standards", type: "skill", years: 0.5, lastUsed: "Current" },
    { name: "Docker Software", type: "software", years: 1, lastUsed: "2024" },
    { name: "Embedded Systems", type: "skill", years: 0.7, lastUsed: "Current" },
  ];

  const handleSort = (column: 'years' | 'lastUsed') => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const getSortedSkills = () => {
    if (!sortColumn) return skillsData;

    return [...skillsData].sort((a, b) => {
      if (sortColumn === 'years') {
        const comparison = a.years - b.years;
        return sortDirection === 'asc' ? comparison : -comparison;
      } else if (sortColumn === 'lastUsed') {
        const aValue = a.lastUsed === 'Current' ? '2025' : a.lastUsed;
        const bValue = b.lastUsed === 'Current' ? '2025' : b.lastUsed;
        const comparison = parseInt(aValue) - parseInt(bValue);
        return sortDirection === 'asc' ? comparison : -comparison;
      }
      return 0;
    });
  };

  const getSortIcon = (column: 'years' | 'lastUsed') => {
    if (sortColumn !== column) {
      return <ChevronUp className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100" />;
    }
    return sortDirection === 'asc' ? 
      <ChevronUp className="w-4 h-4" /> : 
      <ChevronDown className="w-4 h-4" />;
  };

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
                <div className="p-6 space-y-8">
                  {/* Professional Experience */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold">Professional Experience</h3>
                    
                    {/* Senior Frontend Developer */}
                    <div className="border-l-4 border-primary pl-4 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold">Senior Frontend Developer</h4>
                          <p className="text-cyan-500 font-medium">TechCorp Solutions • San Francisco, CA</p>
                        </div>
                        <span className="text-sm text-muted-foreground">2022 - Present</span>
                      </div>
                      <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                        <li>Led a team of 4 developers in building React applications serving 100,000+ daily users</li>
                        <li>Improved application performance by 60% through code optimization and modern practices</li>
                        <li>Implemented comprehensive testing strategies reducing bugs by 40%</li>
                      </ul>
                    </div>

                    {/* Frontend Developer */}
                    <div className="border-l-4 border-primary pl-4 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold">Frontend Developer</h4>
                          <p className="text-cyan-500 font-medium">StartupXYZ • San Francisco, CA</p>
                        </div>
                        <span className="text-sm text-muted-foreground">2020 - 2022</span>
                      </div>
                      <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                        <li>Developed and maintained customer-facing web applications using React and TypeScript</li>
                        <li>Collaborated with design team to implement responsive UI components</li>
                        <li>Reduced page load times by 45% through performance optimization</li>
                      </ul>
                    </div>

                    {/* Junior Developer */}
                    <div className="border-l-4 border-primary pl-4 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold">Junior Developer</h4>
                          <p className="text-cyan-500 font-medium">WebAgency Inc • San Francisco, CA</p>
                        </div>
                        <span className="text-sm text-muted-foreground">2019 - 2020</span>
                      </div>
                      <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                        <li>Built responsive websites and web applications using HTML, CSS, and JavaScript</li>
                        <li>Assisted in migration of legacy jQuery applications to modern React framework</li>
                      </ul>
                    </div>
                  </div>

                  <Separator />

                  {/* Education */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Education</h3>
                    <div className="border-l-4 border-primary pl-4 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold">Bachelor of Science in Computer Science</h4>
                          <p className="text-cyan-500 font-medium">University of California, Berkeley</p>
                        </div>
                        <span className="text-sm text-muted-foreground">2015 - 2019</span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Certifications */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Certifications</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">AWS Certified Developer - Associate</span>
                        <span className="text-sm text-muted-foreground">2023</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">React Developer Certification</span>
                        <span className="text-sm text-muted-foreground">2022</span>
                      </div>
                    </div>
                  </div>
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
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Target className="w-5 h-5" />
                    <h3 className="text-lg font-semibold">Skills & Software Summary</h3>
                  </div>
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Skill/Software</TableHead>
                        <TableHead 
                          className="cursor-pointer select-none group hover:bg-muted/50 transition-colors"
                          onClick={() => handleSort('years')}
                        >
                          <div className="flex items-center gap-1">
                            Years Experience
                            {getSortIcon('years')}
                          </div>
                        </TableHead>
                        <TableHead 
                          className="cursor-pointer select-none group hover:bg-muted/50 transition-colors"
                          onClick={() => handleSort('lastUsed')}
                        >
                          <div className="flex items-center gap-1">
                            Last Used
                            {getSortIcon('lastUsed')}
                          </div>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getSortedSkills().map((skill, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Badge 
                              variant="secondary" 
                              className={skill.type === 'skill' 
                                ? "bg-blue-50 text-blue-700 border-blue-200" 
                                : "bg-green-50 text-green-700 border-green-200"
                              }
                            >
                              {skill.name}
                            </Badge>
                          </TableCell>
                          <TableCell>{skill.years}</TableCell>
                          <TableCell className={skill.lastUsed === 'Current' ? 'text-success font-medium' : ''}>
                            {skill.lastUsed}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        </div>
      </div>
    </div>
  );
}