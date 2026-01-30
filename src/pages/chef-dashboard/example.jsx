import {
  Briefcase,
  Building,
  Calendar as CalendarIcon,
  CheckCircle2,
  Clock,
  Edit,
  FileText,
  GraduationCap,
  Mail,
  Plus,
  Trash,
  UserCheck,
  UserPlus,
  Users,
  Video,
  XCircle,
} from "lucide-react";
import { memo, useCallback, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./components/avatar";
import { Badge } from "./components/badge";
import { Button } from "./components/button";
import { Calendar } from "./components/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/dialog";
import { Input } from "./components/input";
import { Label } from "./components/label";
import { ScrollArea } from "./components/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/tabs";
import { Textarea } from "./components/textarea";
import { useToast } from "./components/use-toast";

// Reusable SubjectCard Component
const SubjectCard = memo(({ subject, supervisors, onDelete, onEdit }) => (
  <Card>
    <CardHeader>
      <div className="flex justify-between items-start">
        <CardTitle>{subject.title}</CardTitle>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onEdit(subject)}
            aria-label={`Edit ${subject.title}`}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onDelete(subject.id)}
            aria-label={`Delete ${subject.title}`}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-gray-600 mb-4">{subject.description}</p>
      <div className="flex items-center space-x-2">
        <Avatar className="h-8 w-8">
          <AvatarImage
            src={
              subject.avatarUrl ||
              supervisors.find((s) => s.name === subject.supervisor)?.avatarUrl
            }
          />
          <AvatarFallback>{subject.supervisor[0]}</AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium">{subject.supervisor}</span>
        <Badge>{subject.status}</Badge>
      </div>
    </CardContent>
  </Card>
));

// Reusable OfferCard Component
const OfferCard = memo(({ offer, onDelete, onEdit }) => (
  <Card>
    <CardHeader>
      <div className="flex justify-between items-start">
        <div>
          <CardTitle>{offer.title}</CardTitle>
          <CardDescription className="mt-1">
            <Badge variant="outline" className="mr-2">
              {offer.duration}
            </Badge>
            <Badge variant="outline">{offer.level}</Badge>
          </CardDescription>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onEdit(offer)}
            aria-label={`Edit ${offer.title}`}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onDelete(offer.id)}
            aria-label={`Delete ${offer.title}`}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-gray-600 mb-4">{offer.description}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Building className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-600">{offer.department}</span>
        </div>
        <Badge variant="secondary">{offer.applicationCount} Applications</Badge>
      </div>
    </CardContent>
  </Card>
));

// Reusable ApplicationCard Component
const ApplicationCard = memo(({ application, onAccept, onReject }) => (
  <Card>
    <CardHeader>
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={application.avatarUrl} />
            <AvatarFallback>
              {application.candidateName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">
              {application.candidateName}
            </CardTitle>
            <div className="flex items-center space-x-2 mt-1">
              <Mail className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">{application.email}</span>
            </div>
          </div>
        </div>
        <Badge variant="outline" className="ml-4">
          {application.status === "pending" ? "New" : application.status}
        </Badge>
      </div>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">
            Applied for: {application.position}
          </h4>
          <p className="text-sm text-gray-600">{application.description}</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">
              {application.education}
            </span>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onReject(application.id)}
              aria-label={`Reject ${application.candidateName}`}
            >
              <XCircle className="h-4 w-4 mr-1" />
              Reject
            </Button>
            <Button
              size="sm"
              onClick={() => onAccept(application.id)}
              aria-label={`Accept ${application.candidateName}`}
            >
              <CheckCircle2 className="h-4 w-4 mr-1" />
              Accept
            </Button>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
));

// Reusable InternCard Component
const InternCard = memo(({ intern, onReassign, onEdit }) => (
  <Card>
    <CardHeader>
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={intern.avatarUrl} />
            <AvatarFallback>
              {intern.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">{intern.name}</CardTitle>
            <div className="flex items-center space-x-2 mt-1">
              <Badge variant="outline">{intern.position}</Badge>
            </div>
          </div>
        </div>
        <Badge
          className={
            intern.status === "active" ? "bg-green-100 text-green-800" : ""
          }
        >
          {intern.status}
        </Badge>
      </div>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Supervisor</h4>
            <div className="flex items-center space-x-2 mt-1">
              <Avatar className="h-6 w-6">
                <AvatarImage src={intern.avatarUrl} />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <span className="text-sm">{intern.supervisor}</span>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Duration</h4>
            <div className="flex items-center space-x-2 mt-1">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-sm">
                {intern.duration} ({intern.remainingTime} remaining)
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(intern)}
            aria-label={`Edit ${intern.name}`}
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onReassign(intern.id)}
            aria-label={`Reassign ${intern.name}`}
          >
            <UserPlus className="h-4 w-4 mr-1" />
            Reassign
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
));

// Reusable InterviewCard Component
const InterviewCard = memo(({ interview, onCancel, onEdit }) => (
  <Card>
    <CardHeader>
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={interview.avatarUrl} />
            <AvatarFallback>
              {interview.candidateName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">
              Interview with {interview.candidateName}
            </CardTitle>
            <div className="flex items-center space-x-2 mt-1">
              <CalendarIcon className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                {interview.date} at {interview.time}
              </span>
            </div>
          </div>
        </div>
        <Badge>{interview.status}</Badge>
      </div>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Position</h4>
            <p className="text-sm mt-1">{interview.position}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Interviewer</h4>
            <div className="flex items-center space-x-2 mt-1">
              <Avatar className="h-6 w-6">
                <AvatarImage src={interview.avatarUrl} />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <span className="text-sm">{interview.interviewer}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Video className="h-4 w-4 text-gray-500" />
            <a
              href={interview.meetingLink}
              className="text-sm text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join Meeting
            </a>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(interview)}
              aria-label={`Reschedule interview with ${interview.candidateName}`}
            >
              <Edit className="h-4 w-4 mr-1" />
              Reschedule
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onCancel(interview.id)}
              aria-label={`Cancel interview with ${interview.candidateName}`}
            >
              <Trash className="h-4 w-4 mr-1" />
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
));

// Reusable SupervisorCard Component
const SupervisorCard = memo(({ supervisor, onDelete, onEdit }) => (
  <Card>
    <CardHeader>
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={supervisor.avatarUrl} />
            <AvatarFallback>
              {supervisor.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">{supervisor.name}</CardTitle>
            <div className="flex items-center space-x-2 mt-1">
              <Mail className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">{supervisor.email}</span>
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onEdit(supervisor)}
            aria-label={`Edit ${supervisor.name}`}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onDelete(supervisor.id)}
            aria-label={`Delete ${supervisor.name}`}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Department</h4>
            <p className="text-sm mt-1">{supervisor.department}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">
              Specialization
            </h4>
            <p className="text-sm mt-1">{supervisor.specialization}</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500">
                Current Interns
              </h4>
              <Badge variant="secondary" className="mt-1">
                {supervisor.currentInterns} Interns
              </Badge>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Subjects</h4>
              <Badge variant="secondary" className="mt-1">
                {supervisor.subjects} Subjects
              </Badge>
            </div>
          </div>
          <Button variant="outline" size="sm">
            View Details
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
));

function DashboardChefDepartement() {
  const { toast } = useToast();
  const [date, setDate] = useState(new Date());
  const [errors, setErrors] = useState([]);

  // State for forms
  const [newSubject, setNewSubject] = useState({
    title: "",
    description: "",
    supervisor: "",
  });

  const [editingSubject, setEditingSubject] = useState(null);

  const [newOffer, setNewOffer] = useState({
    title: "",
    description: "",
    duration: "",
    level: "",
  });

  const [editingOffer, setEditingOffer] = useState(null);

  const [newSupervisor, setNewSupervisor] = useState({
    name: "",
    email: "",
    department: "",
    specialization: "",
  });

  const [editingSupervisor, setEditingSupervisor] = useState(null);

  const [newInterview, setNewInterview] = useState({
    candidate: "",
    interviewer: "",
    time: "",
    meetingLink: "",
  });

  const [editingInterview, setEditingInterview] = useState(null);

  const [newIntern, setNewIntern] = useState({
    name: "",
    position: "",
    supervisor: "",
    duration: "",
    remainingTime: "",
    status: "active",
  });

  const [editingIntern, setEditingIntern] = useState(null);

  // State for data
  const [subjects, setSubjects] = useState([
    {
      id: "1",
      title: "Machine Learning for IoT Devices",
      description:
        "Implementation of ML algorithms on resource-constrained IoT devices",
      supervisor: "Dr. John Doe",
      status: "available",
    },
  ]);

  const [offers, setOffers] = useState([
    {
      id: "1",
      title: "Full Stack Development Intern",
      description:
        "Looking for a talented intern to join our development team. Experience with React and Node.js is required.",
      duration: "3m",
      level: "master",
      department: "Computer Science",
      applicationCount: 5,
    },
  ]);

  const [applications, setApplications] = useState([
    {
      id: "1",
      candidateName: "John Smith",
      email: "john.smith@example.com",
      position: "Full Stack Development Intern",
      education: "Master's in Computer Science",
      status: "pending",
      description:
        "I am a final year Computer Science student with experience in web development...",
      avatarUrl:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  ]);

  const [interns, setInterns] = useState([
    {
      id: "1",
      name: "Sarah Johnson",
      position: "Machine Learning Intern",
      supervisor: "Dr. John Doe",
      duration: "2 months",
      remainingTime: "1 month",
      status: "active",
      avatarUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  ]);

  const [interviews, setInterviews] = useState([
    {
      id: "1",
      candidateName: "John Smith",
      position: "Full Stack Development Intern",
      interviewer: "Dr. John Doe",
      date: "Tomorrow",
      time: "10:00 AM",
      meetingLink: "#",
      status: "upcoming",
      avatarUrl:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  ]);

  const [supervisors, setSupervisors] = useState([
    {
      id: "1",
      name: "Dr. John Doe",
      email: "john.doe@university.edu",
      department: "Computer Science",
      specialization: "Machine Learning & AI",
      currentInterns: 3,
      subjects: 2,
      avatarUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  ]);

  // Form Validation
  const validateForm = useCallback((formData, fields) => {
    const errors = [];
    fields.forEach((field) => {
      if (!formData[field]) {
        errors.push({ field, message: `${field} is required` });
      }
    });
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.push({ field: "email", message: "Invalid email format" });
    }
    return errors;
  }, []);

  // Handlers for Subjects
  const handleAddSubject = useCallback(() => {
    const validationErrors = validateForm(newSubject, [
      "title",
      "description",
      "supervisor",
    ]);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newSubjectData = {
      id: Date.now().toString(),
      title: newSubject.title,
      description: newSubject.description,
      supervisor: newSubject.supervisor,
      status: "available",
    };
    setSubjects([...subjects, newSubjectData]);
    setNewSubject({ title: "", description: "", supervisor: "" });
    setErrors([]);
    toast({
      title: "Success",
      description: "Subject added successfully",
    });
  }, [newSubject, subjects, toast]);

  const handleEditSubject = useCallback(() => {
    if (!editingSubject) return;
    const validationErrors = validateForm(editingSubject, [
      "title",
      "description",
      "supervisor",
    ]);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubjects(
      subjects.map((s) => (s.id === editingSubject.id ? editingSubject : s))
    );
    setEditingSubject(null);
    setErrors([]);
    toast({
      title: "Success",
      description: "Subject updated successfully",
    });
  }, [editingSubject, subjects, toast]);

  const handleDeleteSubject = useCallback(
    (id) => {
      setSubjects(subjects.filter((subject) => subject.id !== id));
      toast({
        title: "Success",
        description: "Subject deleted successfully",
      });
    },
    [subjects, toast]
  );

  // Handlers for Offers
  const handleAddOffer = useCallback(() => {
    const validationErrors = validateForm(newOffer, [
      "title",
      "description",
      "duration",
      "level",
    ]);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newOfferData = {
      id: Date.now().toString(),
      title: newOffer.title,
      description: newOffer.description,
      duration: newOffer.duration,
      level: newOffer.level,
      department: "Computer Science",
      applicationCount: 0,
    };
    setOffers([...offers, newOfferData]);
    setNewOffer({ title: "", description: "", duration: "", level: "" });
    setErrors([]);
    toast({
      title: "Success",
      description: "Offer published successfully",
    });
  }, [newOffer, offers, toast]);

  const handleEditOffer = useCallback(() => {
    if (!editingOffer) return;
    const validationErrors = validateForm(editingOffer, [
      "title",
      "description",
      "duration",
      "level",
    ]);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setOffers(offers.map((o) => (o.id === editingOffer.id ? editingOffer : o)));
    setEditingOffer(null);
    setErrors([]);
    toast({
      title: "Success",
      description: "Offer updated successfully",
    });
  }, [editingOffer, offers, toast]);

  const handleDeleteOffer = useCallback(
    (id) => {
      setOffers(offers.filter((offer) => offer.id !== id));
      toast({
        title: "Success",
        description: "Offer deleted successfully",
      });
    },
    [offers, toast]
  );

  // Handlers for Applications
  const handleAcceptApplication = useCallback(
    (id) => {
      setApplications(
        applications.map((app) =>
          app.id === id ? { ...app, status: "accepted" } : app
        )
      );
      toast({
        title: "Success",
        description: "Application accepted",
      });
    },
    [applications, toast]
  );

  const handleRejectApplication = useCallback(
    (id) => {
      setApplications(
        applications.map((app) =>
          app.id === id ? { ...app, status: "rejected" } : app
        )
      );
      toast({
        title: "Success",
        description: "Application rejected",
      });
    },
    [applications, toast]
  );

  // Handlers for Interns
  const handleAddIntern = useCallback(() => {
    const validationErrors = validateForm(newIntern, [
      "name",
      "position",
      "supervisor",
      "duration",
      "remainingTime",
    ]);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newInternData = {
      id: Date.now().toString(),
      name: newIntern.name,
      position: newIntern.position,
      supervisor: newIntern.supervisor,
      duration: newIntern.duration,
      remainingTime: newIntern.remainingTime,
      status: newIntern.status || "active",
      avatarUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    };
    setInterns([...interns, newInternData]);
    setNewIntern({
      name: "",
      position: "",
      supervisor: "",
      duration: "",
      remainingTime: "",
      status: "active",
    });
    setErrors([]);
    toast({
      title: "Success",
      description: "Intern added successfully",
    });
  }, [newIntern, interns, toast]);

  const handleEditIntern = useCallback(() => {
    if (!editingIntern) return;
    const validationErrors = validateForm(editingIntern, [
      "name",
      "position",
      "supervisor",
      "duration",
      "remainingTime",
    ]);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setInterns(
      interns.map((i) => (i.id === editingIntern.id ? editingIntern : i))
    );
    setEditingIntern(null);
    setErrors([]);
    toast({
      title: "Success",
      description: "Intern updated successfully",
    });
  }, [editingIntern, interns, toast]);

  const handleReassignIntern = useCallback(
    (id) => {
      // Placeholder for reassignment logic
      toast({
        title: "Success",
        description: "Intern reassigned successfully",
      });
    },
    [toast]
  );

  // Handlers for Interviews
  const handleScheduleInterview = useCallback(() => {
    const validationErrors = validateForm(newInterview, [
      "candidate",
      "interviewer",
      "time",
      "meetingLink",
    ]);
    if (!date) {
      validationErrors.push({ field: "date", message: "Date is required" });
    }
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newInterviewData = {
      id: Date.now().toString(),
      candidateName: newInterview.candidate,
      position:
        applications.find((app) => app.candidateName === newInterview.candidate)
          ?.position || "Position",
      interviewer: newInterview.interviewer,
      date: date.toLocaleDateString(),
      time: newInterview.time,
      meetingLink: newInterview.meetingLink,
      status: "upcoming",
      avatarUrl:
        applications.find((app) => app.candidateName === newInterview.candidate)
          ?.avatarUrl ||
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    };
    setInterviews([...interviews, newInterviewData]);
    setNewInterview({
      candidate: "",
      interviewer: "",
      time: "",
      meetingLink: "",
    });
    setErrors([]);
    toast({
      title: "Success",
      description: "Interview scheduled successfully",
    });
  }, [newInterview, date, interviews, applications, toast]);

  const handleEditInterview = useCallback(() => {
    if (!editingInterview || !date) return;
    const validationErrors = validateForm(editingInterview, [
      "candidateName",
      "interviewer",
      "time",
      "meetingLink",
    ]);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setInterviews(
      interviews.map((i) =>
        i.id === editingInterview.id
          ? { ...editingInterview, date: date.toLocaleDateString() }
          : i
      )
    );
    setEditingInterview(null);
    setErrors([]);
    toast({
      title: "Success",
      description: "Interview updated successfully",
    });
  }, [editingInterview, date, interviews, toast]);

  const handleCancelInterview = useCallback(
    (id) => {
      setInterviews(
        interviews.map((interview) =>
          interview.id === id
            ? { ...interview, status: "cancelled" }
            : interview
        )
      );
      toast({
        title: "Success",
        description: "Interview cancelled",
      });
    },
    [interviews, toast]
  );

  // Handlers for Supervisors
  const handleAddSupervisor = useCallback(() => {
    const validationErrors = validateForm(newSupervisor, [
      "name",
      "email",
      "department",
      "specialization",
    ]);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newSupervisorData = {
      id: Date.now().toString(),
      name: newSupervisor.name,
      email: newSupervisor.email,
      department: newSupervisor.department,
      specialization: newSupervisor.specialization,
      currentInterns: 0,
      subjects: 0,
      avatarUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    };
    setSupervisors([...supervisors, newSupervisorData]);
    setNewSupervisor({
      name: "",
      email: "",
      department: "",
      specialization: "",
    });
    setErrors([]);
    toast({
      title: "Success",
      description: "Supervisor added successfully",
    });
  }, [newSupervisor, supervisors, toast]);

  const handleEditSupervisor = useCallback(() => {
    if (!editingSupervisor) return;
    const validationErrors = validateForm(editingSupervisor, [
      "name",
      "email",
      "department",
      "specialization",
    ]);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSupervisors(
      supervisors.map((s) =>
        s.id === editingSupervisor.id ? editingSupervisor : s
      )
    );
    setEditingSupervisor(null);
    setErrors([]);
    toast({
      title: "Success",
      description: "Supervisor updated successfully",
    });
  }, [editingSupervisor, supervisors, toast]);

  const handleDeleteSupervisor = useCallback(
    (id) => {
      setSupervisors(supervisors.filter((supervisor) => supervisor.id !== id));
      toast({
        title: "Success",
        description: "Supervisor removed successfully",
      });
    },
    [supervisors, toast]
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" aria-hidden="true" />
              <h1 className="ml-3 text-2xl font-semibold text-gray-900">
                Chef de Département Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="User avatar"
                />
                <AvatarFallback>CD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="subjects" className="space-y-6">
          <TabsList className="bg-white p-1 space-x-2 flex flex-wrap">
            <TabsTrigger value="subjects" className="flex items-center">
              <FileText className="w-4 h-4 mr-2" aria-hidden="true" />
              Internship Subjects
            </TabsTrigger>
            <TabsTrigger value="offers" className="flex items-center">
              <Briefcase className="w-4 h-4 mr-2" aria-hidden="true" />
              Internship Offers
            </TabsTrigger>
            <TabsTrigger value="applications" className="flex items-center">
              <UserCheck className="w-4 h-4 mr-2" aria-hidden="true" />
              Applications
            </TabsTrigger>
            <TabsTrigger value="interns" className="flex items-center">
              <Users className="w-4 h-4 mr-2" aria-hidden="true" />
              Interns
            </TabsTrigger>
            <TabsTrigger value="interviews" className="flex items-center">
              <CalendarIcon className="w-4 h-4 mr-2" aria-hidden="true" />
              Interviews
            </TabsTrigger>
            <TabsTrigger value="supervisors" className="flex items-center">
              <UserPlus className="w-4 h-4 mr-2" aria-hidden="true" />
              Supervisors
            </TabsTrigger>
          </TabsList>

          {/* Internship Subjects Tab */}
          <TabsContent value="subjects">
            <div className="grid gap-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Internship Subjects</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" aria-hidden="true" />
                      Add Subject
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        {editingSubject ? "Edit Subject" : "Add New Subject"}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="subject-title">Subject Title</Label>
                        <Input
                          id="subject-title"
                          placeholder="Enter subject title"
                          value={editingSubject?.title || newSubject.title}
                          onChange={(e) =>
                            editingSubject
                              ? setEditingSubject({
                                  ...editingSubject,
                                  title: e.target.value,
                                })
                              : setNewSubject({
                                  ...newSubject,
                                  title: e.target.value,
                                })
                          }
                          aria-invalid={errors.some((e) => e.field === "title")}
                        />
                        {errors.find((e) => e.field === "title") && (
                          <p className="text-sm text-red-600">
                            {errors.find((e) => e.field === "title")?.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject-description">Description</Label>
                        <Input
                          id="subject-description"
                          placeholder="Enter subject description"
                          value={
                            editingSubject?.description ||
                            newSubject.description
                          }
                          onChange={(e) =>
                            editingSubject
                              ? setEditingSubject({
                                  ...editingSubject,
                                  description: e.target.value,
                                })
                              : setNewSubject({
                                  ...newSubject,
                                  description: e.target.value,
                                })
                          }
                          aria-invalid={errors.some(
                            (e) => e.field === "description"
                          )}
                        />
                        {errors.find((e) => e.field === "description") && (
                          <p className="text-sm text-red-600">
                            {
                              errors.find((e) => e.field === "description")
                                ?.message
                            }
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject-supervisor">Supervisor</Label>
                        <Select
                          value={
                            editingSubject?.supervisor || newSubject.supervisor
                          }
                          onValueChange={(value) =>
                            editingSubject
                              ? setEditingSubject({
                                  ...editingSubject,
                                  supervisor: value,
                                })
                              : setNewSubject({
                                  ...newSubject,
                                  supervisor: value,
                                })
                          }
                        >
                          <SelectTrigger
                            id="subject-supervisor"
                            aria-invalid={errors.some(
                              (e) => e.field === "supervisor"
                            )}
                          >
                            <SelectValue placeholder="Select supervisor" />
                          </SelectTrigger>
                          <SelectContent>
                            {supervisors.map((supervisor) => (
                              <SelectItem
                                key={supervisor.id}
                                value={supervisor.name}
                              >
                                {supervisor.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.find((e) => e.field === "supervisor") && (
                          <p className="text-sm text-red-600">
                            {
                              errors.find((e) => e.field === "supervisor")
                                ?.message
                            }
                          </p>
                        )}
                      </div>
                      <Button
                        className="w-full"
                        onClick={
                          editingSubject ? handleEditSubject : handleAddSubject
                        }
                        aria-label={
                          editingSubject ? "Update Subject" : "Create Subject"
                        }
                      >
                        {editingSubject ? "Update Subject" : "Create Subject"}
                      </Button>
                      {editingSubject && (
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => setEditingSubject(null)}
                          aria-label="Cancel Edit"
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <ScrollArea className="h-[600px] rounded-md border">
                <div className="p-4 space-y-4">
                  {subjects.map((subject) => (
                    <SubjectCard
                      key={subject.id}
                      subject={subject}
                      supervisors={supervisors}
                      onDelete={handleDeleteSubject}
                      onEdit={setEditingSubject}
                    />
                  ))}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>

          {/* Internship Offers Tab */}
          <TabsContent value="offers">
            <div className="grid gap-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Internship Offers</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" aria-hidden="true" />
                      Post New Offer
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>
                        {editingOffer
                          ? "Edit Offer"
                          : "Post New Internship Offer"}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="offer-title">Position Title</Label>
                        <Input
                          id="offer-title"
                          placeholder="e.g., Software Engineering Intern"
                          value={editingOffer?.title || newOffer.title}
                          onChange={(e) =>
                            editingOffer
                              ? setEditingOffer({
                                  ...editingOffer,
                                  title: e.target.value,
                                })
                              : setNewOffer({
                                  ...newOffer,
                                  title: e.target.value,
                                })
                          }
                          aria-invalid={errors.some((e) => e.field === "title")}
                        />
                        {errors.find((e) => e.field === "title") && (
                          <p className="text-sm text-red-600">
                            {errors.find((e) => e.field === "title")?.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="offer-description">Description</Label>
                        <Textarea
                          id="offer-description"
                          placeholder="Describe the internship position..."
                          value={
                            editingOffer?.description || newOffer.description
                          }
                          onChange={(e) =>
                            editingOffer
                              ? setEditingOffer({
                                  ...editingOffer,
                                  description: e.target.value,
                                })
                              : setNewOffer({
                                  ...newOffer,
                                  description: e.target.value,
                                })
                          }
                          aria-invalid={errors.some(
                            (e) => e.field === "description"
                          )}
                        />
                        {errors.find((e) => e.field === "description") && (
                          <p className="text-sm text-red-600">
                            {
                              errors.find((e) => e.field === "description")
                                ?.message
                            }
                          </p>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="offer-duration">Duration</Label>
                          <Select
                            value={editingOffer?.duration || newOffer.duration}
                            onValueChange={(value) =>
                              editingOffer
                                ? setEditingOffer({
                                    ...editingOffer,
                                    duration: value,
                                  })
                                : setNewOffer({
                                    ...newOffer,
                                    duration: value,
                                  })
                            }
                          >
                            <SelectTrigger
                              id="offer-duration"
                              aria-invalid={errors.some(
                                (e) => e.field === "duration"
                              )}
                            >
                              <SelectValue placeholder="Select duration" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="2m">2 Months</SelectItem>
                              <SelectItem value="3m">3 Months</SelectItem>
                              <SelectItem value="6m">6 Months</SelectItem>
                            </SelectContent>
                          </Select>
                          {errors.find((e) => e.field === "duration") && (
                            <p className="text-sm text-red-600">
                              {
                                errors.find((e) => e.field === "duration")
                                  ?.message
                              }
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="offer-level">Required Level</Label>
                          <Select
                            value={editingOffer?.level || newOffer.level}
                            onValueChange={(value) =>
                              editingOffer
                                ? setEditingOffer({
                                    ...editingOffer,
                                    level: value,
                                  })
                                : setNewOffer({
                                    ...newOffer,
                                    level: value,
                                  })
                            }
                          >
                            <SelectTrigger
                              id="offer-level"
                              aria-invalid={errors.some(
                                (e) => e.field === "level"
                              )}
                            >
                              <SelectValue placeholder="Select level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="bachelor">Bachelor</SelectItem>
                              <SelectItem value="master">Master</SelectItem>
                              <SelectItem value="phd">PhD</SelectItem>
                            </SelectContent>
                          </Select>
                          {errors.find((e) => e.field === "level") && (
                            <p className="text-sm text-red-600">
                              {errors.find((e) => e.field === "level")?.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <Button
                        className="w-full"
                        onClick={
                          editingOffer ? handleEditOffer : handleAddOffer
                        }
                        aria-label={
                          editingOffer ? "Update Offer" : "Publish Offer"
                        }
                      >
                        {editingOffer ? "Update Offer" : "Publish Offer"}
                      </Button>
                      {editingOffer && (
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => setEditingOffer(null)}
                          aria-label="Cancel Edit"
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <ScrollArea className="h-[600px] rounded-md border">
                <div className="p-4 space-y-4">
                  {offers.map((offer) => (
                    <OfferCard
                      key={offer.id}
                      offer={offer}
                      onDelete={handleDeleteOffer}
                      onEdit={setEditingOffer}
                    />
                  ))}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications">
            <div className="grid gap-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Applications</h2>
                <div className="flex items-center space-x-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Applications</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="accepted">Accepted</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                  <Badge variant="secondary">3 New</Badge>
                </div>
              </div>
              <ScrollArea className="h-[600px] rounded-md border">
                <div className="p-4 space-y-4">
                  {applications.map((application) => (
                    <ApplicationCard
                      key={application.id}
                      application={application}
                      onAccept={handleAcceptApplication}
                      onReject={handleRejectApplication}
                    />
                  ))}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>

          {/* Interns Tab */}
          <TabsContent value="interns">
            <div className="grid gap-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Current Interns</h2>
                <div className="flex items-center space-x-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Interns</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" aria-hidden="true" />
                        Add Intern
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          {editingIntern ? "Edit Intern" : "Add New Intern"}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="intern-name">Name</Label>
                          <Input
                            id="intern-name"
                            placeholder="Enter intern's name"
                            value={editingIntern?.name || newIntern.name}
                            onChange={(e) =>
                              editingIntern
                                ? setEditingIntern({
                                    ...editingIntern,
                                    name: e.target.value,
                                  })
                                : setNewIntern({
                                    ...newIntern,
                                    name: e.target.value,
                                  })
                            }
                            aria-invalid={errors.some(
                              (e) => e.field === "name"
                            )}
                          />
                          {errors.find((e) => e.field === "name") && (
                            <p className="text-sm text-red-600">
                              {errors.find((e) => e.field === "name")?.message}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="intern-position">Position</Label>
                          <Input
                            id="intern-position"
                            placeholder="Enter position"
                            value={
                              editingIntern?.position || newIntern.position
                            }
                            onChange={(e) =>
                              editingIntern
                                ? setEditingIntern({
                                    ...editingIntern,
                                    position: e.target.value,
                                  })
                                : setNewIntern({
                                    ...newIntern,
                                    position: e.target.value,
                                  })
                            }
                            aria-invalid={errors.some(
                              (e) => e.field === "position"
                            )}
                          />
                          {errors.find((e) => e.field === "position") && (
                            <p className="text-sm text-red-600">
                              {
                                errors.find((e) => e.field === "position")
                                  ?.message
                              }
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="intern-supervisor">Supervisor</Label>
                          <Select
                            value={
                              editingIntern?.supervisor || newIntern.supervisor
                            }
                            onValueChange={(value) =>
                              editingIntern
                                ? setEditingIntern({
                                    ...editingIntern,
                                    supervisor: value,
                                  })
                                : setNewIntern({
                                    ...newIntern,
                                    supervisor: value,
                                  })
                            }
                          >
                            <SelectTrigger
                              id="intern-supervisor"
                              aria-invalid={errors.some(
                                (e) => e.field === "supervisor"
                              )}
                            >
                              <SelectValue placeholder="Select supervisor" />
                            </SelectTrigger>
                            <SelectContent>
                              {supervisors.map((supervisor) => (
                                <SelectItem
                                  key={supervisor.id}
                                  value={supervisor.name}
                                >
                                  {supervisor.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {errors.find((e) => e.field === "supervisor") && (
                            <p className="text-sm text-red-600">
                              {
                                errors.find((e) => e.field === "supervisor")
                                  ?.message
                              }
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="intern-duration">Duration</Label>
                          <Input
                            id="intern-duration"
                            placeholder="Enter duration"
                            value={
                              editingIntern?.duration || newIntern.duration
                            }
                            onChange={(e) =>
                              editingIntern
                                ? setEditingIntern({
                                    ...editingIntern,
                                    duration: e.target.value,
                                  })
                                : setNewIntern({
                                    ...newIntern,
                                    duration: e.target.value,
                                  })
                            }
                            aria-invalid={errors.some(
                              (e) => e.field === "duration"
                            )}
                          />
                          {errors.find((e) => e.field === "duration") && (
                            <p className="text-sm text-red-600">
                              {
                                errors.find((e) => e.field === "duration")
                                  ?.message
                              }
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="intern-remaining">
                            Remaining Time
                          </Label>
                          <Input
                            id="intern-remaining"
                            placeholder="Enter remaining time"
                            value={
                              editingIntern?.remainingTime ||
                              newIntern.remainingTime
                            }
                            onChange={(e) =>
                              editingIntern
                                ? setEditingIntern({
                                    ...editingIntern,
                                    remainingTime: e.target.value,
                                  })
                                : setNewIntern({
                                    ...newIntern,
                                    remainingTime: e.target.value,
                                  })
                            }
                            aria-invalid={errors.some(
                              (e) => e.field === "remainingTime"
                            )}
                          />
                          {errors.find((e) => e.field === "remainingTime") && (
                            <p className="text-sm text-red-600">
                              {
                                errors.find((e) => e.field === "remainingTime")
                                  ?.message
                              }
                            </p>
                          )}
                        </div>
                        <Button
                          className="w-full"
                          onClick={
                            editingIntern ? handleEditIntern : handleAddIntern
                          }
                          aria-label={
                            editingIntern ? "Update Intern" : "Add Intern"
                          }
                        >
                          {editingIntern ? "Update Intern" : "Add Intern"}
                        </Button>
                        {editingIntern && (
                          <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => setEditingIntern(null)}
                            aria-label="Cancel Edit"
                          >
                            Cancel
                          </Button>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              <ScrollArea className="h-[600px] rounded-md border">
                <div className="p-4 space-y-4">
                  {interns.map((intern) => (
                    <InternCard
                      key={intern.id}
                      intern={intern}
                      onReassign={handleReassignIntern}
                      onEdit={setEditingIntern}
                    />
                  ))}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>

          {/* Interviews Tab */}
          <TabsContent value="interviews">
            <div className="grid gap-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Scheduled Interviews</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Video className="w-4 h-4 mr-2" aria-hidden="true" />
                      Schedule Interview
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        {editingInterview
                          ? "Edit Interview"
                          : "Schedule New Interview"}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="interview-candidate">Candidate</Label>
                        <Select
                          value={
                            editingInterview?.candidateName ||
                            newInterview.candidate
                          }
                          onValueChange={(value) =>
                            editingInterview
                              ? setEditingInterview({
                                  ...editingInterview,
                                  candidateName: value,
                                })
                              : setNewInterview({
                                  ...newInterview,
                                  candidate: value,
                                })
                          }
                        >
                          <SelectTrigger
                            id="interview-candidate"
                            aria-invalid={errors.some(
                              (e) => e.field === "candidate"
                            )}
                          >
                            <SelectValue placeholder="Select candidate" />
                          </SelectTrigger>
                          <SelectContent>
                            {applications
                              .filter((app) => app.status === "pending")
                              .map((candidate) => (
                                <SelectItem
                                  key={candidate.id}
                                  value={candidate.candidateName}
                                >
                                  {candidate.candidateName}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                        {errors.find((e) => e.field === "candidate") && (
                          <p className="text-sm text-red-600">
                            {
                              errors.find((e) => e.field === "candidate")
                                ?.message
                            }
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="interview-interviewer">
                          Interviewer
                        </Label>
                        <Select
                          value={
                            editingInterview?.interviewer ||
                            newInterview.interviewer
                          }
                          onValueChange={(value) =>
                            editingInterview
                              ? setEditingInterview({
                                  ...editingInterview,
                                  interviewer: value,
                                })
                              : setNewInterview({
                                  ...newInterview,
                                  interviewer: value,
                                })
                          }
                        >
                          <SelectTrigger
                            id="interview-interviewer"
                            aria-invalid={errors.some(
                              (e) => e.field === "interviewer"
                            )}
                          >
                            <SelectValue placeholder="Select interviewer" />
                          </SelectTrigger>
                          <SelectContent>
                            {supervisors.map((supervisor) => (
                              <SelectItem
                                key={supervisor.id}
                                value={supervisor.name}
                              >
                                {supervisor.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.find((e) => e.field === "interviewer") && (
                          <p className="text-sm text-red-600">
                            {
                              errors.find((e) => e.field === "interviewer")
                                ?.message
                            }
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label>Date</Label>
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={(selectedDate) => setDate(selectedDate)}
                          className="rounded-md border"
                          aria-invalid={errors.some((e) => e.field === "date")}
                        />
                        {errors.find((e) => e.field === "date") && (
                          <p className="text-sm text-red-600">
                            {errors.find((e) => e.field === "date")?.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="interview-time">Time</Label>
                        <Select
                          value={editingInterview?.time || newInterview.time}
                          onValueChange={(value) =>
                            editingInterview
                              ? setEditingInterview({
                                  ...editingInterview,
                                  time: value,
                                })
                              : setNewInterview({
                                  ...newInterview,
                                  time: value,
                                })
                          }
                        >
                          <SelectTrigger
                            id="interview-time"
                            aria-invalid={errors.some(
                              (e) => e.field === "time"
                            )}
                          >
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="9">9:00 AM</SelectItem>
                            <SelectItem value="10">10:00 AM</SelectItem>
                            <SelectItem value="11">11:00 AM</SelectItem>
                            <SelectItem value="14">2:00 PM</SelectItem>
                            <SelectItem value="15">3:00 PM</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.find((e) => e.field === "time") && (
                          <p className="text-sm text-red-600">
                            {errors.find((e) => e.field === "time")?.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="interview-meeting">Meeting Link</Label>
                        <Input
                          id="interview-meeting"
                          placeholder="Enter Zoom/Meet link"
                          value={
                            editingInterview?.meetingLink ||
                            newInterview.meetingLink
                          }
                          onChange={(e) =>
                            editingInterview
                              ? setEditingInterview({
                                  ...editingInterview,
                                  meetingLink: e.target.value,
                                })
                              : setNewInterview({
                                  ...newInterview,
                                  meetingLink: e.target.value,
                                })
                          }
                          aria-invalid={errors.some(
                            (e) => e.field === "meetingLink"
                          )}
                        />
                        {errors.find((e) => e.field === "meetingLink") && (
                          <p className="text-sm text-red-600">
                            {
                              errors.find((e) => e.field === "meetingLink")
                                ?.message
                            }
                          </p>
                        )}
                      </div>
                      <Button
                        className="w-full"
                        onClick={
                          editingInterview
                            ? handleEditInterview
                            : handleScheduleInterview
                        }
                        aria-label={
                          editingInterview
                            ? "Update Interview"
                            : "Schedule Interview"
                        }
                      >
                        {editingInterview
                          ? "Update Interview"
                          : "Schedule Interview"}
                      </Button>
                      {editingInterview && (
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => setEditingInterview(null)}
                          aria-label="Cancel Edit"
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <ScrollArea className="h-[600px] rounded-md border">
                <div className="p-4 space-y-4">
                  {interviews.map((interview) => (
                    <InterviewCard
                      key={interview.id}
                      interview={interview}
                      onCancel={handleCancelInterview}
                      onEdit={setEditingInterview}
                    />
                  ))}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>

          {/* Supervisors Tab */}
          <TabsContent value="supervisors">
            <div className="grid gap-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Supervisors</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <UserPlus className="w-4 h-4 mr-2" aria-hidden="true" />
                      Add Supervisor
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        {editingSupervisor
                          ? "Edit Supervisor"
                          : "Add New Supervisor"}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="supervisor-name">Full Name</Label>
                        <Input
                          id="supervisor-name"
                          placeholder="Enter supervisor's name"
                          value={editingSupervisor?.name || newSupervisor.name}
                          onChange={(e) =>
                            editingSupervisor
                              ? setEditingSupervisor({
                                  ...editingSupervisor,
                                  name: e.target.value,
                                })
                              : setNewSupervisor({
                                  ...newSupervisor,
                                  name: e.target.value,
                                })
                          }
                          aria-invalid={errors.some((e) => e.field === "name")}
                        />
                        {errors.find((e) => e.field === "name") && (
                          <p className="text-sm text-red-600">
                            {errors.find((e) => e.field === "name")?.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="supervisor-email">Email</Label>
                        <Input
                          id="supervisor-email"
                          type="email"
                          placeholder="Enter email address"
                          value={
                            editingSupervisor?.email || newSupervisor.email
                          }
                          onChange={(e) =>
                            editingSupervisor
                              ? setEditingSupervisor({
                                  ...editingSupervisor,
                                  email: e.target.value,
                                })
                              : setNewSupervisor({
                                  ...newSupervisor,
                                  email: e.target.value,
                                })
                          }
                          aria-invalid={errors.some((e) => e.field === "email")}
                        />
                        {errors.find((e) => e.field === "email") && (
                          <p className="text-sm text-red-600">
                            {errors.find((e) => e.field === "email")?.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="supervisor-department">
                          Department
                        </Label>
                        <Select
                          value={
                            editingSupervisor?.department ||
                            newSupervisor.department
                          }
                          onValueChange={(value) =>
                            editingSupervisor
                              ? setEditingSupervisor({
                                  ...editingSupervisor,
                                  department: value,
                                })
                              : setNewSupervisor({
                                  ...newSupervisor,
                                  department: value,
                                })
                          }
                        >
                          <SelectTrigger
                            id="supervisor-department"
                            aria-invalid={errors.some(
                              (e) => e.field === "department"
                            )}
                          >
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cs">Computer Science</SelectItem>
                            <SelectItem value="ee">
                              Electrical Engineering
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.find((e) => e.field === "department") && (
                          <p className="text-sm text-red-600">
                            {
                              errors.find((e) => e.field === "department")
                                ?.message
                            }
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="supervisor-specialization">
                          Specialization
                        </Label>
                        <Input
                          id="supervisor-specialization"
                          placeholder="Enter specialization"
                          value={
                            editingSupervisor?.specialization ||
                            newSupervisor.specialization
                          }
                          onChange={(e) =>
                            editingSupervisor
                              ? setEditingSupervisor({
                                  ...editingSupervisor,
                                  specialization: e.target.value,
                                })
                              : setNewSupervisor({
                                  ...newSupervisor,
                                  specialization: e.target.value,
                                })
                          }
                          aria-invalid={errors.some(
                            (e) => e.field === "specialization"
                          )}
                        />
                        {errors.find((e) => e.field === "specialization") && (
                          <p className="text-sm text-red-600">
                            {
                              errors.find((e) => e.field === "specialization")
                                ?.message
                            }
                          </p>
                        )}
                      </div>
                      <Button
                        className="w-full"
                        onClick={
                          editingSupervisor
                            ? handleEditSupervisor
                            : handleAddSupervisor
                        }
                        aria-label={
                          editingSupervisor
                            ? "Update Supervisor"
                            : "Add Supervisor"
                        }
                      >
                        {editingSupervisor
                          ? "Update Supervisor"
                          : "Add Supervisor"}
                      </Button>
                      {editingSupervisor && (
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => setEditingSupervisor(null)}
                          aria-label="Cancel Edit"
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <ScrollArea className="h-[600px] rounded-md border">
                <div className="p-4 space-y-4">
                  {supervisors.map((supervisor) => (
                    <SupervisorCard
                      key={supervisor.id}
                      supervisor={supervisor}
                      onDelete={handleDeleteSupervisor}
                      onEdit={setEditingSupervisor}
                    />
                  ))}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

export default DashboardChefDepartement;
