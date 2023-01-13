import { useState, useEffect } from 'react'
import axios from 'axios'

const useCreateVideo = () => {

    const [videoStatus, setVideoStatus] = useState(null)
    const [orderId, setOrderId] = useState(null)

    const data = {
        "slideshow": [
            {
                "src": "https://drive.google.com/file/d/1F2azW7P_ZB6SiKpGjfQVtBz1GoxgCabr/view?usp=share_link",
                "duration": 1,
                "transition": "wipeleft",
                "caption": "Super"
            },
            {
                "src": "https://cdn.pixabay.com/photo/2020/04/05/11/32/moon-5005711_960_720.jpg",
                "duration": 6,
                "transition": "fade",
                "caption": "Puper"
            },
            {
                "src": "https://cdn.pixabay.com/photo/2016/04/13/13/14/grass-1326759_960_720.jpg",
                "duration": 3,
                "transition": "horzopen",
                "caption": "Super"
            },
            {
                "src": "https://cdn.pixabay.com/photo/2020/04/05/11/32/moon-5005711_960_720.jpg",
                "duration": 6,
                "caption": "Puper"
            }
        ]
    }

    const create = async () => {
        setVideoStatus('PREPARING')

        // let slidesLocal = JSON.parse(localStorage.getItem('slides'))

        // const data = JSON.stringify({
        //     slideshow: slidesLocal.map(slide => {
        //         return {
        //             src: slide.url,
        //             duration: slide.duration,
        //             transition: slide.transition,
        //             caption: slide.caption
        //         }
        //     })
        // })

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