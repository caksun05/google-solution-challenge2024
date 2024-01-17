import Breadcrumb from '../components/Breadcrumb';
import TableManagement from '../components/TableManagement';

const DataManagement = () => {
  return (
    <>
      <Breadcrumb pageName="Manajemen Data" />

      <div className="flex flex-col gap-10">
        <TableManagement />
      </div>
    </>
  );
};

export default DataManagement;
