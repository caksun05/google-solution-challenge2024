import Breadcrumb from '../components/Breadcrumb';
import AnswerTable from '../components/AnswerTable';
import { useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../components/firebase/Config';
import { useNavigate } from 'react-router-dom';

const DataResponse = () => {

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
        <Breadcrumb pageName="Data Respon " />

        <div className="flex flex-col gap-10">
            <AnswerTable />
        </div>
        </>
    );
};

export default DataResponse;
