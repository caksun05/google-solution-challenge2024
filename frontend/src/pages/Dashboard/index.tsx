import CardFour from '../../components/CardFour.tsx';
import CardOne from '../../components/CardOne.tsx';
import CardThree from '../../components/CardThree.tsx';
import ChartTwo from '../../components/ChartTwo.tsx';
import { useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../components/firebase/Config';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        <CardOne />
        <CardThree />
        <CardFour />
      </div>

      <div className="mt-4">
        <ChartTwo />
      </div>
    </>
  );
};

export default Dashboard;
