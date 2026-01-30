import {
  Download,
  Edit,
  FileText,
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

function Offers({ searchQuery }) {
  const { toast } = useToast();
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
      publishedAt: new Date("2023-07-01"),
      deadline: new Date("2023-08-15"),
    },
    {
      id: "2",
      title: "Data Science Research Assistant",
      description:
        "Assist in research projects involving machine learning and data analysis. Python and TensorFlow experience preferred.",
      duration: "6m",
      level: "phd",
      department: "Computer Science",
      applicationCount: 8,
      publishedAt: new Date("2023-06-15"),
      deadline: new Date("2023-07-30"),
    },
  ]);

  const [newOffer, setNewOffer] = useState({
    title: "",
    description: "",
    duration: "3m",
    level: "master",
    deadline: "",
  });
  const [editingOffer, setEditingOffer] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filterLevel, setFilterLevel] = useState("all");
  const [filterDuration, setFilterDuration] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewApplicationsOffer, setViewApplicationsOffer] = useState(null);
  const itemsPerPage = 5;

  // Mock applications data for View Applications
  const mockApplications = [
    {
      id: "1",
      applicant: "John Smith",
      status: "pending",
      submittedAt: new Date("2023-07-05"),
    },
    {
      id: "2",
      applicant: "Jane Doe",
      status: "reviewed",
      submittedAt: new Date("2023-07-06"),
    },
  ];

  const filteredOffers = useMemo(() => {
    return offers.filter((offer) => {
      const matchesSearch = offer.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesLevel = filterLevel === "all" || offer.level === filterLevel;
      const matchesDuration =
        filterDuration === "all" || offer.duration === filterDuration;
      return matchesSearch && matchesLevel && matchesDuration;
    });
  }, [offers, searchQuery, filterLevel, filterDuration]);

  const paginatedOffers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredOffers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredOffers, currentPage]);

  const totalPages = Math.ceil(filteredOffers.length / itemsPerPage);

  const validateOffer = (offer) => {
    if (!offer.title || offer.title.length < 3) {
      return "Position title must be at least 3 characters long";
    }
    if (!offer.duration) {
      return "Please select a duration";
    }
    if (!offer.level) {
      return "Please select a required level";
    }
    if (!offer.deadline) {
      return "Please select an application deadline";
    }
    const deadlineDate = new Date(offer.deadline);
    if (deadlineDate < new Date()) {
      return "Deadline cannot be in the past";
    }
    return null;
  };

  const handleAddOffer = () => {
    const validationError = validateOffer(newOffer);
    if (validationError) {
      toast({
        title: "Error",
        description: validationError,
        variant: "destructive",
      });
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
      publishedAt: new Date(),
      deadline: new Date(newOffer.deadline),
    };
    setOffers([newOfferData, ...offers]);
    setNewOffer({
      title: "",
      description: "",
      duration: "3m",
      level: "master",
      deadline: "",
    });
    setIsDialogOpen(false);
    toast({
      title: "Success",
      description: "Offer published successfully",
    });
  };

  const handleEditOffer = () => {
    const validationError = validateOffer(newOffer);
    if (validationError) {
      toast({
        title: "Error",
        description: validationError,
        variant: "destructive",
      });
      return;
    }

    setOffers(
      offers.map((offer) =>
        offer.id === editingOffer.id
          ? {
              ...offer,
              title: newOffer.title,
              description: newOffer.description,
              duration: newOffer.duration,
              level: newOffer.level,
              deadline: new Date(newOffer.deadline),
            }
          : offer
      )
    );
    setEditingOffer(null);
    setNewOffer({
      title: "",
      description: "",
      duration: "3m",
      level: "master",
      deadline: "",
    });
    setIsDialogOpen(false);
    toast({
      title: "Success",
      description: "Offer updated successfully",
    });
  };

  const handleDeleteOffer = (id) => {
    setOffers(offers.filter((offer) => offer.id !== id));
    toast({
      title: "Success",
      description: "Offer deleted successfully",
    });
  };

  const startEditing = (offer) => {
    setEditingOffer(offer);
    setNewOffer({
      title: offer.title,
      description: offer.description,
      duration: offer.duration,
      level: offer.level,
      deadline: offer.deadline.toISOString().split("T")[0],
    });
    setIsDialogOpen(true);
  };

  const handleCancel = () => {
    setEditingOffer(null);
    setNewOffer({
      title: "",
      description: "",
      duration: "3m",
      level: "master",
      deadline: "",
    });
    setIsDialogOpen(false);
  };

  const handleViewApplications = (offer) => {
    setViewApplicationsOffer(offer);
  };

  return (
    <div className="grid gap-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-xl font-semibold">Internship Offers</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Post New Offer
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>
                  {editingOffer
                    ? "Edit Internship Offer"
                    : "Post New Internship Offer"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Position Title*</Label>
                  <Input
                    placeholder="e.g., Software Engineering Intern"
                    value={newOffer.title}
                    onChange={(e) =>
                      setNewOffer({
                        ...newOffer,
                        title: e.target.value,
                      })
                    }
                    aria-required="true"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    placeholder="Describe the internship position..."
                    value={newOffer.description}
                    onChange={(e) =>
                      setNewOffer({
                        ...newOffer,
                        description: e.target.value,
                      })
                    }
                    rows={4}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Duration*</Label>
                    <Select
                      value={newOffer.duration}
                      onValueChange={(value) =>
                        setNewOffer({ ...newOffer, duration: value })
                      }
                      aria-required="true"
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2m">2 Months</SelectItem>
                        <SelectItem value="3m">3 Months</SelectItem>
                        <SelectItem value="6m">6 Months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Required Level*</Label>
                    <Select
                      value={newOffer.level}
                      onValueChange={(value) =>
                        setNewOffer({ ...newOffer, level: value })
                      }
                      aria-required="true"
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bachelor">Bachelor</SelectItem>
                        <SelectItem value="master">Master</SelectItem>
                        <SelectItem value="phd">PhD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Application Deadline*</Label>
                  <Input
                    type="date"
                    value={newOffer.deadline}
                    onChange={(e) =>
                      setNewOffer({
                        ...newOffer,
                        deadline: e.target.value,
                      })
                    }
                    aria-required="true"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button
                  onClick={editingOffer ? handleEditOffer : handleAddOffer}
                >
                  {editingOffer ? "Update Offer" : "Publish Offer"}
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
              <Select value={filterLevel} onValueChange={setFilterLevel}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="bachelor">Bachelor</SelectItem>
                  <SelectItem value="master">Master</SelectItem>
                  <SelectItem value="phd">PhD</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterDuration} onValueChange={setFilterDuration}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Durations</SelectItem>
                  <SelectItem value="2m">2 Months</SelectItem>
                  <SelectItem value="3m">3 Months</SelectItem>
                  <SelectItem value="6m">6 Months</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="text-sm text-gray-500">
              {filteredOffers.length} offers found
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Position</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Applications</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedOffers.map((offer) => (
                <TableRow key={offer.id}>
                  <TableCell className="font-medium">{offer.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {offer.level}
                    </Badge>
                  </TableCell>
                  <TableCell>{offer.duration}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{offer.applicationCount}</Badge>
                  </TableCell>
                  <TableCell>{offer.deadline.toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => startEditing(offer)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleViewApplications(offer)}
                        >
                          <FileText className="mr-2 h-4 w-4" />
                          View Applications
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteOffer(offer.id)}
                          className="text-red-600"
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
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

      <Dialog
        open={!!viewApplicationsOffer}
        onOpenChange={() => setViewApplicationsOffer(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Applications for {viewApplicationsOffer?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {mockApplications.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Applicant</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submitted</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockApplications.map((app) => (
                    <TableRow key={app.id}>
                      <TableCell>{app.applicant}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            app.status === "pending" ? "default" : "secondary"
                          }
                        >
                          {app.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {app.submittedAt.toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p>No applications found for this offer.</p>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setViewApplicationsOffer(null)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Offers;
