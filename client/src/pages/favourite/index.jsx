import React, { useEffect, useState } from 'react'
import { Delete, Edit, Visibility } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import CustomTable from '../../shared/customTable';
import { backendCall } from '../../shared/backendServices';
import ComponentContainer from '../../components/container/componentContainer';
import CustomePopup from '../../shared/popup';
import { GetStorage } from '../../shared/guards/credentialsService';

const Favourite = () => {
  const [contact, setContact] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [userData, setUserData] = useState({})

  useEffect(() => {
    getContacts('');
  }, [])

  const getContacts = (search) => {
    backendCall({
      url: `contacts/favorites?search=${search}&page=1&limit=10`,
      method: 'GET',
    }).then((res) => {
      if (res && !res.error) {
        setContacts(res.data)
      }
    });
  }
  const handleSreach = (e) => {
    getContacts(e.target.value);
  }
  const getContactDetail = async (data) => {
    const storageData = await GetStorage();
    setUserData(storageData);
    if (!storageData?.isAdmin) {
      setContact(data);
      setOpenPopup(true);
    } else {
      backendCall({
        url: `contacts/${data?._id}`,
        method: 'GET',
      }).then((res) => {
        if (res && !res.error) {
          setContact(res.data[0])
          setOpenPopup(true);
        } else {
          handleToastMessage('error', 'Something went wrong.')
        }
      });
    }
  }
  const columns = [
    {
      title: (
        <div className="flex bg-primary py-3 pl-5 text-base -mr-[2px]">
          <span className="font-semibold text-white text-sm14">{"Name"}</span>
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
          <span className="font-semibold text-white text-sm14">{"Category"}</span>
        </div>
      ),
      dataIndex: "ID",
      key: "ID",
      width: 20,
      render: (name, row) => (
        <span className="text-sm text-primary-dark pl-5 h-10 flex items-center gap-2 border-b border-primary-light -mr-[2px]">{row.category}</span>
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
        <div className="flex bg-primary py-3 pl-5 text-base -mr-[2px] ">
          <span className="font-semibold text-white text-sm14">{"Action"}</span>
        </div>
      ),
      dataIndex: "action",
      key: "action",
      width: 15,
      render: (name, row) => (
        <span className="text-sm text-primary-dark pl-5 h-10 flex items-center gap-2 border-b border-primary-light -mr-[2px]">
          <Visibility onClick={() => getContactDetail(row)} className='cursor-pointer' />
        </span>
      ),
    },
  ];
  return (
    <ComponentContainer>
      <div className='flex justify-between p-2'>
        <h3 className='text-primary-dark'>Favourite Contact</h3>
      </div>
      <div className='bg-primary-light p-1 rounded-md my-2'>
        <input
          className='border px-2 w-full rounded-md'
          placeholder='Search...'
          type={'text'}
          onChange={handleSreach}
        />
      </div>
      <CustomTable
        columns={columns}
        data={contacts}
      />
      <CustomePopup
        children={
          <div>
            <div className='px-6 flex justify-between flex-wrap gap-10'>
              <div className='my-2'>
                <div className='flex gap-3'>
                  <p className='text-primary-dark font-semibold'>Full Name</p>
                </div>
                <p className='text-primary text-sm14 mt-2 sm:mt-1'>{contact.firstname + ' ' + contact.lastname}</p>
              </div>
              <div className='my-2'>
                <div className='flex gap-3'>
                  <p className='text-primary-dark font-semibold'>Category</p>
                </div>
                <p className='text-primary text-sm14 mt-2 sm:mt-1'>{contact?.category}</p>
              </div>
              <div className='my-2'>
                <div className='flex gap-3'>
                  <p className='text-primary-dark font-semibold'>Mobile Number</p>
                </div>
                <p className='text-primary text-sm14 mt-2 sm:mt-1'>{contact?.phone}</p>
              </div>
              <div className='my-2'>
                <div className='flex gap-3'>
                  <p className='text-primary-dark font-semibold'>Email Address</p>
                </div>
                <p className='text-primary text-sm14 mt-2 sm:mt-1'>{contact?.email}</p>
              </div>
              <div className='my-2'>
                <div className='flex gap-3'>
                  <p className='text-primary-dark font-semibold'>Address</p>
                </div>
                <p className='text-primary text-sm14 mt-2 sm:mt-1'>{contact?.address}</p>
              </div>
              <div className='my-2'>
                <div className='flex gap-3'>
                  <p className='text-primary-dark font-semibold'>Note</p>
                </div>
                <p className='text-primary text-sm14 mt-2 sm:mt-1'>{contact?.note}</p>
              </div>
            </div>
            {userData.isAdmin ?
              <div className='px-6 py-3'>
                <hr className='bg-primary h-[2px]' />
                <p className='text-24 text-center text-primary-dark font-semibold'>User Detail</p>
                <div className=' flex justify-between flex-wrap gap-10'>
                  <div className='my-2'>
                    <div className='flex gap-3'>
                      <p className='text-primary-dark font-semibold'>Full Name</p>
                    </div>
                    <p className='text-primary text-sm14 mt-2 sm:mt-1'>{contact.userId?.username}</p>
                  </div>

                  <div className='my-2'>
                    <div className='flex gap-3'>
                      <p className='text-primary-dark font-semibold'>Email Address</p>
                    </div>
                    <p className='text-primary text-sm14 mt-2 sm:mt-1'>{contact?.userId?.email}</p>
                  </div>
                </div>
              </div> : null}
          </div>
        }
        className="!w-1/2 min-h-[40vh] !h-auto"
        Icon={<p className='text-24 text-primary-dark font-semibold'>Contact Detail</p>}
        isShowButton={false}
        isShowIcon
        isOpen={openPopup}
        handleClose={() => setOpenPopup(false)}
      />

    </ComponentContainer>
  )
}

export default Favourite