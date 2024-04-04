import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { AttentionSeeker } from 'react-awesome-reveal';

const SharePage = () => {

    const [url, setUrl] = useState();
    const [error, setError] = useState();
    const { id, order } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!id || !order) {
            return;
        }

        const storageRef = ref(storage, `/${id}/${order}.mp4`);
        const url = getDownloadURL(storageRef)
            .then((res) => {
                setUrl(res);
            })
            .catch((error) => {
                setError(true);
            });

    }, [id, order]);

    return (
        <Container className='page'>
            <div className='d-flex flex-column align-items-center justify-content-center mt-3 mb-3'>
                {url &&
                    <>
                        <video className='video' controls disablePictureInPicture disableRemotePlayback controlsList="noplaybackrate nodownload">
                            <source src={url} type="video/mp4" onError={(e) => { console.log(e); }} />
                        </video>
                    </>
                }
                {error &&
                    <>
                        <img src={'/images/404.png'} alt="" className='img404' />
                        <p className='img404text' >Sorry, the video you are looking for was not found.</p>
                        <AttentionSeeker effect='heartBeat'>
                            <button className='button-18 mt-5' onClick={() => { navigate('/'); }}>Create own video!</button>
                        </AttentionSeeker>
                    </>
                }

            </div>
        </Container>
    );
};

export default SharePage;