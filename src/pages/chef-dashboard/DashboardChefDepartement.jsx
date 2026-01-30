import {
  Bell,
  Briefcase,
  Building,
  Calendar as CalendarIcon,
  ChevronDown,
  FileText,
  LogOut,
  Search,
  Settings,
  UserCheck,
  UserPlus,
  Users,
} from "lucide-react";
import { useState } from "react";
import Applications from "./Applications/Applications";
import { Avatar, AvatarFallback, AvatarImage } from "./components/avatar";
import { Button } from "./components/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./components/dropdown-menu";
import { Input } from "./components/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/tabs";
import Interns from "./Interns/Interns";
import Interviews from "./Interviews/Interviews";
import Offers from "./Offers/Offers";
import Subjects from "./Subjects/Subjects";
import Supervisors from "./Supervisors/Supervisors";

function DashboardChefDepartement() {
  const [activeTab, setActiveTab] = useState("subjects");
  const [searchQuery, setSearchQuery] = useState("");

  // Stats for dashboard
  const stats = [
    {
      title: "Active Interns",
      value: 2,
      icon: Users,
      change: "+2 from last month",
    },
    {
      title: "Pending Applications",
      value: 1,
      icon: UserCheck,
      change: "+5 from last week",
    },
    {
      title: "Available Subjects",
      value: 1,
      icon: FileText,
      change: "3 new this month",
    },
    {
      title: "Upcoming Interviews",
      value: 2,
      icon: CalendarIcon,
      change: "2 scheduled this week",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Building className="h-8 w-8 text-blue-600" />
              <h1 className="ml-3 text-2xl font-semibold text-gray-900">
                Department Head Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-2 pl-2"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
                      <AvatarFallback>CD</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">Prof. Anderson</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs
          defaultValue="subjects"
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <TabsList className="bg-white p-1 space-x-2">
              <TabsTrigger value="subjects" className="flex items-center">
                <FileText className="w-4 h-4 mr-2" />
                Subjects
              </TabsTrigger>
              <TabsTrigger value="offers" className="flex items-center">
                <Briefcase className="w-4 h-4 mr-2" />
                Offers
              </TabsTrigger>
              <TabsTrigger value="applications" className="flex items-center">
                <UserCheck className="w-4 h-4 mr-2" />
                Applications
              </TabsTrigger>
              <TabsTrigger value="interns" className="flex items-center">
                <Users className="w-4 h-4 mr-2" />
                Interns
              </TabsTrigger>
              <TabsTrigger value="interviews" className="flex items-center">
                <CalendarIcon className="w-4 h-4 mr-2" />
                Interviews
              </TabsTrigger>
              <TabsTrigger value="supervisors" className="flex items-center">
                <UserPlus className="w-4 h-4 mr-2" />
                Supervisors
              </TabsTrigger>
            </TabsList>

            <div className="relative w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search..."
                className="pl-9 w-full md:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <TabsContent value="subjects">
            <Subjects searchQuery={searchQuery} />
          </TabsContent>

          <TabsContent value="offers">
            <Offers searchQuery={searchQuery} />
          </TabsContent>

          <TabsContent value="applications">
            <Applications searchQuery={searchQuery} />
          </TabsContent>

          <TabsContent value="interns">
            <Interns key="interns-component" searchQuery={searchQuery} />
          </TabsContent>

          <TabsContent value="interviews">
            <Interviews searchQuery={searchQuery} />
          </TabsContent>

          <TabsContent value="supervisors">
            <Supervisors searchQuery={searchQuery} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

export default DashboardChefDepartement;
