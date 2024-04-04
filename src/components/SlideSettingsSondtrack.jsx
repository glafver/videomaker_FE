import React, { useState, useEffect, useRef } from 'react';
import { Form } from 'react-bootstrap';
import { PlayCircle, PauseCircle } from 'react-bootstrap-icons';
import { trackUrls } from '../helpers/data.js';

const SlideSettingsSondtrack = () => {

    const [soundtrack, setSoundtrack] = useState('none');
    const [playing, setPlaying] = useState(false);

    const audio = useRef(null);

    const playsoundtrack = (control) => {
        if (control === "play") {
            audio.current.play();
            setPlaying(true);
        } else if (control === "pause") {
            audio.current.pause();
            setPlaying(false);
        }
    };

    useEffect(() => {
        setSoundtrack(localStorage.getItem('soundtrack'));
    }, []);


    return (
        <div className='soundtrack-wrapper'>
            <Form.Group controlId="soundtrack">
                <div className='d-flex align-items-center'>
                    <Form.Label>Soundtrack:</Form.Label>
                    {(soundtrack && soundtrack !== 'none') &&
                        <>
                            {playing ? (
                                <PauseCircle className="controlsIcon" onClick={() => { playsoundtrack('pause'); }} style={{ cursor: 'pointer', marginLeft: '15px', marginBottom: '6px' }} />
                            ) : (
                                <PlayCircle className="controlsIcon" onClick={() => { playsoundtrack('play'); }} style={{ cursor: 'pointer', marginLeft: '15px', marginBottom: '6px' }} />
                            )}
                            <audio ref={audio} src={soundtrack}></audio>
                        </>}
                </div>

                <Form.Select
                    onChange={e => {
                        setSoundtrack(e.target.value);
                        localStorage.setItem('soundtrack', e.target.value);
                        setPlaying(false);
                    }}
                    value={soundtrack || ''}
                >
                    {trackUrls.map((track, index) => (
                        <option key={index} value={track.value}>{track.label}</option>
                    ))}
                </Form.Select>
            </Form.Group >
        </div>
    );
};

export default SlideSettingsSondtrack;