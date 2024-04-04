import React, { useEffect } from 'react';
import { ClockLoader } from 'react-spinners';
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const StatusModal = ({ videoStatus, setVideoStatus }) => {

    const navigate = useNavigate();

    useEffect(() => {
        if (videoStatus === 'READY') {
            navigate('/your_video');
        }
    }, [videoStatus]);


    return (
        <Modal show={videoStatus} dialogClassName='waiting-loading modal-dialog modal-dialog-centered'>
            {videoStatus === 'PREPARING' &&
                <>
                    <ClockLoader speedMultiplier={0.5} size={250} color={'#92a49f'} />
                    <p className='mt-5 text-center'>Please wait, we prepare your video. It may take some time. Do not close the window.</p>
                </>
            }
            {videoStatus === 'FAILED' &&
                <>
                    <p className='mt-5'>An error has occurred, please try again.</p>
                    <div className='w-100 text-center'>
                        <button className='button-18 mt-5' onClick={() => { setVideoStatus(null); }}>Try again</button>
                    </div>
                </>
            }
        </Modal>
    );
};

export default StatusModal;