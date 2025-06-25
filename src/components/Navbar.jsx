import React from 'react'
import { Link } from 'react-router-dom';
const Navbar = () => {
    return (
        <nav className=" bg-slate-800 text-white ">
            <div className="mycontainer flex justify-around items-center ">

                <div className='logo font-bold text-2xl'>
                    <span className='text-green-700'> &lt; </span>
                    Pass
                    <span className='text-green-700'>OP/&gt; </span>
                </div>
                {/* <ul >
                    <li className="flex gap-4 ">
                        <a className="hover:font-bold" href="">Home</a>
                        <a className="hover:font-bold" href="">About Us</a>
                        <a className="hover:font-bold" href="">Contact Us</a>
                    </li>
                </ul> */}
                <button className='flex items-center font-bold hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer ring-white ring-1 rounded-full px-3'>
                    <img src="./icons/github.svg" alt="github logo" className='invert p-4 w-18 ' />
                    GitHub
                </button>

            </div>
        </nav>
    )
}

export default Navbar

