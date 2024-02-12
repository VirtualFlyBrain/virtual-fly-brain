
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import MediaQuery from 'react-responsive';
import { Box, Button,Modal, useMediaQuery, useTheme, Typography, CircularProgress, Link } from "@mui/material";
import TermInfo from "./TermInfo"
import vars from "../theme/variables";
import VFBDownloadContents from "./VFBDownloadContents/VFBDownloadContents";
import VFBUploader from "./VFBUploader/VFBUploader";
import QueryBuilder from "./queryBuilder";
import { getLayoutManagerInstance } from "@metacell/geppetto-meta-client/common/layout/LayoutManager";
import { addWidget } from '@metacell/geppetto-meta-client/common/layout/actions';
import { threeDCanvasWidget, stackViewerWidget, roiBrowserWidget, termContextWidget, circuitBrowserWidget, listViewerWidget } from "./layout/widgets";
import { templateLoaded } from './../reducers/actions/instances';
import store from "../store";
import VFBStackViewer from "./StackViewer";
import VFBListViewer from "./VFBListViewer"

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
  { id: 3, name: 'Template ROI Browser' }
]

const MainLayout = ({ bottomNav, setBottomNav }) => {
  const theme = useTheme();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const desktopScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const defaultActiveTab = desktopScreen ? [0, 1, 2, 3, 4] : [0];
  const [tab, setTab] = useState([]);
  const [LayoutComponent, setLayoutComponent] = useState(undefined);
  const launchTemplate = useSelector(state => state.instances.launchTemplate)
  const dispatch = useDispatch();
  let templateRef = window.location.origin + "?id=" + launchTemplate?.metadata?.Id;

  useEffect(() => {
    setTab(defaultActiveTab)
  }, [desktopScreen])

  useEffect(() => {
    if ( launchTemplate !== null ) {
      setModalOpen(true)
    } else {
      setModalOpen(false)
    }
  }, [launchTemplate])

  useEffect(() => {
    if (LayoutComponent === undefined) {
      const myManager = getLayoutManagerInstance();
      if (myManager) {
        myManager.enableMinimize = true
        setLayoutComponent(myManager.getComponent());
      }
    }
  }, [store])

  useEffect(() => {
    dispatch(addWidget(threeDCanvasWidget));
    // TODO: fix stack viewer
    // dispatch(addWidget(stackViewerWidget));
    //dispatch(addWidget(sideBarWidget(sidebarOpen, setSidebarOpen)));
    dispatch(addWidget(circuitBrowserWidget));
    dispatch(addWidget(roiBrowserWidget));
    dispatch(addWidget(termContextWidget));
    dispatch(addWidget(listViewerWidget));
  }, [sidebarOpen, setSidebarOpen])

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
    modalStyle : {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    }
  }

  const handleTabSelect = (id) => {
    setTab([id])
  }

  const handleModalClose = (id, openTemplate) => {
    templateLoaded(id, openTemplate);
    setModalOpen(false)
    templateRef = window.location.origin + "?id=" + id
  }

  const tabContent = (
    <>
      {tab.includes(0) && (
        <TermInfo open={sidebarOpen} setOpen={setSidebarOpen} />
      )}

      {tab.includes(1) && (
        // TODO the styling is just temporary, needs to be fixed
        <Box>
          {LayoutComponent === undefined ? <CircularProgress/> : <LayoutComponent/>}
        </Box>
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
      <Modal
        open={modalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={classes.modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Template Alignation
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            The image you requested is aligned to another template. Click Okay
            to open in a new tab or Cancel to just view the image metadata.
          </Typography>
          <Button variant="contained" color="primary" onClick={() => handleModalClose(launchTemplate?.metadata?.Id, true )} target="_blank" href={templateRef}>Okay</Button>
          <Button variant="outlined" color="secondary" onClick={() => handleModalClose(launchTemplate?.metadata?.Id, false )}>Cancel</Button>
        </Box>
      </Modal>
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
            {bottomNav === 0 && <VFBStackViewer  />}
            {bottomNav === 1 && <VFBDownloadContents open={true} setBottomNav={setBottomNav} />}
            {bottomNav === 2 && <QueryBuilder setBottomNav={setBottomNav} fullWidth={sidebarOpen} />}
          </>
        ) : (
          <>
            {
              bottomNav != 2 && tabContent
            }
            {bottomNav === 0 && <VFBStackViewer  />}
            {bottomNav === 1 && <VFBDownloadContents open={true} setBottomNav={setBottomNav} />}
            {bottomNav === 2 && <QueryBuilder setBottomNav={setBottomNav} fullWidth={sidebarOpen} />}
          </>
        )}
      </Box>
    </>
  )
};

export default MainLayout;
