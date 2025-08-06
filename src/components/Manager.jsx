import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { FaCopy } from "react-icons/fa";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef()
    const PasswordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([]) //obj inside a array

    useEffect(() => {
        const storedPasswords = localStorage.getItem('passwords');
        if (storedPasswords) {
            // console.log(JSON.parse(storedPasswords));
            setPasswordArray(JSON.parse(storedPasswords));
        }
        else {
            setPasswordArray([]);
        }
    }, []);

    const savepassword = () => {
        if (form.site.length <= 3 || form.username.length <= 3 || form.password.length <= 3) {
            toast.error('🦄 Please fill all fields with valid data!', {});
            return;
        }
        localStorage.setItem('passwords', JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])); //needs time to update the state ,so we wrote this 
        setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]); //we are adding a unique id to each password object
        // console.log(passwordArray);// try this , this will show old value as it needs time to update
        // console.log([...passwordArray, form]);
        setform({ site: "", username: "", password: "" }); //reset the form 
        toast('🦄 Password Saved!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
    }

    const deletepassword = (id) => {
        let c = confirm("Are You Sure you want to delete this password?");
        if (!c) return;
        const updatedpasswords = passwordArray.filter((item) => item.id !== id);
        setPasswordArray(updatedpasswords);
        localStorage.setItem('passwords', JSON.stringify(updatedpasswords));
        toast('🦄 Password Deleted!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
    }

    const editpassword = (id) => {
        setform(passwordArray.find((item) => item.id === id));
        const updatedpasswords = passwordArray.filter((item) => item.id !== id);
        setPasswordArray(updatedpasswords);
    }

    const handelChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    }
    const showPassword = () => {

        if (ref.current.src.includes("icons/eyecross.png")) {
            {
                ref.current.src = 'icons/eye.png';
                PasswordRef.current.type = "text";
            }
        } else {
            ref.current.src = 'icons/eyecross.png';
            PasswordRef.current.type = "password";
        }
    }
    const copyText = (text) => {
        toast('🦄 Copied to Clipboard!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
        navigator.clipboard.writeText(text)
    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce} />

            <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
            </div>
            <div className="p-2 md:p-0 md:mycontainer min-h-[75vh] bg-slate-700 w-full">
                <div className='flex flex-col items-center'>
                    <div className='logo font-bold text-2xl'>
                        <span className='text-green-700'> &lt; </span>
                        Pass
                        <span className='text-green-700'>OP/&gt; </span>
                    </div>
                    <p className='text-2xl'>Your own password Manager</p>
                </div>
                <div className="text-white flex items-center flex-col p-4 gap-6 ">
                    <input onChange={handelChange} value={form.site} placeholder='Enter Website URL' className='border border-emerald-200 w-full rounded-full px-4 py-1' type="text" name="site" />
                    <div className=" mt-3 justify-between w-full gap-8 flex flex-col md:flex-row ">
                        <input onChange={handelChange} value={form.username} placeholder='Enter Username' className='border border-emerald-200 w-full rounded-full px-4 py-1' type="text" name="username" />

                        <div className='relative'>
                            <input ref={PasswordRef} onChange={handelChange} value={form.password} type='password' placeholder='Enter Password' className='border border-emerald-200 w-full rounded-full px-4 py-1' name="password" />
                            <span onClick={() => {
                                showPassword();
                            }} className=' absolute right-[5px] top-[3px] cursor-pointer'>
                                <img ref={ref} src="./icons/eyecross.png" alt="" className='w-7 ' />
                            </span>
                        </div>

                    </div>
                    <button onClick={savepassword} className='flex justify-center items-center bg-green-400 text-black rounded-full px-2 py-2 w-fit border-2 border-black hover:border-emerald-900 '>
                        <lord-icon
                            src="https://cdn.lordicon.com/sbnjyzil.json"
                            trigger="hover">
                        </lord-icon>
                        Save Password
                    </button>
                </div>
                <div className="passwords m-3">
                    <h2 className='text-2xl font-bold'>Yours Passwords</h2>
                    <div className="overflow-x-auto mt-6">
                        <table className="bg-green-100 min-w-full divide-y rounded-lg">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs text-white bg-green-900 uppercase tracking-wider font-bold">Website</th>
                                    <th className="px-6 py-3 text-left text-xs text-white bg-green-900 uppercase tracking-wider font-bold">Username</th>
                                    <th className="px-6 py-3 text-left text-xs text-white bg-green-900 uppercase tracking-wider font-bold">Password</th>
                                    <th className="px-6 py-3 text-left text-xs text-white bg-green-900 uppercase tracking-wider font-bold">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {passwordArray.length === 0 ? (
                                    <tr>
                                        <td colSpan={3} className="px-6 py-4 text-center text-gray-400">No passwords saved.</td>
                                    </tr>
                                ) : (
                                    passwordArray.map((item, idx) => (
                                        <tr key={idx}>
                                            <td className="px-6 py-4 whitespace-nowrap ">
                                                <div className='flex items-center justify-center gap-2'>
                                                    <a href={item.site} target='_blank' className=" hover:underline">{item.site}</a>
                                                    <FaCopy className='cursor-pointer w-5' onClick={() => {
                                                        copyText(item.site);
                                                    }} />
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap ">
                                                <div className='flex items-center justify-center gap-2'>{item.username}
                                                    <FaCopy className='cursor-pointer w-5' onClick={() => {
                                                        copyText(item.username);
                                                    }} />
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className='flex items-center justify-center gap-2 '>
                                                   {"•".repeat(item.password.length)}
                                                    <FaCopy className='cursor-pointer w-5' onClick={() => {
                                                        copyText(item.password);
                                                    }} />
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className='flex items-center gap-2'>
                                                    <span >
                                                        <lord-icon className='cursor-pointer w-6 h-6'
                                                            src="https://cdn.lordicon.com/vwzukuhn.json"
                                                            trigger="hover"
                                                            onclick={() => {
                                                                editpassword(item.id);
                                                            }}>
                                                        </lord-icon>
                                                    </span>
                                                    <span >
                                                        <lord-icon className='cursor-pointer w-6 h-6'
                                                            src="https://cdn.lordicon.com/xyfswyxf.json"
                                                            trigger="hover"
                                                            onclick={() => {
                                                                deletepassword(item.id);
                                                            }}>

                                                        </lord-icon>
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Manager
//form var is the main thing which is visible on th screen 