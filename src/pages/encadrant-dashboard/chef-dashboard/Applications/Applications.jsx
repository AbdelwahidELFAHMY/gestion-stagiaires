import {
  CheckCircle2,
  Download,
  FileText,
  Mail,
  MoreVertical,
  UserCheck,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../components/avatar";
import { Badge } from "../components/badge";
import { Button } from "../components/button";
import { Card, CardContent } from "../components/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/dropdown-menu";
import { Input } from "../components/input";
import { Label } from "../components/label";
import { Pagination } from "../components/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/table";
import { Textarea } from "../components/textarea";
import { useToast } from "../components/use-toast";

function Applications({ searchQuery }) {
  const { toast } = useToast();
  const [applications, setApplications] = useState([
    {
      id: "1",
      candidateName: "John Smith",
      email: "john.smith@example.com",
      position: "Full Stack Development Intern",
      education: "Master's in Computer Science",
      status: "pending",
      description:
        "I am a final year Computer Science student with experience in web development using React, Node.js, and MongoDB. I've completed two previous internships in software development.",
      avatarUrl:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      appliedAt: new Date("2023-07-10"),
      cvUrl: "#",
    },
    {
      id: "2",
      candidateName: "Emma Johnson",
      email: "emma.johnson@example.com",
      position: "Data Science Research Assistant",
      education: "PhD in Artificial Intelligence",
      status: "interview",
      description:
        "Currently pursuing a PhD in AI with focus on computer vision. Published 2 papers in top conferences. Strong Python and PyTorch skills.",
      avatarUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      appliedAt: new Date("2023-07-05"),
      cvUrl: "#",
    },
  ]);

  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPosition, setFilterPosition] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewCVApplication, setViewCVApplication] = useState(null);
  const [contactApplication, setContactApplication] = useState(null);
  const [viewDetailsApplication, setViewDetailsApplication] = useState(null);
  const [contactForm, setContactForm] = useState({ subject: "", message: "" });
  const itemsPerPage = 5;

  const filteredApplications = useMemo(() => {
    return applications.filter((application) => {
      const matchesSearch = application.candidateName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesStatus =
        filterStatus === "all" || application.status === filterStatus;
      const matchesPosition =
        filterPosition === "all" || application.position === filterPosition;
      return matchesSearch && matchesStatus && matchesPosition;
    });
  }, [applications, searchQuery, filterStatus, filterPosition]);

  const paginatedApplications = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredApplications.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredApplications, currentPage]);

  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
  const uniquePositions = [...new Set(applications.map((app) => app.position))];

  const handleAcceptApplication = (id) => {
    setApplications(
      applications.map((app) =>
        app.id === id ? { ...app, status: "accepted" } : app
      )
    );
    toast({
      title: "Success",
      description: "Application accepted",
    });
  };

  const handleRejectApplication = (id) => {
    setApplications(
      applications.map((app) =>
        app.id === id ? { ...app, status: "rejected" } : app
      )
    );
    toast({
      title: "Success",
      description: "Application rejected",
    });
  };

  const handleMoveToInterview = (id) => {
    setApplications(
      applications.map((app) =>
        app.id === id ? { ...app, status: "interview" } : app
      )
    );
    toast({
      title: "Success",
      description: "Application moved to interview stage",
    });
  };

  const handleViewCV = (application) => {
    setViewCVApplication(application);
  };

  const handleContact = (application) => {
    setContactApplication(application);
    setContactForm({
      subject: `Re: Application for ${application.position}`,
      message: "",
    });
  };

  const handleSendContact = () => {
    if (!contactForm.subject || !contactForm.message) {
      toast({
        title: "Error",
        description: "Please fill in both subject and message",
        variant: "destructive",
      });
      return;
    }
    // Simulate sending email
    toast({
      title: "Success",
      description: `Message sent to ${contactApplication.candidateName}`,
    });
    setContactApplication(null);
    setContactForm({ subject: "", message: "" });
  };

  const handleViewDetails = (application) => {
    setViewDetailsApplication(application);
  };

  return (
    <div className="grid gap-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-xl font-semibold">Applications</h2>
        <div className="flex items-center space-x-2">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Applications</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="interview">Interview</SelectItem>
              <SelectItem value="accepted">Accepted</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterPosition} onValueChange={setFilterPosition}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by position" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Positions</SelectItem>
              {uniquePositions.map((position) => (
                <SelectItem key={position} value={position}>
                  {position}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Candidate</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Education</TableHead>
                <TableHead>Applied</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedApplications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={application.avatarUrl} />
                        <AvatarFallback>
                          {application.candidateName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div
                          className="font-medium cursor-pointer hover:underline"
                          onClick={() => handleViewDetails(application)}
                          role="button"
                          aria-label={`View details for ${application.candidateName}`}
                        >
                          {application.candidateName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {application.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{application.position}</TableCell>
                  <TableCell>{application.education}</TableCell>
                  <TableCell>
                    {application.appliedAt.toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        application.status === "pending"
                          ? "outline"
                          : application.status === "accepted"
                          ? "default"
                          : application.status === "rejected"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {application.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label="More actions"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleViewCV(application)}
                        >
                          <FileText className="mr-2 h-4 w-4" />
                          View CV
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleContact(application)}
                        >
                          <Mail className="mr-2 h-4 w-4" />
                          Contact
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => handleMoveToInterview(application.id)}
                        >
                          <UserCheck className="mr-2 h-4 w-4" />
                          Move to Interview
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handleAcceptApplication(application.id)
                          }
                        >
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          Accept
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handleRejectApplication(application.id)
                          }
                          className="text-red-600"
                        >
                          <XCircle className="mr-2 h-4 w-4" />
                          Reject
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </CardContent>
      </Card>

      {/* View CV Dialog */}
      <Dialog
        open={!!viewCVApplication}
        onOpenChange={() => setViewCVApplication(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>CV for {viewCVApplication?.candidateName}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>
              CV URL:{" "}
              <a
                href={viewCVApplication?.cvUrl}
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {viewCVApplication?.cvUrl}
              </a>
            </p>
            <p className="text-gray-500">
              This is a placeholder for the CV viewer. In a real application,
              this would display the CV content or link to a downloadable file.
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setViewCVApplication(null)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Contact Dialog */}
      <Dialog
        open={!!contactApplication}
        onOpenChange={() => setContactApplication(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Contact {contactApplication?.candidateName}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Subject*</Label>
              <Input
                value={contactForm.subject}
                onChange={(e) =>
                  setContactForm({ ...contactForm, subject: e.target.value })
                }
                placeholder="Enter email subject"
                aria-required="true"
              />
            </div>
            <div className="space-y-2">
              <Label>Message*</Label>
              <Textarea
                value={contactForm.message}
                onChange={(e) =>
                  setContactForm({ ...contactForm, message: e.target.value })
                }
                placeholder="Enter your message"
                rows={4}
                aria-required="true"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setContactApplication(null)}
            >
              Cancel
            </Button>
            <Button onClick={handleSendContact}>Send</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Details Dialog */}
      <Dialog
        open={!!viewDetailsApplication}
        onOpenChange={() => setViewDetailsApplication(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Application Details for {viewDetailsApplication?.candidateName}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold">Position</h4>
              <p>{viewDetailsApplication?.position}</p>
            </div>
            <div>
              <h4 className="font-semibold">Education</h4>
              <p>{viewDetailsApplication?.education}</p>
            </div>
            <div>
              <h4 className="font-semibold">Email</h4>
              <p>{viewDetailsApplication?.email}</p>
            </div>
            <div>
              <h4 className="font-semibold">Description</h4>
              <p>{viewDetailsApplication?.description}</p>
            </div>
            <div>
              <h4 className="font-semibold">Applied At</h4>
              <p>{viewDetailsApplication?.appliedAt.toLocaleDateString()}</p>
            </div>
            <div>
              <h4 className="font-semibold">Status</h4>
              <Badge
                variant={
                  viewDetailsApplication?.status === "pending"
                    ? "outline"
                    : viewDetailsApplication?.status === "accepted"
                    ? "default"
                    : viewDetailsApplication?.status === "rejected"
                    ? "destructive"
                    : "secondary"
                }
              >
                {viewDetailsApplication?.status}
              </Badge>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setViewDetailsApplication(null)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Applications;
