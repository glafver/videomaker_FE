import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { ref, getDownloadURL } from 'firebase/storage'
import { storage } from '../firebase'
import { useNavigate } from 'react-router-dom'

const SharePage = () => {

    const [url, setUrl] = useState()
    const { id, order } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (!id || !order) {
            return
        }

        const storageRef = ref(storage, `/${id}/${order}.mp4`)
        const url = getDownloadURL(storageRef)
            .then((res) => {
                setUrl(res)
            })
            .catch((error) => {
                console.log(error)
                navigate('/')
            })

    }, [id, order])


    return (
        <Container className='page'>
            <div className='d-flex flex-column align-items-center justify-content-center mt-3'>
                {url &&
                    <>
                        <video width="100%" controls disablePictureInPicture disableRemotePlayback controlsList="noplaybackrate nodownload">
                            <source src={url} type="video/mp4" onError={(e) => { console.log(e) }} />
                        </video>
                    </>
                }

            </div>
        </Container>
    )
}

export default SharePage