import { useState, useEffect } from 'react'
import axios from 'axios'

const useCreateVideo = () => {

    const [videoStatus, setVideoStatus] = useState(null)
    const [orderId, setOrderId] = useState(null)

    const create = async () => {
        setVideoStatus('PREPARING')

        let slidesLocal = JSON.parse(localStorage.getItem('slides'))

        const data = JSON.stringify({
            slideshow: slidesLocal.map(slide => {
                return {
                    src: slide.url,
                    duration: (~~slide.duration),
                    transition: slide.transition,
                    caption: slide.caption
                }
            }),
            userID: localStorage.getItem('userID')
        })


        axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/video`, data, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            localStorage.setItem('orderID', response.data.id)
            setOrderId(response.data.id)
        }).catch((error) => {
            console.log(error)
            setVideoStatus('FAILED')
        })
    }

    useEffect(() => {
        if (!orderId) {
            return
        }

        const checkStatusInterval = setInterval(() => {
            axios.get(`${import.meta.env.VITE_SERVER_BASE_URL}/status/${orderId}`)
                .then((response) => {
                    if (response.data.status === 'READY') {
                        localStorage.setItem('videoURL', response.data.url)
                        setVideoStatus('READY')
                        clearInterval(checkStatusInterval);
                    } else if (response.data.status === 'FAILED') {
                        setVideoStatus('FAILED')
                        clearInterval(checkStatusInterval);
                    }
                }).catch((error) => {
                    console.log(error)
                    setVideoStatus('FAILED')
                })
        }, 3000);

    }, [orderId])

    return {
        create,
        videoStatus,
        setVideoStatus,
        orderId
    }
}

export default useCreateVideo