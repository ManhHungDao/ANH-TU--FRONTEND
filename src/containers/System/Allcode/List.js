import { ListItem, List, ListItemButton, ListItemIcon } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Checkbox from "@mui/material/Checkbox";

const ListComponent = ({
  setOpen,
  open,
  icon,
  list,
  checked,
  handleToggle,
  toggleName,
  primaryName,
}) => {
  return (
    <div>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton onClick={() => setOpen(!open)}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={primaryName} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
            }}
            disablePadding
          >
            {list.map((e) => {
              const labelId = `checkbox-list-label-${e.value}`;

              return (
                <ListItem
                  key={e.value}
                  // disablePadding
                  sx={{ p: 0, pl: 3 }}
                >
                  <ListItemButton
                    role={undefined}
                    onClick={handleToggle(e.value, toggleName)}
                    dense
                    sx={{ height: "30px" }}
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={checked.indexOf(e.value) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={`${e.name}`} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Collapse>
      </List>
    </div>
  );
};

export default ListComponent;
