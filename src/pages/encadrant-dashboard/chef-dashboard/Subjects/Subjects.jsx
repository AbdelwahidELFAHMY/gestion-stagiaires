import {
  Download,
  Edit,
  Filter,
  MoreVertical,
  Plus,
  Trash,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "../components/badge";
import { Button } from "../components/button";
import { Card, CardContent, CardHeader } from "../components/card";
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

function Subjects({ searchQuery }) {
  const { toast } = useToast();
  const [subjects, setSubjects] = useState([
    {
      id: "1",
      title: "Machine Learning for IoT Devices",
      description:
        "Implementation of ML algorithms on resource-constrained IoT devices",
      supervisor: "Dr. John Doe",
      status: "available",
      createdAt: new Date("2023-05-15"),
    },
    {
      id: "2",
      title: "Blockchain Applications in Supply Chain",
      description:
        "Research and development of blockchain solutions for supply chain transparency",
      supervisor: "Dr. Jane Smith",
      status: "assigned",
      createdAt: new Date("2023-06-20"),
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
  ]);

  const [newSubject, setNewSubject] = useState({
    title: "",
    description: "",
    supervisor: "",
  });
  const [editingSubject, setEditingSubject] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const itemsPerPage = 5;

  const filteredSubjects = useMemo(() => {
    return subjects.filter((subject) => {
      const matchesSearch = subject.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesStatus =
        filterStatus === "all" || subject.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [subjects, searchQuery, filterStatus]);

  const paginatedSubjects = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredSubjects.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredSubjects, currentPage]);

  const totalPages = Math.ceil(filteredSubjects.length / itemsPerPage);

  const validateSubject = (subject) => {
    if (!subject.title || subject.title.length < 3) {
      return "Subject title must be at least 3 characters long";
    }
    if (!subject.supervisor) {
      return "Please select a supervisor";
    }
    return null;
  };

  const handleAddSubject = () => {
    const validationError = validateSubject(newSubject);
    if (validationError) {
      toast({
        title: "Error",
        description: validationError,
        variant: "destructive",
      });
      return;
    }

    const newSubjectData = {
      id: Date.now().toString(),
      title: newSubject.title,
      description: newSubject.description,
      supervisor: newSubject.supervisor,
      status: "available",
      createdAt: new Date(),
    };
    setSubjects([newSubjectData, ...subjects]);
    setNewSubject({ title: "", description: "", supervisor: "" });
    setIsDialogOpen(false);
    toast({
      title: "Success",
      description: "Subject added successfully",
    });
  };

  const handleEditSubject = () => {
    const validationError = validateSubject(newSubject);
    if (validationError) {
      toast({
        title: "Error",
        description: validationError,
        variant: "destructive",
      });
      return;
    }

    setSubjects(
      subjects.map((subject) =>
        subject.id === editingSubject.id
          ? {
              ...subject,
              title: newSubject.title,
              description: newSubject.description,
              supervisor: newSubject.supervisor,
            }
          : subject
      )
    );
    setEditingSubject(null);
    setNewSubject({ title: "", description: "", supervisor: "" });
    setIsDialogOpen(false);
    toast({
      title: "Success",
      description: "Subject updated successfully",
    });
  };

  const handleDeleteSubject = (id) => {
    setSubjects(subjects.filter((subject) => subject.id !== id));
    toast({
      title: "Success",
      description: "Subject deleted successfully",
    });
  };

  const handleUpdateSubjectStatus = (id, status) => {
    setSubjects(
      subjects.map((subject) =>
        subject.id === id ? { ...subject, status } : subject
      )
    );
    toast({
      title: "Success",
      description: `Subject marked as ${status}`,
    });
  };

  const startEditing = (subject) => {
    setEditingSubject(subject);
    setNewSubject({
      title: subject.title,
      description: subject.description,
      supervisor: subject.supervisor,
    });
    setIsDialogOpen(true);
  };

  const handleCancel = () => {
    setEditingSubject(null);
    setNewSubject({ title: "", description: "", supervisor: "" });
    setIsDialogOpen(false);
  };

  return (
    <div className="grid gap-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-xl font-semibold">Internship Subjects</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
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
                  <Label>Subject Title*</Label>
                  <Input
                    placeholder="Enter subject title"
                    value={newSubject.title}
                    onChange={(e) =>
                      setNewSubject({
                        ...newSubject,
                        title: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    placeholder="Enter subject description"
                    value={newSubject.description}
                    onChange={(e) =>
                      setNewSubject({
                        ...newSubject,
                        description: e.target.value,
                      })
                    }
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Supervisor*</Label>
                  <Select
                    value={newSubject.supervisor}
                    onValueChange={(value) =>
                      setNewSubject({
                        ...newSubject,
                        supervisor: value,
                      })
                    }
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
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button
                  onClick={
                    editingSubject ? handleEditSubject : handleAddSubject
                  }
                >
                  {editingSubject ? "Update Subject" : "Create Subject"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span className="text-sm text-gray-500">Filter by:</span>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="assigned">Assigned</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="text-sm text-gray-500">
              {filteredSubjects.length} subjects found
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Supervisor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedSubjects.map((subject) => (
                <TableRow key={subject.id}>
                  <TableCell className="font-medium">{subject.title}</TableCell>
                  <TableCell>{subject.supervisor}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        subject.status === "available"
                          ? "default"
                          : subject.status === "assigned"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {subject.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {subject.createdAt.toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => startEditing(subject)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteSubject(subject.id)}
                          className="text-red-600"
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() =>
                            handleUpdateSubjectStatus(subject.id, "available")
                          }
                        >
                          Available
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handleUpdateSubjectStatus(subject.id, "assigned")
                          }
                        >
                          Assigned
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handleUpdateSubjectStatus(subject.id, "completed")
                          }
                        >
                          Completed
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
    </div>
  );
}

export default Subjects;
