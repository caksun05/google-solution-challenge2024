import Breadcrumb from '../components/Breadcrumb';
import TableThree from '../components/TableManagement';

const DataManagement = () => {
  return (
    <>
      <Breadcrumb pageName="Manajemen Data" />

      <div className="flex flex-col gap-10">
        <TableThree />
      </div>
    </>
  );
};

export default DataManagement;
