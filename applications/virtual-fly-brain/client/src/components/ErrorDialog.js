import React, { Fragment } from 'react';
import Button from '@mui/material/Button';
import { MailIcon, BugIcon, ModalErrorIcon } from '../icons';
import Modal from '../shared/modal/Modal';

const ErrorDialog = ({ display, message }) => {
    const [open, setOpen] = React.useState(display);

    const handleClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {
        setOpen(display);
    }, [display]);

    return (
        <Modal
            open={false}
            handleClose={handleClose}
            title={
                <Fragment>
                    <ModalErrorIcon />
                    Something went wrong!
                </Fragment>
            }
            description={message}
            sx={{
                '&:before': {
                    content: '""',
                    position: 'absolute',
                    width: '12.5rem',
                    height: '10rem',
                    backgroundImage: `url('../../assets/bgPatternErrorModal.png')`,
                    backgroundRepeat: 'no-repeat'
                }
            }}
        >
            <Button variant='outlined' href={`mailto:support@virtualflybrain.org?subject=Issue reported from the UI error dialog`}>
                <MailIcon />
                Contact us
            </Button>
            <Button variant='contained' href={'https://github.com/VirtualFlyBrain/VFB2/issues/new'} target='_blank'>
                <BugIcon />
                Report on Github
            </Button>
        </Modal>
    );
}

export default ErrorDialog;