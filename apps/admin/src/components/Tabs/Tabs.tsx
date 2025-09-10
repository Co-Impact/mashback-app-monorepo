import { Box, type SxProps, Tab, type Theme, Typography } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  cloneElement,
  type FC,
  isValidElement,
  type ReactElement,
  type ReactNode,
  type SyntheticEvent,
  useState,
  useEffect,
} from "react";
import LockIcon from "@mui/icons-material/Lock"; 


export interface TabItem {
  icon?: ReactElement;
  label: string;
  value: string;
  children: ReactNode;
  isLocked?: boolean
}

interface Props {
  tabs: TabItem[];
  tabLabelsContainerStyle?: SxProps<Theme>;
  activeTab?: string; // ← Optional external active tab
}

export const PageTabs: FC<Props> = ({
  tabs,
  tabLabelsContainerStyle = {},
  activeTab,
}) => {

  const [value, setValue] = useState<string>(()=>tabs.find((t) => t.value === activeTab)?.value || tabs[0].value);

  // Update internal state when external activeTab changes
  useEffect(() => {
    if (activeTab && activeTab !== value) {
      const matchedTab = tabs.find((tab) => tab.value === activeTab);
      if (matchedTab) setValue(matchedTab.value);
    }
  }, [activeTab, tabs]);

  const handleChange = (_event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const renderLabel = (
    icon: ReactElement | undefined,
    label: string,
    selected: boolean,
    isLocked: boolean
  ): ReactNode => {const coloredIcon: ReactNode = isValidElement(icon)
      ? cloneElement(icon as ReactElement<{ sx?: SxProps<Theme> }>, {
          sx: { color: selected ? "white" : "inherit" },
        })
      : icon;

    return (
      <Box display="flex" alignItems="center" gap={1}>
        {coloredIcon}
        <Typography
          sx={{ color: selected ? "white" : "label.primary" }}
          variant="body2"
        >
          {label}
        </Typography>
        {isLocked && (
        <LockIcon sx={{ color: selected ? "white" : "label.primary" }} fontSize="small" />
      )}
      </Box>
    );
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        typography: "body1",
      }}
    >
      <TabContext value={value}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            ...tabLabelsContainerStyle,
          }}
        >
          <TabList
            onChange={handleChange}
            aria-label="tabs"
            sx={{
              "& .Mui-selected": {
                bgcolor: "info.dark",
                borderTopLeftRadius: 1,
                borderTopRightRadius: 1,
              },
            }}
          >
            {tabs.map((tab) => (
              <Tab
                key={tab.value}
                value={tab.value}
                label={renderLabel(tab.icon, tab.label, value === tab.value, tab.isLocked ?? false)}
                 disabled={tab.isLocked}
              />
            ))}
          </TabList>
        </Box>

        {tabs.map(({ value: tabValue, children }) => (
          <TabPanel key={tabValue} value={tabValue}>
            {children as any}
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
};
