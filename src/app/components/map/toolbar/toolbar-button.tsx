"use client";

import { SvgIconProps, useTheme } from "@mui/material";

import { IconButton } from "@mui/material";

interface ToolbarButtonProps {
  Icon: React.ComponentType<SvgIconProps>;
  onClick: () => void;
  active: boolean;
}

export const ToolbarButton = ({
  Icon,
  onClick,
  active,
}: ToolbarButtonProps) => {
  const theme = useTheme();
  return (
    <IconButton onClick={onClick}>
      <Icon
        sx={{
          color: active ? "white" : theme.palette.primary.main,
          textShadow: "2px 2px 4px #000000",
        }}
      />
    </IconButton>
  );
};
