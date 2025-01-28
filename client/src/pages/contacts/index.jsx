import React, { useEffect, useState } from 'react'
import ComponentContainer from '../../components/container/componentContainer'
import { Delete, Edit, Visibility } from '@mui/icons-material';
import ContactTable from './contactTable'
import { backendCall } from '../../shared/backendServices';
import CustomePopup from '../../shared/popup';
import { handleToastMessage } from '../../shared/toastify';
import { useNavigate } from 'react-router-dom';
import { GetStorage } from '../../shared/guards/credentialsService';

const Contacts = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [contact, setContact] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [userData, setUserData] = useState({})

  useEffect(()=>{
    getContacts('');
  },[])

  const getContacts = (search) => {
    backendCall({
      url: `contacts?search=${search}&page=1&limit=10`,
      method: 'GET',
    }).then((res) => {
        if (res && !res.error) {
          setContacts(res.data)
        }
    });
  }
  const getContactDetail = async (data) => {
    const storageData = await GetStorage();
    setUserData(storageData);
    if(!storageData?.isAdmin){
      setContact(data);
      setOpenPopup(true);
    }else{
        backendCall({
          url: `contacts/${data?._id}`,
          method: 'GET',
        }).then((res) => {
            if (res && !res.error) {
              setContact(res.data[0])
              setOpenPopup(true);
            }else{
              handleToastMessage('error', 'Something went wrong.')
            }
        });
    }
  }
  const handleVerifyDelete = async () => {
    backendCall({
        url: `contacts/${contact?._id}`,
        method: 'DELETE',
    }).then((res) => {
        if (res && !res.error) {
            handleToastMessage('success', res?.message)
            setOpenDeletePopup(false);
            getContacts('');
        } else{
            handleToastMessage('error', res?.message)
            setOpenDeletePopup(false);
        }
    });
    
}
  const onDelete = (row) => {
    setContact(row)
    setOpenDeletePopup(true);
}

const handleSreach = (e) => {
  getContacts(e.target.value);
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
                <span className="text-sm text-primary-dark pl-5 h-10 flex items-center gap-2 border-b border-primary-light -mr-[2px]">{row.firstname+' '+row.lastname}</span>
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
        width: 10,
        render: (name, row) => (
          <span className="text-sm text-primary-dark pl-5 h-10 flex items-center gap-2 border-b border-primary-light -mr-[2px]">
            <Visibility onClick={() => getContactDetail(row)} className='cursor-pointer' />
            <Edit onClick={() => navigate(`addupdate/${row?._id}`)} className='cursor-pointer' />
            <Delete onClick={() => onDelete(row)} className='cursor-pointer' />
          </span>
        ),
    },
  ];
  return (
    <ComponentContainer>
      <div className='flex justify-between p-2'>
        <h3 className='text-primary-dark'>Contact Manager</h3>
        <button type="button" className="!font-bold uppercase border bg-primary-light text-primary-dark w-32 rounded-lg text-sm14 p-2" onClick={ ()=> navigate('addupdate')}>
            Add Contact
        </button>
      </div>
        <div className='bg-primary-light p-1 rounded-md my-2'>
          <input
            className='border px-2 w-full rounded-md'
            placeholder='Search...'
            type={'text'}
            onChange={handleSreach}
          />
        </div>
        <ContactTable
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
                      <p className='text-primary text-sm14 mt-2 sm:mt-1'>{contact.firstname+' '+contact.lastname}</p>
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
              <hr className='bg-primary h-[2px]'/>
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
          <CustomePopup
            children={<p className='text-primary-dark'>Are you sure? Do you want to delete <p className='font-semibold'>{contact?.firstname} {contact?.lastname}</p></p>}
            Icon={<Delete className='text-primary-dark !w-16 !h-16'/>}
            isShowButton
            isShowIcon
            isOpen={openDeletePopup}
            handleSubmit={handleVerifyDelete}
            handleClose={() => setOpenDeletePopup(false)}
          />
    </ComponentContainer>
  )
}

export default Contacts