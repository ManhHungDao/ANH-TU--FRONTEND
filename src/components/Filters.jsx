import {
  Grid,
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
} from "@mui/material";
import {
  Search as SearchIcon,
  Cached as CachedIcon,
} from "@mui/icons-material";

const Filters = ({
  search,
  type,
  types,
  onSearchChange,
  onTypeChange,
  onSearch,
  onReset,
  onKeyPress,
}) => (
  <Grid container spacing={2} alignItems="center" my={2}>
    <Grid item xs={12} md={3}>
      <FormControl fullWidth variant="outlined">
        <OutlinedInput
          placeholder="Lọc theo tên"
          value={search}
          onChange={onSearchChange}
          onKeyPress={onKeyPress}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={onSearch}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </Grid>
    <Grid item>
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>Loại án</InputLabel>
        <Select value={type} onChange={onTypeChange} label="Loại án">
          {types.map((t) => (
            <MenuItem key={t._id} value={t._id}>
              <span>{t.type}</span>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
    <Grid item>
      <Tooltip title="Tải lại">
        <IconButton onClick={onReset}>
          <CachedIcon />
        </IconButton>
      </Tooltip>
    </Grid>
  </Grid>
);

export default Filters;
