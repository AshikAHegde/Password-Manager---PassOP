import React from 'react'

const Footer = () => {
    return (
        <div className=' bottom-0 w-full flex flex-col items-center justify-center bg-slate-800 p-4 text-center text-sm text-white'>
            <div className='text-gray-500 flex flex-col items-center '>
                <div className='logo font-bold text-2xl'>
                    <span className='text-green-700'> &lt; </span>
                    Pass
                    <span className='text-green-700'>OP/&gt; </span>
                </div>
            </div>

            <div className='text-white flex gap-2 h-13 items-center'>
                Created with <img src="./icons/heart.png" className='w-6 h-6' alt="" /> by Ashik
            </div>
        </div>
    )
}

export default Footer