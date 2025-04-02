import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  TextField,
  Box,
  Card,
  CardContent,
  useMediaQuery,
  Typography,
  Select,
  MenuItem,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";

const UserDetails = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("name");
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) throw new Error("Failed to fetch data");
        const result = await response.json();
        setUsers(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 70, sortable: true },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "address", headerName: "Address", width: 400 },
    { field: "company", headerName: "Company", width: 200 },
  ];

  const rows = users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    address: `${user.address.city} ${user.address.street} ${user.address.suite} ${user.address.zipcode}`,
    company: user.company.name,
  }));

  const filteredRows = rows.filter((row) =>
    Object.values(row).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const sortedRows = [...filteredRows].sort((a, b) =>
    a[sortField]?.localeCompare(b[sortField])
  );

  // Paginate for Mobile View
  const paginatedRows = sortedRows.slice(
    page * rowsPerPage,
    (page + 1) * rowsPerPage
  );

  return (
    <Box sx={{ width: "100%", margin: "auto", mt: 4 }}>
      {loading && (
        <CircularProgress sx={{ display: "block", margin: "auto" }} />
      )}

      {error && (
        <Box textAlign="center">
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
          <Button variant="contained" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </Box>
      )}

      {!loading && !error && (
        <>
          <TextField
            label="Search..."
            variant="outlined"
            fullWidth
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ mb: 2 }}
          />

          {isSmallScreen ? (
            <Box>
              <Select
                value={sortField}
                onChange={(e) => setSortField(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
              >
                <MenuItem value="name">Sort by Name</MenuItem>
                <MenuItem value="email">Sort by Email</MenuItem>
                <MenuItem value="company">Sort by Company</MenuItem>
                <MenuItem value="address">Sort by Address</MenuItem>
              </Select>

              {paginatedRows.map((user) => (
                <Card
                  key={user.id}
                  sx={{
                    mb: 2,
                    p: 2,
                    border: "1px solid #ccc",
                    borderRadius: "10px",
                    boxShadow: 3,
                  }}
                >
                  <CardContent>
                    <Typography variant="h6">{user.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Email:</strong> {user.email}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Company:</strong> {user.company}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Address:</strong> {user.address}
                    </Typography>
                  </CardContent>
                </Card>
              ))}

              <Box display="flex" justifyContent="space-between" mt={2}>
                <Button
                  variant="contained"
                  disabled={page === 0}
                  onClick={() => setPage(page - 1)}
                >
                  Previous
                </Button>
                <Typography variant="body1">Page {page + 1}</Typography>
                <Button
                  variant="contained"
                  disabled={(page + 1) * rowsPerPage >= sortedRows.length}
                  onClick={() => setPage(page + 1)}
                >
                  Next
                </Button>
              </Box>
            </Box>
          ) : (
            <DataGrid
              rows={filteredRows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5, 10, 20]}
              disableSelectionOnClick
              sortingOrder={["asc", "desc"]}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default UserDetails;
