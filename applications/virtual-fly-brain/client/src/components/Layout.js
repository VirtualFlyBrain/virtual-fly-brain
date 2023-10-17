
import React, { useEffect, useState } from "react";
import MediaQuery from 'react-responsive';
import { Box, Button, useMediaQuery, useTheme } from "@mui/material";
import ThreeDCanvas from "./ThreeDCanvas"
import TermInfo from "./TermInfo"
import Images from "./Images";
import StackViewer from './StackViewer';
import ROIBrowser from './ROIBrowser/ROIBrowser';
import vars from "../theme/variables";
import Circuit from "./Circuit";
import StackViewerComponent from "./StackViewerComponent";
import VFBDownloadContents from "./VFBDownloadContents/VFBDownloadContents";
import VFBUploader from "./VFBUploader/VFBUploader";
import QueryBuilder from "./queryBuilder";
const {
  secondaryBg,
  headerBorderColor,
  tabActiveColor,
  blackColor
} = vars;

const tabsArr = [
  { id: 0, name: 'Term Info' },
  { id: 1, name: 'Images' },
  { id: 2, name: 'Stack Viewers' },
  { id: 3, name: 'ROI Browser' }
]

const MainLayout = ({ bottomNav, setBottomNav }) => {
  const theme = useTheme();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const desktopScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const defaultActiveTab = desktopScreen ? [0, 1, 2, 3] : [0];
  const [tab, setTab] = useState([]);

  useEffect(() => {
    setTab(defaultActiveTab)
    if (!desktopScreen) {
      setBottomNav(2)
    }
  }, [desktopScreen])

  const classes = {
    tabs: {
      height: '2.75rem',
      background: secondaryBg,

      '& .MuiButton-text': {
        height: '100%',
        flex: 1,
        position: 'relative',

        '&.active': {
          '&:after': {
            position: 'absolute',
            content: '""',
            height: '0.125rem',
            width: '100%',
            bottom: 0,
            background: tabActiveColor,
          }
        }
      }
    },

    tabContent: {
      background: headerBorderColor,
      '& > div': {
        flex: 1,
        // display: 'flex'
      }
    },
  }

  const handleTabSelect = (id) => {
    setTab([id])
  }

  const tabContent = (
    <>
      {tab.includes(0) && (
        <TermInfo open={sidebarOpen} setOpen={setSidebarOpen} />
      )}

      {tab.includes(1) && (
        <ThreeDCanvas />
      )}

      {tab.includes(2) && (
        <StackViewer
          id="NewStackViewer"
          defHeight={600}
          defWidth={300}
        />
      )}

      {tab.includes(3) && (
        <ROIBrowser
          id="roiBrowser"
          size={{ height: 600, width: 300 }}
        />
      )}
    </>
  )

  return (
    <>
      <MediaQuery maxWidth={1199}>
        {!bottomNav ? (
          <Box display='flex' sx={classes.tabs}>
            {tabsArr.map((el) => (
              <Button sx={{ px: 0 }} className={tab.includes(el.id) ? 'active' : ''} key={el.id} onClick={() => handleTabSelect(el.id)}>
                {el.name}
              </Button>
            ))}
          </Box>
        ) : null}
      </MediaQuery>

      <Box
        display='flex'
        flexWrap='wrap'
        alignItems='flex-start'
        gap={1}
        sx={{
          ...classes.tabContent,
          position: {
            lg: 'relative'
          },
          paddingTop: {
            lg: 1
          },
          paddingRight: {
            lg: 1
          },
          pb: {
            xs: 7,
            sm: 9,
            lg: 0
          },
          overflow: {
            xs: 'auto',
            md: 'visible'
          },
          height: {
            xs: !bottomNav ? 'calc(100vh - 8.8125rem)' : 'calc(100vh - 6.0625rem)',
            lg: 'calc(100vh - 6rem)'
          },
        }}
      >
        {desktopScreen ? (
          <>
            {tabContent}
            {bottomNav === 0 && <VFBUploader open={true} setBottomNav={setBottomNav} />}
            {bottomNav === 1 && <VFBDownloadContents open={true} setBottomNav={setBottomNav} />}
            {bottomNav === 2 && <QueryBuilder setBottomNav={setBottomNav} fullWidth={sidebarOpen} />}
          </>
        ) : (
          <>
            {
              bottomNav != 2 && tabContent
            }
            {bottomNav === 0 && <VFBUploader open={true} setBottomNav={setBottomNav} />}
            {bottomNav === 1 && <VFBDownloadContents open={true} setBottomNav={setBottomNav} />}
            {bottomNav === 2 && <QueryBuilder setBottomNav={setBottomNav} fullWidth={sidebarOpen} />}
          </>
        )}
      </Box>
    </>
  )
};

export default MainLayout;