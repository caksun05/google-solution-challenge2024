import Breadcrumb from "../../components/Breadcrumb";
import { NavLink } from 'react-router-dom';

const FormUpload = () => {
    return (
        <>
            <Breadcrumb pageName="Data Management / Upload File" />

        <div className="flex justify-center items-center h-full">
            <div className="w-1/2 justify-self-center justify-center justify-items-center content-center items-center self-center rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                    Form Upload File
                </h3>
                </div>
                <form id="form-upload" action="#" method="#">
                    <div className="p-6.5">
                        <div className="mb-4.5 flex flex-col gap-6">
                            <div className="w-full">
                                <label className="mb-2.5 block text-black dark:text-white">
                                Nama
                                </label>
                                <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Masukkan nama file"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            required/>
                            </div>
                        </div>

                        <div className="mb-6">
                        <label className="mb-2.5 block text-black dark:text-white">
                            Deskripsi
                        </label>
                            <textarea
                                rows={2}
                                id="description"
                                name="description"
                                placeholder="Deskripsi file"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                            required></textarea>
                        </div>

                        <div className="mb-6">
                            <label className="mb-3 block text-black dark:text-white">
                            Tambah File
                            </label>
                            <input
                                type="file"
                                id="file"
                                name="file"
                                className="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2.5 file:text-sm file:font-medium focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
                            required/>
                        </div>

                        <div className="flex gap-4">
                            <NavLink to="/data-management" className="flex w-1/2 justify-center rounded text-danger border hover:text-white hover:bg-danger focus:outline-none dark:focus:outline-none dark:hover:bg-danger p-3 font-medium">
                                Cancel
                            </NavLink>
                            <button type="submit" className="flex w-1/2 justify-center rounded bg-primary p-3 font-medium text-gray">
                                Upload
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        </>
    );
}

export default FormUpload;