import {
  AlertCircle,
  Calendar as CalendarIcon,
  CheckCircle,
  Clock,
  Copy,
  Download,
  Edit,
  ExternalLink,
  Filter,
  Mail,
  MoreVertical,
  Phone,
  Search,
  Star,
  StarOff,
  Trash2,
  UserPlus,
  Users,
  Video,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";

// Mock shadcn/ui components with enhanced styling
const Avatar = ({ children, className = "" }) => (
  <div
    className={`relative inline-flex items-center justify-center w-10 h-10 rounded-full overflow-hidden ${className}`}
  >
    {children}
  </div>
);

const AvatarImage = ({ src, alt = "", className = "" }) => (
  <img
    src={src}
    alt={alt}
    className={`w-full h-full object-cover ${className}`}
  />
);

const AvatarFallback = ({ children, className = "" }) => (
  <div
    className={`flex items-center justify-center w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm font-semibold ${className}`}
  >
    {children}
  </div>
);

const Badge = ({ children, variant = "default", className = "" }) => {
  const variants = {
    default: "bg-blue-100 text-blue-800 border-blue-200",
    secondary: "bg-gray-100 text-gray-800 border-gray-200",
    destructive: "bg-red-100 text-red-800 border-red-200",
    success: "bg-green-100 text-green-800 border-green-200",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

const Button = ({
  children,
  variant = "default",
  size = "default",
  className = "",
  onClick,
  disabled = false,
  ...props
}) => {
  const variants = {
    default:
      "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl",
    outline:
      "border-2 border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50 text-gray-700",
    ghost: "hover:bg-gray-100 text-gray-700",
    destructive: "bg-red-600 hover:bg-red-700 text-white",
    success: "bg-green-600 hover:bg-green-700 text-white",
  };

  const sizes = {
    default: "px-4 py-2 text-sm",
    sm: "px-3 py-1.5 text-xs",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      className={`inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden ${className}`}
  >
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`p-6 pb-4 ${className}`}>{children}</div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`px-6 pb-4 ${className}`}>{children}</div>
);

const CardFooter = ({ children, className = "" }) => (
  <div className={`px-6 py-4 bg-gray-50 border-t border-gray-100 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>
    {children}
  </h3>
);

const CardDescription = ({ children, className = "" }) => (
  <p className={`text-sm text-gray-600 ${className}`}>{children}</p>
);

const Dialog = ({ children }) => children;
const DialogTrigger = ({ children }) => children;
const DialogContent = ({ children, className = "" }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
    <div
      className={`relative bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto ${className}`}
    >
      {children}
    </div>
  </div>
);
const DialogHeader = ({ children, className = "" }) => (
  <div className={`p-6 pb-4 border-b border-gray-100 ${className}`}>
    {children}
  </div>
);
const DialogTitle = ({ children, className = "" }) => (
  <h2 className={`text-xl font-semibold text-gray-900 ${className}`}>
    {children}
  </h2>
);
const DialogFooter = ({ children, className = "" }) => (
  <div
    className={`p-6 pt-4 border-t border-gray-100 flex justify-end space-x-2 ${className}`}
  >
    {children}
  </div>
);

const Input = ({ className = "", ...props }) => (
  <input
    className={`w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${className}`}
    {...props}
  />
);

const Label = ({ children, className = "" }) => (
  <label
    className={`block text-sm font-medium text-gray-700 mb-1 ${className}`}
  >
    {children}
  </label>
);

const Select = ({ children, value, onValueChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <SelectTrigger onClick={() => setIsOpen(!isOpen)}>
        <SelectValue placeholder="Select option" value={value} />
      </SelectTrigger>
      {isOpen && (
        <SelectContent
          onClose={() => setIsOpen(false)}
          onValueChange={onValueChange}
        >
          {children}
        </SelectContent>
      )}
    </div>
  );
};

const SelectTrigger = ({ children, onClick, className = "" }) => (
  <button
    className={`w-full px-3 py-2 text-left border border-gray-200 rounded-lg hover:border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);

const SelectValue = ({ placeholder, value }) => (
  <span className={value ? "text-gray-900" : "text-gray-400"}>
    {value || placeholder}
  </span>
);

const SelectContent = ({ children, onClose, onValueChange }) => (
  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
    <div
      onClick={(e) => {
        const value = e.target.getAttribute("data-value");
        if (value) {
          onValueChange(value);
          onClose();
        }
      }}
    >
      {children}
    </div>
  </div>
);

const SelectItem = ({ children, value }) => (
  <div
    data-value={value}
    className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-900"
  >
    {children}
  </div>
);

const Textarea = ({ className = "", rows = 3, ...props }) => (
  <textarea
    rows={rows}
    className={`w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none ${className}`}
    {...props}
  />
);

const Calendar = ({ mode, selected, onSelect, className = "" }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const today = new Date();

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="p-2"></div>);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    const isSelected =
      selected && date.toDateString() === selected.toDateString();
    const isToday = date.toDateString() === today.toDateString();

    days.push(
      <button
        key={day}
        onClick={() => onSelect(date)}
        className={`p-2 text-sm rounded-lg hover:bg-blue-100 transition-colors ${
          isSelected
            ? "bg-blue-600 text-white"
            : isToday
            ? "bg-blue-100 text-blue-600"
            : "text-gray-700"
        }`}
      >
        {day}
      </button>
    );
  }

  return (
    <div
      className={`p-4 border border-gray-200 rounded-lg bg-white ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() =>
            setCurrentDate(
              new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
            )
          }
          className="p-1 hover:bg-gray-100 rounded"
        >
          ←
        </button>
        <h3 className="font-semibold">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <button
          onClick={() =>
            setCurrentDate(
              new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
            )
          }
          className="p-1 hover:bg-gray-100 rounded"
        >
          →
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <div
            key={day}
            className="p-2 text-xs font-medium text-gray-500 text-center"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">{days}</div>
    </div>
  );
};

const DropdownMenu = ({ children }) => children;
const DropdownMenuTrigger = ({ children }) => children;
const DropdownMenuContent = ({ children, className = "" }) => (
  <div
    className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10 ${className}`}
  >
    {children}
  </div>
);
const DropdownMenuItem = ({ children, onClick, className = "" }) => (
  <button
    className={`w-full text-left px-3 py-2 hover:bg-gray-100 text-sm text-gray-700 first:rounded-t-lg last:rounded-b-lg ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);

// Toast hook simulation
const useToast = () => ({
  toast: ({ title, description, variant = "default" }) => {
    console.log(`Toast: ${title} - ${description} (${variant})`);
    // In a real app, this would show an actual toast notification
  },
});

const cn = (...classes) => classes.filter(Boolean).join(" ");

function Interviews({ searchQuery = "" }) {
  const { toast } = useToast();
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  const [isRescheduleDialogOpen, setIsRescheduleDialogOpen] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const [newInterview, setNewInterview] = useState({
    candidate: "",
    interviewer: "",
    date: new Date(),
    time: "10:00",
    meetingLink: "",
    notes: "",
  });

  const [interviews, setInterviews] = useState([
    {
      id: "1",
      candidateName: "John Smith",
      position: "Full Stack Development Intern",
      interviewer: "Dr. John Doe",
      date: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
      time: "10:00 AM",
      meetingLink: "https://zoom.us/j/1234567890",
      status: "upcoming",
      priority: "high",
      avatarUrl:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      notes:
        "Focus on React and Node.js experience. Previous internship at Microsoft.",
      candidateEmail: "john.smith@example.com",
      candidatePhone: "+1 (555) 123-4567",
      duration: "60 minutes",
      interviewType: "Technical",
      feedback: "",
      rating: 0,
      createdAt: new Date("2023-07-15"),
    },
    {
      id: "2",
      candidateName: "Emma Johnson",
      position: "Data Science Research Assistant",
      interviewer: "Dr. Jane Smith",
      date: new Date(), // Today
      time: "2:00 PM",
      meetingLink: "https://zoom.us/j/0987654321",
      status: "upcoming",
      priority: "medium",
      avatarUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      notes:
        "Discuss her published papers in detail. PhD candidate with strong research background.",
      candidateEmail: "emma.johnson@example.com",
      candidatePhone: "+1 (555) 987-6543",
      duration: "45 minutes",
      interviewType: "Research",
      feedback: "",
      rating: 0,
      createdAt: new Date("2023-07-10"),
    },
    {
      id: "3",
      candidateName: "Michael Chen",
      position: "UI/UX Design Intern",
      interviewer: "Dr. Sarah Wilson",
      date: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
      time: "11:00 AM",
      meetingLink: "https://zoom.us/j/1122334455",
      status: "completed",
      priority: "low",
      avatarUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      notes: "Portfolio review and design thinking assessment.",
      candidateEmail: "michael.chen@example.com",
      candidatePhone: "+1 (555) 456-7890",
      duration: "90 minutes",
      interviewType: "Design",
      feedback:
        "Excellent portfolio, strong design principles, good cultural fit.",
      rating: 5,
      createdAt: new Date("2023-07-08"),
    },
  ]);

  const [applications] = useState([
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
    {
      id: "3",
      candidateName: "Alex Rodriguez",
      email: "alex.rodriguez@example.com",
      position: "Mobile App Development Intern",
      education: "Bachelor's in Software Engineering",
      status: "pending",
      description:
        "Passionate mobile developer with experience in React Native and Flutter. Built 3 published apps with 10k+ downloads.",
      avatarUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      appliedAt: new Date("2023-07-12"),
      cvUrl: "#",
    },
  ]);

  const [supervisors] = useState([
    {
      id: "1",
      name: "Dr. John Doe",
      email: "john.doe@university.edu",
      department: "Computer Science",
      specialization: "Machine Learning & AI",
      currentInterns: 3,
      maxInterns: 5,
      subjects: 2,
      avatarUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      joinedAt: new Date("2018-09-15"),
    },
    {
      id: "2",
      name: "Dr. Jane Smith",
      email: "jane.smith@university.edu",
      department: "Computer Science",
      specialization: "Blockchain & Distributed Systems",
      currentInterns: 2,
      maxInterns: 4,
      subjects: 1,
      avatarUrl:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      joinedAt: new Date("2020-03-10"),
    },
    {
      id: "3",
      name: "Dr. Sarah Wilson",
      email: "sarah.wilson@university.edu",
      department: "Design",
      specialization: "Human-Computer Interaction",
      currentInterns: 1,
      maxInterns: 3,
      subjects: 2,
      avatarUrl:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      joinedAt: new Date("2019-01-20"),
    },
  ]);

  const filteredInterviews = useMemo(() => {
    return interviews.filter((interview) => {
      const matchesSearch =
        interview.candidateName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        interview.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        interview.interviewer.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || interview.status === statusFilter;

      const today = new Date();
      const interviewDate = new Date(interview.date);
      const matchesDate =
        dateFilter === "all" ||
        (dateFilter === "today" &&
          interviewDate.toDateString() === today.toDateString()) ||
        (dateFilter === "upcoming" && interviewDate > today) ||
        (dateFilter === "past" && interviewDate < today);

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [interviews, searchQuery, statusFilter, dateFilter]);

  const handleScheduleInterview = () => {
    if (
      !newInterview.candidate ||
      !newInterview.interviewer ||
      !newInterview.time
    ) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    const candidate = applications.find(
      (app) => app.candidateName === newInterview.candidate
    );
    const newInterviewData = {
      id: Date.now().toString(),
      candidateName: newInterview.candidate,
      position: candidate?.position || "Position",
      interviewer: newInterview.interviewer,
      date: newInterview.date,
      time: newInterview.time,
      meetingLink: newInterview.meetingLink,
      status: "upcoming",
      priority: "medium",
      avatarUrl:
        candidate?.avatarUrl ||
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      notes: newInterview.notes,
      candidateEmail: candidate?.email || "",
      candidatePhone: "+1 (555) 000-0000",
      duration: "60 minutes",
      interviewType: "General",
      feedback: "",
      rating: 0,
      createdAt: new Date(),
    };

    setInterviews([newInterviewData, ...interviews]);
    setNewInterview({
      candidate: "",
      interviewer: "",
      date: new Date(),
      time: "10:00",
      meetingLink: "",
      notes: "",
    });
    setIsScheduleDialogOpen(false);
    toast({
      title: "Success",
      description: "Interview scheduled successfully",
    });
  };

  const handleRescheduleInterview = () => {
    if (!selectedInterview) return;

    setInterviews(
      interviews.map((interview) =>
        interview.id === selectedInterview.id
          ? {
              ...interview,
              date: newInterview.date,
              time: newInterview.time,
              notes: newInterview.notes,
            }
          : interview
      )
    );

    setIsRescheduleDialogOpen(false);
    setSelectedInterview(null);
    toast({
      title: "Success",
      description: "Interview rescheduled successfully",
    });
  };

  const handleCancelInterview = (id) => {
    setInterviews(
      interviews.map((interview) =>
        interview.id === id ? { ...interview, status: "cancelled" } : interview
      )
    );
    toast({
      title: "Success",
      description: "Interview cancelled",
    });
  };

  const handleCompleteInterview = (id) => {
    setInterviews(
      interviews.map((interview) =>
        interview.id === id ? { ...interview, status: "completed" } : interview
      )
    );
    toast({
      title: "Success",
      description: "Interview marked as completed",
    });
  };

  const handleDeleteInterview = (id) => {
    setInterviews(interviews.filter((interview) => interview.id !== id));
    toast({
      title: "Success",
      description: "Interview deleted successfully",
    });
  };

  const handleStartMeeting = (meetingLink) => {
    if (meetingLink) {
      window.open(meetingLink, "_blank");
    } else {
      toast({
        title: "Error",
        description: "No meeting link available",
        variant: "destructive",
      });
    }
  };

  const handleCopyMeetingLink = (meetingLink) => {
    navigator.clipboard.writeText(meetingLink);
    toast({
      title: "Success",
      description: "Meeting link copied to clipboard",
    });
  };

  const handleSendReminder = (interview) => {
    toast({
      title: "Success",
      description: `Reminder sent to ${interview.candidateName}`,
    });
  };

  const handleExportData = () => {
    const csvContent = [
      [
        "Candidate Name",
        "Position",
        "Interviewer",
        "Date",
        "Time",
        "Status",
        "Priority",
        "Duration",
        "Type",
      ],
      ...filteredInterviews.map((interview) => [
        interview.candidateName,
        interview.position,
        interview.interviewer,
        interview.date.toLocaleDateString(),
        interview.time,
        interview.status,
        interview.priority,
        interview.duration,
        interview.interviewType,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "interviews.csv";
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Success",
      description: "Interview data exported successfully",
    });
  };

  const handleRateCandidate = (id, rating) => {
    setInterviews(
      interviews.map((interview) =>
        interview.id === id ? { ...interview, rating } : interview
      )
    );
  };

  const openRescheduleDialog = (interview) => {
    setSelectedInterview(interview);
    setNewInterview({
      candidate: interview.candidateName,
      interviewer: interview.interviewer,
      date: new Date(interview.date),
      time: interview.time,
      meetingLink: interview.meetingLink,
      notes: interview.notes,
    });
    setIsRescheduleDialogOpen(true);
  };

  const formatDate = (date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === tomorrow.toDateString()) return "Tomorrow";
    if (date.toDateString() === yesterday.toDateString()) return "Yesterday";

    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-50 border-red-200";
      case "medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "low":
        return "text-green-600 bg-green-50 border-green-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getStats = () => {
    const total = interviews.length;
    const upcoming = interviews.filter((i) => i.status === "upcoming").length;
    const completed = interviews.filter((i) => i.status === "completed").length;
    const cancelled = interviews.filter((i) => i.status === "cancelled").length;

    return { total, upcoming, completed, cancelled };
  };

  const stats = getStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Interview Management
            </h1>
            <p className="text-gray-600">
              Schedule, track, and manage all candidate interviews
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={handleExportData}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button onClick={() => setIsScheduleDialogOpen(true)}>
              <Video className="w-4 h-4 mr-2" />
              Schedule Interview
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">
                    Total Interviews
                  </p>
                  <p className="text-3xl font-bold">{stats.total}</p>
                </div>
                <Users className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Upcoming</p>
                  <p className="text-3xl font-bold">{stats.upcoming}</p>
                </div>
                <Clock className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">
                    Completed
                  </p>
                  <p className="text-3xl font-bold">{stats.completed}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100 text-sm font-medium">Cancelled</p>
                  <p className="text-3xl font-bold">{stats.cancelled}</p>
                </div>
                <XCircle className="w-8 h-8 text-red-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search candidates, positions, or interviewers..."
                    className="pl-10"
                    value={searchQuery}
                    readOnly
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="w-40">
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Dates</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="past">Past</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Interview Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredInterviews.map((interview) => (
            <Card
              key={interview.id}
              className={cn(
                "hover:shadow-2xl transition-all duration-300 transform hover:scale-105",
                interview.status === "completed" && "ring-2 ring-green-200",
                interview.status === "cancelled" && "ring-2 ring-red-200",
                interview.status === "upcoming" && "ring-2 ring-blue-200"
              )}
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-12 h-12">
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
                        {interview.candidateName}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {interview.position}
                      </CardDescription>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={
                        interview.status === "upcoming"
                          ? "default"
                          : interview.status === "completed"
                          ? "success"
                          : "destructive"
                      }
                    >
                      {interview.status}
                    </Badge>

                    <div className="relative">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setDropdownOpen(
                            dropdownOpen === interview.id ? null : interview.id
                          )
                        }
                      >
                        <MoreVertical className="w-4 h-4" />
                      </Button>

                      {dropdownOpen === interview.id && (
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            onClick={() => handleSendReminder(interview)}
                          >
                            <Mail className="w-4 h-4 mr-2" />
                            Send Reminder
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleCopyMeetingLink(interview.meetingLink)
                            }
                          >
                            <Copy className="w-4 h-4 mr-2" />
                            Copy Meeting Link
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => openRescheduleDialog(interview)}
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Reschedule
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteInterview(interview.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 mt-3">
                  <Badge
                    className={`text-xs ${getPriorityColor(
                      interview.priority
                    )}`}
                  >
                    {interview.priority} priority
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {interview.interviewType}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <CalendarIcon className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">
                      {formatDate(new Date(interview.date))} at {interview.time}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <UserPlus className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">
                      Interviewer: {interview.interviewer}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">
                      Duration: {interview.duration}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{interview.candidateEmail}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{interview.candidatePhone}</span>
                  </div>

                  {interview.notes && (
                    <div className="pt-2">
                      <Label className="text-xs text-gray-500">Notes</Label>
                      <p className="text-sm text-gray-600 mt-1 bg-gray-50 p-2 rounded-lg">
                        {interview.notes}
                      </p>
                    </div>
                  )}

                  {interview.status === "completed" && (
                    <div className="pt-2">
                      <Label className="text-xs text-gray-500">Rating</Label>
                      <div className="flex items-center space-x-1 mt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() =>
                              handleRateCandidate(interview.id, star)
                            }
                            className="hover:scale-110 transition-transform"
                          >
                            {star <= interview.rating ? (
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            ) : (
                              <StarOff className="w-4 h-4 text-gray-300" />
                            )}
                          </button>
                        ))}
                        <span className="text-sm text-gray-600 ml-2">
                          {interview.rating}/5
                        </span>
                      </div>

                      {interview.feedback && (
                        <div className="mt-2">
                          <Label className="text-xs text-gray-500">
                            Feedback
                          </Label>
                          <p className="text-sm text-gray-600 mt-1 bg-green-50 p-2 rounded-lg">
                            {interview.feedback}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>

              <CardFooter className="flex justify-between">
                <div className="flex space-x-2">
                  {interview.status === "upcoming" && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCancelInterview(interview.id)}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openRescheduleDialog(interview)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Reschedule
                      </Button>
                    </>
                  )}
                </div>

                <div className="flex space-x-2">
                  {interview.status === "upcoming" && (
                    <>
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() =>
                          handleStartMeeting(interview.meetingLink)
                        }
                      >
                        <Video className="h-4 w-4 mr-1" />
                        Join
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCompleteInterview(interview.id)}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Complete
                      </Button>
                    </>
                  )}

                  {interview.status === "completed" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        window.open(
                          `mailto:${interview.candidateEmail}`,
                          "_blank"
                        )
                      }
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Contact
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredInterviews.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No interviews found
              </h3>
              <p className="text-gray-600 mb-4">
                No interviews match your current filters. Try adjusting your
                search criteria.
              </p>
              <Button onClick={() => setIsScheduleDialogOpen(true)}>
                <Video className="w-4 h-4 mr-2" />
                Schedule First Interview
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Schedule Interview Dialog */}
        {isScheduleDialogOpen && (
          <Dialog>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Schedule New Interview</DialogTitle>
              </DialogHeader>
              <div className="space-y-6 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Candidate*</Label>
                    <Select
                      value={newInterview.candidate}
                      onValueChange={(value) =>
                        setNewInterview({
                          ...newInterview,
                          candidate: value,
                        })
                      }
                    >
                      <SelectTrigger>
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
                              {candidate.candidateName} - {candidate.position}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Interviewer*</Label>
                    <Select
                      value={newInterview.interviewer}
                      onValueChange={(value) =>
                        setNewInterview({
                          ...newInterview,
                          interviewer: value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select interviewer" />
                      </SelectTrigger>
                      <SelectContent>
                        {supervisors.map((supervisor) => (
                          <SelectItem
                            key={supervisor.id}
                            value={supervisor.name}
                          >
                            {supervisor.name} - {supervisor.specialization}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Date*</Label>
                  <Calendar
                    mode="single"
                    selected={newInterview.date}
                    onSelect={(date) =>
                      date && setNewInterview({ ...newInterview, date })
                    }
                    className="rounded-md border"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Time*</Label>
                    <Select
                      value={newInterview.time}
                      onValueChange={(value) =>
                        setNewInterview({ ...newInterview, time: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                        <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                        <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                        <SelectItem value="1:00 PM">1:00 PM</SelectItem>
                        <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                        <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                        <SelectItem value="4:00 PM">4:00 PM</SelectItem>
                        <SelectItem value="5:00 PM">5:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Meeting Link*</Label>
                    <Input
                      placeholder="Enter Zoom/Meet link"
                      value={newInterview.meetingLink}
                      onChange={(e) =>
                        setNewInterview({
                          ...newInterview,
                          meetingLink: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Notes</Label>
                  <Textarea
                    placeholder="Any special notes for the interview (topics to cover, preparation required, etc.)"
                    value={newInterview.notes}
                    onChange={(e) =>
                      setNewInterview({
                        ...newInterview,
                        notes: e.target.value,
                      })
                    }
                    rows={4}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsScheduleDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleScheduleInterview}>
                  <Video className="w-4 h-4 mr-2" />
                  Schedule Interview
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {/* Reschedule Interview Dialog */}
        {isRescheduleDialogOpen && selectedInterview && (
          <Dialog>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  Reschedule Interview - {selectedInterview.candidateName}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6 py-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">
                    Current Interview Details
                  </h4>
                  <div className="text-sm text-blue-800 space-y-1">
                    <p>Date: {formatDate(new Date(selectedInterview.date))}</p>
                    <p>Time: {selectedInterview.time}</p>
                    <p>Interviewer: {selectedInterview.interviewer}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>New Date*</Label>
                  <Calendar
                    mode="single"
                    selected={newInterview.date}
                    onSelect={(date) =>
                      date && setNewInterview({ ...newInterview, date })
                    }
                    className="rounded-md border"
                  />
                </div>

                <div className="space-y-2">
                  <Label>New Time*</Label>
                  <Select
                    value={newInterview.time}
                    onValueChange={(value) =>
                      setNewInterview({ ...newInterview, time: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                      <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                      <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                      <SelectItem value="1:00 PM">1:00 PM</SelectItem>
                      <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                      <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                      <SelectItem value="4:00 PM">4:00 PM</SelectItem>
                      <SelectItem value="5:00 PM">5:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Updated Notes</Label>
                  <Textarea
                    placeholder="Any updates or additional notes for the rescheduled interview"
                    value={newInterview.notes}
                    onChange={(e) =>
                      setNewInterview({
                        ...newInterview,
                        notes: e.target.value,
                      })
                    }
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsRescheduleDialogOpen(false);
                    setSelectedInterview(null);
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleRescheduleInterview}>
                  <Edit className="w-4 h-4 mr-2" />
                  Reschedule Interview
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}

export default Interviews;
