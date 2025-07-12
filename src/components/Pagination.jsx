import { TablePagination } from "@mui/material";

const Pagination = ({
  count,
  rowsPerPage,
  page,
  onPageChange,
  onRowsPerPageChange,
}) => (
  <TablePagination
    rowsPerPageOptions={[10, 25, 50]}
    component="div"
    count={count}
    rowsPerPage={rowsPerPage}
    page={page}
    onPageChange={onPageChange}
    onRowsPerPageChange={onRowsPerPageChange}
    labelRowsPerPage="Cột trong trang:"
    className="table__clinic--pagination"
    sx={{
      "& .MuiTablePagination-toolbar": {
        minHeight: "40px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
      },
      "& .MuiTablePagination-selectLabel": {
        margin: 0,
      },
      "& .MuiTablePagination-select": {
        marginRight: "8px",
      },
      "& .MuiTablePagination-displayedRows": {
        margin: 0,
      },
      "& .MuiTablePagination-actions": {
        marginLeft: "8px",
      },
    }}
  />
);

export default Pagination;
