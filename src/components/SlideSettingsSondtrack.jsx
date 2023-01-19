import React, { useState, useEffect, useRef } from 'react'
import { Form } from 'react-bootstrap'
import { PlayCircle, PauseCircle } from 'react-bootstrap-icons'

const SlideSettingsSondtrack = () => {

    const trackUrls = [
        { value: 'none', label: 'No soundtrack' },
        {
            value: 'https://cdn.pixabay.com/download/audio/2022/10/12/audio_2eca99b967.mp3?filename=happy-acoustic-guitar-background-music-122614.mp3',
            label: 'Happy acoustic guitar'
        },
        {
            value: 'https://cdn.pixabay.com/download/audio/2021/12/20/audio_1ba25f9ea7.mp3?filename=positive-ambient-technology-12452.mp3',
            label: 'Positive ambient technology'
        },
        {
            value: 'https://cdn.pixabay.com/download/audio/2021/11/25/audio_a1582d4d5f.mp3?filename=uplifting-and-inspiring-corporate-11255.mp3',
            label: 'Inspiring corporate'
        },
        {
            value: 'https://cdn.pixabay.com/download/audio/2021/10/25/audio_f7f75a3ad5.mp3?filename=motivational-inspiring-piano-9837.mp3',
            label: 'Motivational Inspiring Piano'
        },
        {
            value: 'https://cdn.pixabay.com/download/audio/2022/11/29/audio_a09bd87aec.mp3?filename=stomp-and-claps-127551.mp3',
            label: 'Stomp and Claps'
        },
        {
            value: 'https://cdn.pixabay.com/download/audio/2021/10/27/audio_7175f8385f.mp3?filename=minimal-tech-ambient-9965.mp3',
            label: 'Minimal Tech Ambient'
        },
        {
            value: 'https://cdn.pixabay.com/download/audio/2021/02/08/audio_7ac09a1714.mp3?filename=background-loop-melodic-techno-03-2691.mp3',
            label: 'Background Loop Melodic Techno '
        },
        {
            value: 'https://cdn.pixabay.com/download/audio/2022/11/30/audio_0a290eb002.mp3?filename=corporate-background-127574.mp3',
            label: 'Corporate Background'
        },
        {
            value: 'https://cdn.pixabay.com/download/audio/2022/12/01/audio_e73399ae20.mp3?filename=christmas-fairy-tale-127749.mp3',
            label: 'Christmas Fairy Tale'
        },
        {
            value: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_ca9b491562.mp3?filename=corporate-inspiring-ambient-music-84180.mp3',
            label: 'Corporate Inspiring Ambient Music'
        },
        {
            value: 'https://cdn.pixabay.com/download/audio/2021/12/03/audio_95ea13286f.mp3?filename=beauty-design-ambient-11620.mp3',
            label: 'Beauty Design Ambient'
        },
        {
            value: 'https://cdn.pixabay.com/download/audio/2021/12/14/audio_2263129e26.mp3?filename=beautiful-piano-minimal-ambient-12163.mp3',
            label: 'Beautiful Piano Minimal Ambient'
        }

    ]

    const [soundtrack, setSoundtrack] = useState('none')
    const [playing, setPlaying] = useState(false)

    const audio = useRef(null)

    const playsoundtrack = (control) => {
        if (control === "play") {
            audio.current.play()
            setPlaying(true)
        } else if (control === "pause") {
            audio.current.pause()
            setPlaying(false)
        }
    }

    useEffect(() => {
        setSoundtrack(localStorage.getItem('soundtrack'))
    }, [])


    return (
        <div className='soundtrack-wrapper'>
            <Form.Group controlId="soundtrack">
                <div className='d-flex align-items-center'>
                    <Form.Label>Soundtrack:</Form.Label>
                    {soundtrack &&
                        <>
                            {playing ? (
                                <PauseCircle className="controlsIcon" onClick={() => { playsoundtrack('pause') }} style={{ cursor: 'pointer', marginLeft: '15px', marginBottom: '6px' }} />
                            ) : (
                                <PlayCircle className="controlsIcon" onClick={() => { playsoundtrack('play') }} style={{ cursor: 'pointer', marginLeft: '15px', marginBottom: '6px' }} />
                            )}
                            <audio ref={audio} src={soundtrack}></audio>
                        </>}
                </div>

                <Form.Select
                    onChange={e => {
                        setSoundtrack(e.target.value)
                        localStorage.setItem('soundtrack', e.target.value)
                        setPlaying(false)
                    }}
                    value={soundtrack || ''}
                >
                    {trackUrls.map((track, index) => (
                        <option key={index} value={track.value}>{track.label}</option>
                    ))}
                </Form.Select>
            </Form.Group >
        </div>
    )
}

export default SlideSettingsSondtrack