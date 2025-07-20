import React from "react";
import { TreeView, TreeItem } from "@mui/lab";
import { ExpandMore, ChevronRight } from "@mui/icons-material";

export default function MenuTree({ menus, onSelect }) {
  const renderTree = (node) => (
    <TreeItem key={node._id} nodeId={node._id} label={node.title}>
      {Array.isArray(node.children) &&
        node.children.map((child) => renderTree(child))}
    </TreeItem>
  );

  return (
    <TreeView
      defaultCollapseIcon={<ExpandMore />}
      defaultExpandIcon={<ChevronRight />}
      onNodeSelect={(e, nodeId) => onSelect(nodeId)}
      sx={{ overflowY: "auto", maxHeight: "80vh" }}
    >
      {menus.map((menu) => renderTree(menu))}
    </TreeView>
  );
}
