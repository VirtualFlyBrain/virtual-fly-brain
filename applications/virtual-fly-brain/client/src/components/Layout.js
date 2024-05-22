
import React, { useEffect, useState } from "react";
import TermInfo from "./TermInfo"
import vars from "../theme/variables";
import ErrorDialog from "./ErrorDialog";
import QueryBuilder from "./queryBuilder";
import MediaQuery from 'react-responsive';
import VFBUploader from "./VFBUploader/VFBUploader";
import { useDispatch, useSelector, useStore } from 'react-redux';
import { widgets } from "./layout/widgets";
import VFBDownloadContents from "./VFBDownloadContents/VFBDownloadContents";
import { setWidgets } from '@metacell/geppetto-meta-client/common/layout/actions';
import { setTermInfoOpened, setQueryComponentOpened } from './../reducers/actions/globals'
import { getLayoutManagerInstance } from "@metacell/geppetto-meta-client/common/layout/LayoutManager";
import { templateLoaded,  removeAllInstances, getInstanceByID } from './../reducers/actions/instances';
import { Box, Button,Modal, useMediaQuery, useTheme, Typography, CircularProgress, Link } from "@mui/material";
import { activateCircuits, activateImages } from "../reducers/actions/layout";

const {
  secondaryBg,
  headerBorderColor,
  tabActiveColor,
  primaryBg,
  secondaryBtnColor
} = vars;

const tabsArr = [
  { id: 0, name: 'Term Info' },
  { id: 1, name: 'Images' },
  { id: 2, name: 'Circuits' },
]

const MainLayout = ({ bottomNav, setBottomNav }) => {
  const theme = useTheme();
  const sidebarOpen = useSelector(state => state.globalInfo.termInfoOpened)
  const [modalOpen, setModalOpen] = useState(false);
  const desktopScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const defaultActiveTab = desktopScreen ? [0, 1, 2, 3, 4] : [0];
  const [tab, setTab] = useState([]);
  const [LayoutComponent, setLayoutComponent] = useState(undefined);
  const [isLayoutMobile, setIsLayoutMobile] = useState(window.innerWidth < 1200);
  const misalignedTemplate = useSelector(state => state.globalInfo.misalignedTemplate)
  const alignedTemplates = useSelector( state => state.globalInfo.alignedTemplates)
  const dispatch = useDispatch();
  let templateRef = window.location.origin + "?id=" + misalignedTemplate;
  const store = useStore();

  //global reducers errors
  const instancesError = useSelector(state => state.instances.error);
  const instancesErrorMessage = useSelector(state => state.instances.errorMessage);
  const queriesError = useSelector(state => state.queries.error);
  const queriesErrorMessage = useSelector(state => state.queries.errorMessage);
  const allLoadedInstances = useSelector( state => state.instances.allLoadedInstances);

  const modalError = instancesError || queriesError;
  const modalErrorMessage = instancesErrorMessage || queriesErrorMessage;

  const handleMediaQueryChange = (matches) => {
    if (!matches) {
      setIsLayoutMobile(false);
    } else {
      setIsLayoutMobile(true);
      setTab([0]);
    }
  };

  useEffect(() => {
    setTab(defaultActiveTab)
  }, [desktopScreen])

  useEffect(() => {
    setModalOpen(!alignedTemplates)
  }, [alignedTemplates])

  useEffect(() => {
    if (LayoutComponent === undefined) {
      const myManager = getLayoutManagerInstance();
      if (myManager) {
        myManager.enableMinimize = true
        setLayoutComponent(myManager.getComponent());
      }
    }
  }, [store])

  const queryComponentOpened = useSelector( state => state.globalInfo?.queryComponentOpened );

  useEffect( () => {
    if ( queryComponentOpened && bottomNav == undefined ){
      setBottomNav(2)
    } else if ( !queryComponentOpened ) {
      setBottomNav(undefined)
    }
  }, [queryComponentOpened]);

  useEffect( () => {
    if ( bottomNav === 2 ){
      //dispatch(setQueryComponentOpened(true));
    }
  }, [bottomNav]);

  useEffect(() => {
    dispatch(setWidgets(widgets));
  }, [])

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
    setTab([id]);

    if (id === 1) {
      dispatch(activateImages());
    } else if (id === 2) {
      dispatch(activateCircuits());
    }
  }

  const setSidebarOpen = (opened) => {
    dispatch(setTermInfoOpened(opened))
  }


  const handleModalClose = (id, openTemplate) => {
    if ( openTemplate) {
      templateLoaded(id, openTemplate);
      templateRef = window.location.href.replace(id + ",", "")
    }else {
      getInstanceByID(id, false, true, false, false)
    }
    setModalOpen(false)
  }

  const tabContent = isLayoutMobile ? (
    <>
      {tab.includes(0) && (
        <TermInfo open={sidebarOpen} setOpen={setSidebarOpen} />
      )}

      {tab.includes(1) && (
        <Box>
          {LayoutComponent === undefined ? <CircularProgress/> : <LayoutComponent/>}
        </Box>
      )}

      {tab.includes(2) && (
        <Box>
          {LayoutComponent === undefined ? <CircularProgress/> : <LayoutComponent/>}
        </Box>
      )}
    </>
  ) : (
    <>
      {tab.includes(0) && (
        <TermInfo open={sidebarOpen} setOpen={setSidebarOpen} />
      )}

      {tab.includes(1) && (
        <Box>
          {LayoutComponent === undefined ? <CircularProgress/> : <LayoutComponent/>}
        </Box>
      )}
    </>
  );

  return (
    <>
      <MediaQuery maxWidth={1199} onChange={handleMediaQueryChange}>
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

      <ErrorDialog display={modalError} message={modalErrorMessage}/>
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
          <Button variant="contained" color={primaryBg} onClick={() => handleModalClose(misalignedTemplate, true )} target="_blank" href={window.location.origin + "/?id=" + misalignedTemplate}>Okay</Button>
          <Button variant="outlined" color={secondaryBtnColor} onClick={() => handleModalClose(misalignedTemplate, false )}>Cancel</Button>
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
            xs: !bottomNav ? '100%' : 'calc(100vh - 6.0625rem)',
            lg: 'calc(100vh - 6rem)'
          },
        }}
      >
        {desktopScreen ? (
          <>
            {tabContent}
            {bottomNav === 0 && < VFBUploader open={true} setBottomNav={setBottomNav} />}
            {bottomNav === 1 && <VFBDownloadContents open={true} setBottomNav={setBottomNav} />}
            {bottomNav === 2 && <QueryBuilder setBottomNav={setBottomNav} fullWidth={sidebarOpen} tabSelected={0}/>}
            {bottomNav === 4 && ( allLoadedInstances?.length > 1 && removeAllInstances())}
            {bottomNav === 5 && <QueryBuilder setBottomNav={setBottomNav} fullWidth={sidebarOpen} tabSelected={1}/>}
          </>
        ) : (
          <>
            {
              bottomNav != 2 && tabContent
            }
            {bottomNav === 0 && <VFBUploader open={true} setBottomNav={setBottomNav} />}
            {bottomNav === 1 && <VFBDownloadContents open={true} setBottomNav={setBottomNav} />}
            {bottomNav === 2 && <QueryBuilder setBottomNav={setBottomNav} fullWidth={sidebarOpen} tabSelected={0}/>}
            {bottomNav === 4 && ( allLoadedInstances?.length > 1 && removeAllInstances())}
            {bottomNav === 5 && <QueryBuilder setBottomNav={setBottomNav} fullWidth={sidebarOpen} tabSelected={1}/>}
          </>
        )}
      </Box>
    </>
  )
};

export default MainLayout;
