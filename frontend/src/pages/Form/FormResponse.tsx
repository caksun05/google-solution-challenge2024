import Breadcrumb from "../../components/Breadcrumb";
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../components/firebase/Config';
import { useNavigate } from 'react-router-dom';

const FormResponse = () => {

    const Navigate = useNavigate()

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            console.log("uid", uid)
            } else {
            // User is signed out
            Navigate('/signin')
            console.log("user is logged out")
            }
        });
    }, [])

    return (
        <>
            <div className="mx-auto max-w-270">
                
                <Breadcrumb pageName="Kirim Respon" />

                <div className="flex justify-center items-center">
                    <div className="w-1/2 2xsm:w-3/4 justify-self-center justify-center justify-items-center content-center items-center self-center rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Kirim Respon
                        </h3>
                        </div>
                        <form id="form-upload" action="#" method="post" encType="multipart/form-data">
                            <div className="p-6">
                                <div className="mb-5 flex flex-col gap-6">
                                    <div className="w-full">
                                        <label className="mb-2.5 block text-black dark:text-white" htmlFor="name">
                                        Nama Pengirim
                                        </label>
                                        <input
                                        type="text"
                                        id="filename"
                                        name="filename"
                                        placeholder="Masukkan nama file"
                                        className="w-full rounded border-2 border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    required/>
                                    </div>
                                </div>

                                <div className="mb-5">
                                <label className="mb-2.5 block text-black dark:text-white" htmlFor="description">
                                    Deskripsi
                                </label>
                                    <textarea
                                        rows={window.innerWidth < 764 ? 8 : 7}
                                        id="description"
                                        name="description"
                                        placeholder="Deskripsi file"
                                        className="w-full rounded border-2 border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                    required></textarea>
                                </div>

                                <div className="flex gap-4">
                                    <NavLink to="/data-response" className="flex w-1/2 justify-center rounded text-danger border hover:text-white hover:bg-danger focus:outline-none dark:focus:outline-none dark:hover:bg-danger p-3 font-medium">
                                        Cancel
                                    </NavLink>
                                    <button 
                                    onClick={() => Navigate('http://localhost:5000/data-response')}
                                    type="submit" 
                                    className="flex w-1/2 justify-center rounded bg-primary p-3 font-medium text-gray">
                                        Kirim
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FormResponse;