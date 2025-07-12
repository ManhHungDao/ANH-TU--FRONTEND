import { TableRow, TableCell, IconButton, Box, Tooltip } from "@mui/material";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import ViewIcon from "@mui/icons-material/RemoveRedEyeRounded";
import DeleteIcon from "@mui/icons-material/Delete";

const TableRowItem = ({ file, onAction }) => (
  <TableRow>
    <TableCell>
      <Box display="flex" alignItems="center" gap={1}>
        <img
          src={file.logo}
          alt={file.name}
          style={{ width: 20, height: 20 }}
        />
        {file.name}
      </Box>
    </TableCell>
    <TableCell>{file.type?.type || ""}</TableCell>
    <TableCell align="center">
      <Tooltip title="Tải xuống">
        <IconButton onClick={() => onAction(file, "Download")}>
          <ArrowCircleDownIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Sửa">
        <IconButton onClick={() => onAction(file, "Edit")}>
          <ViewIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Xóa">
        <IconButton onClick={() => onAction(file, "Delete")}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </TableCell>
  </TableRow>
);

export default TableRowItem;
