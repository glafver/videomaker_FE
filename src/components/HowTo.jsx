import React from 'react'

const HowTo = () => {
    return (
        <div className='how-to'>
            <p className='h1'>How to use Videomaker?</p>
            <div className='d-flex justify-content-around align-items-center how-to-instruction'>
                <img src={'/images/videomaker.png'} alt="" />
                <ol>
                    <li>Download your photos</li>
                    <li>Choose duration for every slide</li>
                    <li>Change the order of slides if needed</li>
                    <li>Add transition to every slide if you want</li>
                    <li>Press the button and just wait until your video is ready</li>
                    <li>Download video on your device</li>
                </ol>
            </div>
        </div>
    )
}

export default HowTo