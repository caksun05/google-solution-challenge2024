import CardFour from '../../components/CardFour.tsx';
import CardOne from '../../components/CardOne.tsx';
import CardTwo from '../../components/CardTwo.tsx';
import CardThree from '../../components/CardThree.tsx';
import ChartTwo from '../../components/ChartTwo.tsx';
import { useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../components/firebase/Config';
import { useNavigate } from 'react-router-dom';
import { db } from '../../components/firebase/Config';
import { collection, doc, getDoc, getDocs } from "firebase/firestore";


const Dashboard = () => {

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardOne />
        <CardTwo />
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
