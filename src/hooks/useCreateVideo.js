import { useState, useEffect } from 'react'
import axios from 'axios'

const useCreateVideo = () => {

    const [videoStatus, setVideoStatus] = useState(null)
    const [orderId, setOrderId] = useState(null)

    const data = {
        "slideshow": [
            {
                "src": "https://pictures.com/1",
                "duration": 3,
                "in": "slideRight",
                "out": "slideLeft",
                "caption": "Super"
            },
            {
                "src": "https://pictures.com/2",
                "duration": 3,
                "in": "slideLeft",
                "out": "slideRight",
                "caption": "Puper"
            }
        ],
        "soundtrack": {
            "src": "https://music.com/1"
        }
    }

    const create = async () => {
        setVideoStatus('PREPARING')

        axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/video`, data, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            console.log(response.data.id)
            setOrderId(response.data.id)
        });
    }

    useEffect(() => {
        if (!orderId) {
            return
        }

        const checkStatusInterval = setInterval(() => {
            axios.get(`${import.meta.env.VITE_SERVER_BASE_URL}/status/${orderId}`)
                .then((response) => {
                    if (response.data.status === 'READY') {
                        setVideoStatus('READY')
                        clearInterval(checkStatusInterval);
                    } else if (response.data.status === 'FAILED') {
                        setVideoStatus('FAILED')
                        clearInterval(checkStatusInterval);
                    }
                })
        }, 3000);

    }, [orderId])

    return {
        create,
        videoStatus,
        orderId
    }
}

export default useCreateVideo