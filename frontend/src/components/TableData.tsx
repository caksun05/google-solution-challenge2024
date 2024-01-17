import React from "react";
import DataTable from "react-data-table-component";

const TableData = () => {

    interface RowData {
        id: number;
        name: string;
        description: string;
        date: string;
        size: number;
    }

    const columns = [
        {
            name: 'No',
            dataIndex: 'id',
            key: 'id',
            selector: (row:RowData) => row.id
        },
        {
            name: 'Nama',
            dataIndex: 'name',
            key: 'name',
            selector: (row:RowData) => row.name
        },
        {
            name: 'Deskripsi',
            dataIndex: 'description',
            key: 'description',
            selector: (row:RowData) => row.description
        },
        {
            name: 'Tanggal',
            dataIndex: 'date',
            key: 'date',
            selector: (row:RowData) => row.date
        },
        {
            name: 'Ukuran',
            dataIndex: 'size',
            key: 'size',
            selector: (row:RowData) => row.size
        }
    ];
    
    const data = [
        {
            id: 1,
            name: 'UU 2009 22',
            description: 'Peraturan UU Tahun 2009 Nomor 22',
            date: '2009-01-01',
            size: 12,
        },
        {
            id: 2,
            name: 'UU 2009 23',
            description: 'Peraturan UU Tahun 2009 Nomor 23',
            date: '2009-01-01',
            size: 12,
        },
        {
            id: 3,
            name: 'UU 2009 24',
            description: 'Peraturan UU Tahun 2009 Nomor 24',
            date: '2009-01-01',
            size: 12,
        },
        {
            id: 4,
            name: 'UU 2009 25',
            description: 'Peraturan UU Tahun 2009 Nomor 25',
            date: '2009-01-01',
            size: 12,
        },
        {
            id: 5,
            name: 'UU 2009 26',
            description: 'Peraturan UU Tahun 2009 Nomor 26',
            date: '2009-01-01',
            size: 12,
        },
        {
            id: 6,
            name: 'UU 2009 27',
            description: 'Peraturan UU Tahun 2009 Nomor 27',
            date: '2009-01-01',
            size: 12,
        },
        {
            id: 7,
            name: 'UU 2009 28',
            description: 'Peraturan UU Tahun 2009 Nomor 28',
            date: '2009-01-01',
            size: 12,
        },
        {
            id: 8,
            name: 'UU 2009 29',
            description: 'Peraturan UU Tahun 2009 Nomor 29',
            date: '2009-01-01',
            size: 12,
        },
        {
            id: 9,
            name: 'UU 2009 30',
            description: 'Peraturan UU Tahun 2009 Nomor 30',
            date: '2009-01-01',
            size: 12,
        },
    ];

    return (
        <div className="text-black">
            <DataTable
                className="w-full table-auto"
                columns={columns}
                data={data}
            ></DataTable>
        </div>
    ); 
}

export default TableData;