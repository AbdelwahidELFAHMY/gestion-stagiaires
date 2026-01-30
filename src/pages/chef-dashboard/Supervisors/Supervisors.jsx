// src/components/Supervisors.jsx
import {
  Building,
  Download,
  Edit,
  FileText,
  Loader2,
  Mail,
  MoreVertical,
  Trash,
  UserPlus,
  Users,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../components/avatar";
import { Badge } from "../components/badge";
import { Button } from "../components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/card";
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
  DropdownMenuTrigger,
} from "../components/dropdown-menu";
import { Input } from "../components/input";
import { Label } from "../components/label";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/pagination";
import { Progress } from "../components/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/select";
import { Skeleton } from "../components/skeleton";
import { useToast } from "../components/use-toast";
import { SupervisorService } from "./supervisorService";

const Supervisors = ({ searchQuery }) => {
  const { toast } = useToast();
  const [supervisors, setSupervisors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMutating, setIsMutating] = useState(false);
  const [newSupervisor, setNewSupervisor] = useState({
    name: "",
    email: "",
    password: "",
    department: "1", // Using department IDs
    specialization: "",
    maxInterns: "5",
  });
  const [editingSupervisor, setEditingSupervisor] = useState(null);
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
    totalPages: 1,
    totalElements: 0,
  });

  // Fetch supervisors with pagination
  useEffect(() => {
    const fetchSupervisors = async () => {
      try {
        const params = {
          page: pagination.page,
          size: pagination.size,
          search: searchQuery,
        };
        const response = await SupervisorService.getAllSupervisors(params);
        setSupervisors(response.content);
        setPagination({
          ...pagination,
          totalPages: response.totalPages,
          totalElements: response.totalElements,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSupervisors();
  }, [pagination.page, pagination.size, searchQuery]);

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < pagination.totalPages) {
      setPagination({ ...pagination, page: newPage });
    }
  };

  const handleAddSupervisor = async () => {
    if (
      !newSupervisor.name ||
      !newSupervisor.email ||
      !newSupervisor.password
    ) {
      toast({
        title: "Error",
        description: "Name, email, and password are required",
        variant: "destructive",
      });
      return;
    }

    setIsMutating(true);
    try {
      await SupervisorService.createSupervisor({
        ...newSupervisor,
        password: newSupervisor.password || "defaultPassword123",
      });

      // Reset form
      setNewSupervisor({
        name: "",
        email: "",
        password: "",
        department: "1",
        specialization: "",
        maxInterns: "5",
      });

      // Refresh the list
      setPagination((prev) => ({ ...prev, page: 0 }));

      toast({
        title: "Success",
        description: "Supervisor added successfully",
      });
    } catch (error) {
      let errorMessage = error.message;
      if (error.response?.data) {
        errorMessage = Object.values(error.response.data).flat().join(", ");
      }
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsMutating(false);
    }
  };

  const handleUpdateSupervisor = async (updatedData) => {
    setIsMutating(true);
    try {
      await SupervisorService.updateSupervisor(updatedData);
      setEditingSupervisor(null);

      // Refresh the current page
      const params = {
        page: pagination.page,
        size: pagination.size,
      };
      const response = await SupervisorService.getAllSupervisors(params);
      setSupervisors(response.content);

      toast({
        title: "Success",
        description: "Supervisor updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsMutating(false);
    }
  };

  const handleDeleteSupervisor = async (id) => {
    setIsMutating(true);
    try {
      await SupervisorService.deleteSupervisor(id);

      if (supervisors.length === 1 && pagination.page > 0) {
        setPagination({ ...pagination, page: pagination.page - 1 });
      } else {
        const params = {
          page: pagination.page,
          size: pagination.size,
        };
        const response = await SupervisorService.getAllSupervisors(params);
        setSupervisors(response.content);
        setPagination({
          ...pagination,
          totalPages: response.totalPages,
          totalElements: response.totalElements,
        });
      }

      toast({
        title: "Success",
        description: "Supervisor removed successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsMutating(false);
    }
  };

  const handleExport = async () => {
    try {
      toast({
        title: "Export initiated",
        description: "Your data will be downloaded shortly",
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="grid gap-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-48" />
          <div className="flex space-x-2">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-36" />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <div className="flex justify-between">
                  <div className="flex items-center space-x-3">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                  <Skeleton className="h-8 w-8" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <div className="space-y-2">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-2 w-full" />
                </div>
                <Skeleton className="h-4 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-xl font-semibold">Supervisors</h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={handleExport}
            disabled={isMutating}
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button disabled={isMutating}>
                <UserPlus className="w-4 h-4 mr-2" />
                Add Supervisor
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Supervisor</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Full Name*</Label>
                  <Input
                    placeholder="Dr. John Doe"
                    value={newSupervisor.name}
                    onChange={(e) =>
                      setNewSupervisor({
                        ...newSupervisor,
                        name: e.target.value,
                      })
                    }
                    disabled={isMutating}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email*</Label>
                  <Input
                    type="email"
                    placeholder="john.doe@university.edu"
                    value={newSupervisor.email}
                    onChange={(e) =>
                      setNewSupervisor({
                        ...newSupervisor,
                        email: e.target.value,
                      })
                    }
                    disabled={isMutating}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Password*</Label>
                  <Input
                    type="password"
                    placeholder="Enter a password"
                    value={newSupervisor.password}
                    onChange={(e) =>
                      setNewSupervisor({
                        ...newSupervisor,
                        password: e.target.value,
                      })
                    }
                    disabled={isMutating}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Department*</Label>
                  <Select
                    value={newSupervisor.department}
                    onValueChange={(value) =>
                      setNewSupervisor({
                        ...newSupervisor,
                        department: value,
                      })
                    }
                    disabled={isMutating}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Computer Science</SelectItem>
                      <SelectItem value="2">Electrical Engineering</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Specialization</Label>
                  <Input
                    placeholder="Machine Learning, Cybersecurity, etc."
                    value={newSupervisor.specialization}
                    onChange={(e) =>
                      setNewSupervisor({
                        ...newSupervisor,
                        specialization: e.target.value,
                      })
                    }
                    disabled={isMutating}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Max Interns Capacity*</Label>
                  <Select
                    value={newSupervisor.maxInterns}
                    onValueChange={(value) =>
                      setNewSupervisor({
                        ...newSupervisor,
                        maxInterns: value,
                      })
                    }
                    disabled={isMutating}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select max interns" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 Interns</SelectItem>
                      <SelectItem value="5">5 Interns</SelectItem>
                      <SelectItem value="7">7 Interns</SelectItem>
                      <SelectItem value="10">10 Interns</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button
                  onClick={handleAddSupervisor}
                  disabled={
                    isMutating ||
                    !newSupervisor.name ||
                    !newSupervisor.email ||
                    !newSupervisor.password
                  }
                >
                  {isMutating ? (
                    <div className="flex items-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Adding...
                    </div>
                  ) : (
                    "Add Supervisor"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {supervisors.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <Users className="h-12 w-12 text-gray-400" />
          <h3 className="text-lg font-medium">No supervisors found</h3>
          <p className="text-sm text-gray-500">
            {searchQuery
              ? "Try a different search term"
              : "Add your first supervisor"}
          </p>
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {supervisors.map((supervisor) => (
              <Card key={supervisor.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={supervisor.avatarUrl} />
                        <AvatarFallback>
                          {supervisor.firstName?.charAt(0)}
                          {supervisor.lastName?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle>{`${supervisor.firstName} ${supervisor.lastName}`}</CardTitle>
                        <CardDescription className="mt-1">
                          {supervisor.specialization || "General"}
                        </CardDescription>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          disabled={isMutating}
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => setEditingSupervisor(supervisor)}
                          disabled={isMutating}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem disabled={isMutating}>
                          <Users className="mr-2 h-4 w-4" />
                          View Interns
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteSupervisor(supervisor.id)}
                          className="text-red-600"
                          disabled={isMutating}
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span className="truncate">{supervisor.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Building className="h-4 w-4 text-gray-500" />
                      <span>
                        {supervisor.departement?.name || "No department"}
                      </span>
                    </div>
                    <div className="pt-2">
                      <div className="flex items-center justify-between mb-1">
                        <Label>Interns Capacity</Label>
                        <span className="text-sm text-gray-500">
                          {supervisor.currentInterns || 0} /{" "}
                          {supervisor.maxStudents}
                        </span>
                      </div>
                      <Progress
                        value={
                          ((supervisor.currentInterns || 0) /
                            supervisor.maxStudents) *
                          100
                        }
                        className="h-2"
                        indicatorColor={
                          (supervisor.currentInterns || 0) /
                            supervisor.maxStudents >
                          0.9
                            ? "bg-red-500"
                            : (supervisor.currentInterns || 0) /
                                supervisor.maxStudents >
                              0.7
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-gray-500" />
                        <span>
                          {supervisor.subjects || 0} Active Subject
                          {supervisor.subjects !== 1 ? "s" : ""}
                        </span>
                      </div>
                      <Badge variant="outline">
                        Member since{" "}
                        {new Date(supervisor.hireDate).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                          }
                        )}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 0}
                />
              </PaginationItem>

              {Array.from(
                { length: Math.min(5, pagination.totalPages) },
                (_, i) => {
                  const pageNum = i;
                  return (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        isActive={pageNum === pagination.page}
                        onClick={() => handlePageChange(pageNum)}
                      >
                        {pageNum + 1}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }
              )}

              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page + 1 >= pagination.totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      )}

      {/* Edit Supervisor Dialog */}
      {editingSupervisor && (
        <Dialog
          open={!!editingSupervisor}
          onOpenChange={(open) => !open && setEditingSupervisor(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Supervisor</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Full Name*</Label>
                <Input
                  placeholder="Dr. John Doe"
                  value={`${editingSupervisor.firstName} ${editingSupervisor.lastName}`}
                  disabled
                />
              </div>
              <div className="space-y-2">
                <Label>Email*</Label>
                <Input
                  type="email"
                  placeholder="john.doe@university.edu"
                  value={editingSupervisor.email}
                  disabled
                />
              </div>
              <div className="space-y-2">
                <Label>Department*</Label>
                <Select
                  value={editingSupervisor.departement?.id?.toString()}
                  onValueChange={(value) =>
                    setEditingSupervisor({
                      ...editingSupervisor,
                      departement: { id: parseInt(value) },
                    })
                  }
                  disabled={isMutating}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Computer Science</SelectItem>
                    <SelectItem value="2">Electrical Engineering</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Specialization</Label>
                <Input
                  placeholder="Machine Learning, Cybersecurity, etc."
                  value={editingSupervisor.specialization}
                  onChange={(e) =>
                    setEditingSupervisor({
                      ...editingSupervisor,
                      specialization: e.target.value,
                    })
                  }
                  disabled={isMutating}
                />
              </div>
              <div className="space-y-2">
                <Label>Max Interns Capacity*</Label>
                <Select
                  value={editingSupervisor.maxStudents?.toString()}
                  onValueChange={(value) =>
                    setEditingSupervisor({
                      ...editingSupervisor,
                      maxStudents: parseInt(value),
                    })
                  }
                  disabled={isMutating}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select max interns" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 Interns</SelectItem>
                    <SelectItem value="5">5 Interns</SelectItem>
                    <SelectItem value="7">7 Interns</SelectItem>
                    <SelectItem value="10">10 Interns</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setEditingSupervisor(null)}
                disabled={isMutating}
              >
                Cancel
              </Button>
              <Button
                onClick={() =>
                  handleUpdateSupervisor({
                    id: editingSupervisor.id,
                    firstName: editingSupervisor.firstName,
                    lastName: editingSupervisor.lastName,
                    email: editingSupervisor.email,
                    specialization: editingSupervisor.specialization,
                    maxStudents: editingSupervisor.maxStudents,
                    departementId: editingSupervisor.departement?.id,
                  })
                }
                disabled={isMutating}
              >
                {isMutating ? (
                  <div className="flex items-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </div>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Supervisors;
