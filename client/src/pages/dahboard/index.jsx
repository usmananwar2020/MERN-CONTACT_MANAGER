import React from 'react'
import { backendCall } from '../../shared/backendServices';
import { useState } from 'react';
import { useEffect } from 'react';
import ComponentContainer from '../../components/container/componentContainer';
import ContactTable from '../contacts/contactTable';
import { GetStorage, SetStorage } from '../../shared/guards/credentialsService';
import { handleToastMessage } from '../../shared/toastify';

const Dashboard = () => {
    const [tabs, setTabs] = useState(['contacts', 'reminders'])
    const storageData = GetStorage();
    const [stats, setStats] = useState()
    const [tableData, setTableData] = useState([])
    const [selectedTab, setSelectedTab] = useState('contacts')
    const [isReminder, setIsReminder] = useState(false);
    useEffect(() => {
        if (storageData?.isAdmin) {
            setTabs([...tabs, 'users'])
        }
        setIsReminder(storageData?.reminder)
    }, [])
    useEffect(() => {
        getStates(selectedTab);
    }, [])

    const getStates = (tab) => {
        setSelectedTab(tab);
        backendCall({
            url: `dashboard-stats?type=${tab}`,
            method: 'GET',
        }).then((res) => {
            if (res && !res.error) {
                setStats(res.data)
                setTableData(res.data?.stats)
            }
        });
    }
    const enableDisableReminder = (data) => {
        backendCall({
            url: `reminder/status/${data?._id}`,
            method: 'PUT',
            data: { status: !data?.reminder }
        }).then((res) => {
            if (res && !res.error) {
                SetStorage({ ...storageData, reminder: !data?.reminder });
                setIsReminder(!data?.reminder)
                handleToastMessage('success', res?.message)
            } else {
                handleToastMessage('error', res?.message)
            }
        });
    }
    const userColumns = [
        {
            title: (
                <div className="flex bg-primary py-3 pl-5 text-base -mr-[2px]">
                    <span className="font-semibold text-white text-sm14">{"User Name"}</span>
                </div>
            ),
            dataIndex: "ID",
            key: "ID",
            width: 20,
            render: (name, row) => (
                <span className="text-sm text-primary-dark pl-5 h-10 flex items-center gap-2 border-b border-primary-light -mr-[2px]">{row.username}</span>
            ),
        },
        {
            title: (
                <div className="flex bg-primary py-3 pl-5 text-base -mr-[2px]">
                    <span className="font-semibold text-white text-sm14">{"Email"}</span>
                </div>
            ),
            dataIndex: "ID",
            key: "ID",
            width: 20,
            render: (name, row) => (
                <span className="text-sm text-primary-dark pl-5 h-10 flex items-center gap-2 border-b border-primary-light -mr-[2px]">{row.email}</span>
            ),
        }
    ];
    const contactColumns = [
        {
            title: (
                <div className="flex bg-primary py-3 pl-5 text-base -mr-[2px]">
                    <span className="font-semibold text-white text-sm14">{"User Name"}</span>
                </div>
            ),
            dataIndex: "ID",
            key: "ID",
            width: 20,
            render: (name, row) => (
                <span className="text-sm text-primary-dark pl-5 h-10 flex items-center gap-2 border-b border-primary-light -mr-[2px]">{row.firstname + ' ' + row.lastname}</span>
            ),
        },
        {
            title: (
                <div className="flex bg-primary py-3 pl-5 text-base -mr-[2px]">
                    <span className="font-semibold text-white text-sm14">{"Phone"}</span>
                </div>
            ),
            dataIndex: "ID",
            key: "ID",
            width: 20,
            render: (name, row) => (
                <span className="text-sm text-primary-dark pl-5 h-10 flex items-center gap-2 border-b border-primary-light -mr-[2px]">{row.phone}</span>
            ),
        },
        {
            title: (
                <div className="flex bg-primary py-3 pl-5 text-base -mr-[2px]">
                    <span className="font-semibold text-white text-sm14">{"Address"}</span>
                </div>
            ),
            dataIndex: "ID",
            key: "ID",
            width: 20,
            render: (name, row) => (
                <span className="text-sm text-primary-dark pl-5 h-10 flex items-center gap-2 border-b border-primary-light -mr-[2px]">{row.address}</span>
            ),
        }
    ];
    const reminderColumns = [
        {
            title: (
                <div className="flex bg-primary py-3 pl-5 text-base -mr-[2px]">
                    <span className="font-semibold text-white text-sm14">{"Title"}</span>
                </div>
            ),
            dataIndex: "ID",
            key: "ID",
            width: 20,
            render: (name, row) => (
                <span className="text-sm text-primary-dark pl-5 h-10 flex items-center gap-2 border-b border-primary-light -mr-[2px]">{row.title}</span>
            ),
        },
        {
            title: (
                <div className="flex bg-primary py-3 pl-5 text-base -mr-[2px]">
                    <span className="font-semibold text-white text-sm14">{"Description"}</span>
                </div>
            ),
            dataIndex: "ID",
            key: "ID",
            width: 20,
            render: (name, row) => (
                <span className="text-sm text-primary-dark pl-5 h-10 flex items-center gap-2 border-b border-primary-light -mr-[2px]">{row.description}</span>
            ),
        }
    ];
    return (
        <ComponentContainer>
            <div className='flex gap-4 w-full justify-around p-4'>
                {
                    tabs.map((tab) =>
                        <div className='flex-1 border-2 border-primary rounded-lg py-4 text-center capitalize cursor-pointer' onClick={() => getStates(tab)}>
                            <p className='text-primary font-semibold text-xl'>{tab}</p>
                            <p className='text-primary font-semibold text-xl'>{tab === 'users' ? stats?.totalUser : tab === 'contacts' ? stats?.totalContact : tab === 'reminders' ? stats?.totalReminder : null}</p>
                        </div>
                    )
                }
            </div>
            <div className='flex gap-5 items-center'>
                <p className='text-2xl font-bold capitalize p-4 text-primary'>{selectedTab}</p>
                {
                    selectedTab === 'reminders' ?
                        <input type="checkbox" checked={isReminder} className='cursor-pointer w-5 h-5' onClick={() => enableDisableReminder(storageData)} /> : null
                }
            </div>

            <ContactTable
                columns={selectedTab === 'users' ? userColumns : selectedTab === 'contacts' ? contactColumns : selectedTab === 'reminders' ? reminderColumns : reminderColumns}
                data={tableData}
            />
        </ComponentContainer>
    )
}

export default Dashboard