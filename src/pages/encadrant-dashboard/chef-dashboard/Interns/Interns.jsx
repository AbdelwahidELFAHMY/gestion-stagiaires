import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import { Download, Edit, FileText, MoreVertical, UserPlus } from "lucide-react";
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
  DialogTrigger,
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
import { Progress } from "../components/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/table";
import { useToast } from "../components/use-toast";

function Interns({ searchQuery }) {
  const { toast } = useToast();
  const [interns, setInterns] = useState([
    {
      id: "1",
      name: "Sarah Johnson",
      position: "Machine Learning Intern",
      supervisor: "Dr. John Doe",
      duration: "6 months",
      startDate: new Date("2023-06-01"),
      endDate: new Date("2023-12-01"),
      status: "active",
      progress: 65,
      avatarUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      id: "2",
      name: "Michael Chen",
      position: "Software Engineering Intern",
      supervisor: "Dr. Jane Smith",
      duration: "3 months",
      startDate: new Date("2023-07-15"),
      endDate: new Date("2023-10-15"),
      status: "active",
      progress: 30,
      avatarUrl:
        "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  ]);

  const [supervisors] = useState([
    { id: "1", name: "Dr. John Doe" },
    { id: "2", name: "Dr. Jane Smith" },
    { id: "3", name: "Dr. Alice Brown" },
  ]);

  const [newIntern, setNewIntern] = useState({
    name: "",
    position: "",
    supervisor: "",
    duration: "3 months",
    startDate: "",
    endDate: "",
    progress: 0,
  });
  const [editingIntern, setEditingIntern] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPosition, setFilterPosition] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [viewReportsIntern, setViewReportsIntern] = useState(null);
  const [reassignIntern, setReassignIntern] = useState(null);
  const [newSupervisor, setNewSupervisor] = useState("");
  const [confirmTerminate, setConfirmTerminate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 5;

  // Mock reports data
  const mockReports = [
    {
      id: "1",
      title: "Week 1 Progress",
      content: "Completed initial setup and training",
      submittedAt: new Date("2023-06-07"),
    },
    {
      id: "2",
      title: "Week 2 Progress",
      content: "Started working on ML model",
      submittedAt: new Date("2023-06-14"),
    },
  ];

  const filteredInterns = useMemo(() => {
    return interns.filter((intern) => {
      const matchesSearch = intern.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesStatus =
        filterStatus === "all" || intern.status === filterStatus;
      const matchesPosition =
        filterPosition === "all" || intern.position === filterPosition;
      return matchesSearch && matchesStatus && matchesPosition;
    });
  }, [interns, searchQuery, filterStatus, filterPosition]);

  const paginatedInterns = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredInterns.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredInterns, currentPage]);

  const totalPages = Math.ceil(filteredInterns.length / itemsPerPage);
  const uniquePositions = [
    ...new Set(interns.map((intern) => intern.position)),
  ];

  const validateIntern = (intern) => {
    if (!intern.name || intern.name.length < 3) {
      return "Name must be at least 3 characters long";
    }
    if (!intern.position) {
      return "Please enter a position";
    }
    if (!intern.supervisor) {
      return "Please select a supervisor";
    }
    if (!intern.startDate || !intern.endDate) {
      return "Please select start and end dates";
    }
    const start = new Date(intern.startDate);
    const end = new Date(intern.endDate);
    if (start >= end) {
      return "End date must be after start date";
    }
    if (intern.progress < 0 || intern.progress > 100) {
      return "Progress must be between 0 and 100";
    }
    return null;
  };

  const handleAddIntern = () => {
    const validationError = validateIntern(newIntern);
    if (validationError) {
      toast({
        title: "Error",
        description: validationError,
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const newInternData = {
        id: Date.now().toString(),
        name: newIntern.name,
        position: newIntern.position,
        supervisor: newIntern.supervisor,
        duration: newIntern.duration,
        startDate: new Date(newIntern.startDate),
        endDate: new Date(newIntern.endDate),
        status: "active",
        progress: parseInt(newIntern.progress, 10),
        avatarUrl:
          "https://images.unsplash.com/photo-1517365830460-955ce3f6b1f7?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      };
      setInterns([newInternData, ...interns]);
      setNewIntern({
        name: "",
        position: "",
        supervisor: "",
        duration: "3 months",
        startDate: "",
        endDate: "",
        progress: 0,
      });
      setIsDialogOpen(false);
      setIsLoading(false);
      toast({
        title: "Success",
        description: "Intern added successfully",
      });
    }, 500); // Simulate API delay
  };

  const handleEditIntern = () => {
    const validationError = validateIntern(newIntern);
    if (validationError) {
      toast({
        title: "Error",
        description: validationError,
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setInterns(
        interns.map((intern) =>
          intern.id === editingIntern.id
            ? {
                ...intern,
                name: newIntern.name,
                position: newIntern.position,
                supervisor: newIntern.supervisor,
                duration: newIntern.duration,
                startDate: new Date(newIntern.startDate),
                endDate: new Date(newIntern.endDate),
                progress: parseInt(newIntern.progress, 10),
              }
            : intern
        )
      );
      setEditingIntern(null);
      setNewIntern({
        name: "",
        position: "",
        supervisor: "",
        duration: "3 months",
        startDate: "",
        endDate: "",
        progress: 0,
      });
      setIsDialogOpen(false);
      setIsLoading(false);
      toast({
        title: "Success",
        description: "Intern updated successfully",
      });
    }, 500); // Simulate API delay
  };

  const handleReassignIntern = () => {
    if (!newSupervisor) {
      toast({
        title: "Error",
        description: "Please select a supervisor",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setInterns(
        interns.map((intern) =>
          intern.id === reassignIntern.id
            ? { ...intern, supervisor: newSupervisor }
            : intern
        )
      );
      setReassignIntern(null);
      setNewSupervisor("");
      setIsLoading(false);
      toast({
        title: "Success",
        description: "Intern reassigned successfully",
      });
    }, 500); // Simulate API delay
  };

  const handleUpdateInternStatus = (id, status) => {
    setIsLoading(true);
    setTimeout(() => {
      setInterns(
        interns.map((intern) =>
          intern.id === id ? { ...intern, status } : intern
        )
      );
      setConfirmTerminate(null);
      setIsLoading(false);
      toast({
        title: "Success",
        description: `Intern marked as ${status}`,
      });
    }, 500); // Simulate API delay
  };

  const startEditing = (intern) => {
    setEditingIntern(intern);
    setNewIntern({
      name: intern.name,
      position: intern.position,
      supervisor: intern.supervisor,
      duration: intern.duration,
      startDate: intern.startDate.toISOString().split("T")[0],
      endDate: intern.endDate.toISOString().split("T")[0],
      progress: intern.progress,
    });
    setIsDialogOpen(true);
  };

  const handleCancel = () => {
    setEditingIntern(null);
    setNewIntern({
      name: "",
      position: "",
      supervisor: "",
      duration: "3 months",
      startDate: "",
      endDate: "",
      progress: 0,
    });
    setIsDialogOpen(false);
  };

  const handleViewReports = (intern) => {
    setViewReportsIntern(intern);
  };

  return (
    <div className="grid gap-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-xl font-semibold">Current Interns</h2>
        <div className="flex items-center space-x-2">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Interns</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="terminated">Terminated</SelectItem>
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
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="w-4 h-4 mr-2" />
                Add Intern
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>
                  {editingIntern ? "Edit Intern" : "Add New Intern"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Name*</Label>
                  <Input
                    placeholder="Enter intern name"
                    value={newIntern.name}
                    onChange={(e) =>
                      setNewIntern({ ...newIntern, name: e.target.value })
                    }
                    aria-required="true"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Position*</Label>
                  <Input
                    placeholder="Enter position"
                    value={newIntern.position}
                    onChange={(e) =>
                      setNewIntern({ ...newIntern, position: e.target.value })
                    }
                    aria-required="true"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Supervisor*</Label>
                  <Select
                    value={newIntern.supervisor}
                    onValueChange={(value) =>
                      setNewIntern({ ...newIntern, supervisor: value })
                    }
                    aria-required="true"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select supervisor" />
                    </SelectTrigger>
                    <SelectContent>
                      {supervisors.map((supervisor) => (
                        <SelectItem key={supervisor.id} value={supervisor.name}>
                          {supervisor.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Duration*</Label>
                  <Select
                    value={newIntern.duration}
                    onValueChange={(value) =>
                      setNewIntern({ ...newIntern, duration: value })
                    }
                    aria-required="true"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2 months">2 Months</SelectItem>
                      <SelectItem value="3 months">3 Months</SelectItem>
                      <SelectItem value="6 months">6 Months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Date*</Label>
                    <Input
                      type="date"
                      value={newIntern.startDate}
                      onChange={(e) =>
                        setNewIntern({
                          ...newIntern,
                          startDate: e.target.value,
                        })
                      }
                      aria-required="true"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>End Date*</Label>
                    <Input
                      type="date"
                      value={newIntern.endDate}
                      onChange={(e) =>
                        setNewIntern({ ...newIntern, endDate: e.target.value })
                      }
                      aria-required="true"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Progress (%)*</Label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={newIntern.progress}
                    onChange={(e) =>
                      setNewIntern({ ...newIntern, progress: e.target.value })
                    }
                    aria-required="true"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  onClick={editingIntern ? handleEditIntern : handleAddIntern}
                  disabled={isLoading}
                >
                  {isLoading
                    ? "Processing..."
                    : editingIntern
                    ? "Update Intern"
                    : "Add Intern"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Intern</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Supervisor</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedInterns.map((intern) => (
                <TableRow key={intern.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={intern.avatarUrl} />
                        <AvatarFallback>
                          {intern.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="font-medium">{intern.name}</div>
                    </div>
                  </TableCell>
                  <TableCell>{intern.position}</TableCell>
                  <TableCell>{intern.supervisor}</TableCell>
                  <TableCell>
                    {intern.startDate.toLocaleDateString()} -{" "}
                    {intern.endDate.toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Progress
                        value={intern.progress}
                        className="h-2 w-[100px]"
                      />
                      <span className="text-sm text-gray-500">
                        {intern.progress}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        intern.status === "active"
                          ? "default"
                          : intern.status === "completed"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {intern.status}
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
                        <DropdownMenuItem onClick={() => startEditing(intern)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleViewReports(intern)}
                        >
                          <FileText className="mr-2 h-4 w-4" />
                          View Reports
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() =>
                            handleUpdateInternStatus(intern.id, "active")
                          }
                        >
                          Active
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handleUpdateInternStatus(intern.id, "completed")
                          }
                        >
                          Completed
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setConfirmTerminate(intern)}
                          className="text-red-600"
                        >
                          Terminated
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => setReassignIntern(intern)}
                        >
                          <UserPlus className="mr-2 h-4 w-4" />
                          Reassign Supervisor
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

      {/* View Reports Dialog */}
      <Dialog
        open={!!viewReportsIntern}
        onOpenChange={() => setViewReportsIntern(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reports for {viewReportsIntern?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {mockReports.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Content</TableHead>
                    <TableHead>Submitted</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>{report.title}</TableCell>
                      <TableCell>{report.content}</TableCell>
                      <TableCell>
                        {report.submittedAt.toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p>No reports available for this intern.</p>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setViewReportsIntern(null)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reassign Supervisor Dialog */}
      <Dialog
        open={!!reassignIntern}
        onOpenChange={() => {
          setReassignIntern(null);
          setNewSupervisor("");
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Reassign Supervisor for {reassignIntern?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>New Supervisor*</Label>
              <Select
                value={newSupervisor}
                onValueChange={setNewSupervisor}
                aria-required="true"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select new supervisor" />
                </SelectTrigger>
                <SelectContent>
                  {supervisors.map((supervisor) => (
                    <SelectItem key={supervisor.id} value={supervisor.name}>
                      {supervisor.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setReassignIntern(null);
                setNewSupervisor("");
              }}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleReassignIntern}
              disabled={isLoading || !newSupervisor}
            >
              {isLoading ? "Reassigning..." : "Reassign"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirm Termination Dialog */}
      <Dialog
        open={!!confirmTerminate}
        onOpenChange={() => setConfirmTerminate(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Termination</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>
              Are you sure you want to terminate {confirmTerminate?.name}'s
              internship?
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setConfirmTerminate(null)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() =>
                handleUpdateInternStatus(confirmTerminate.id, "terminated")
              }
              disabled={isLoading}
            >
              {isLoading ? "Terminating..." : "Terminate"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Interns;
