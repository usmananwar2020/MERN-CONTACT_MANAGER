import React, { useEffect, useState } from 'react'
import ComponentContainer from '../../components/container/componentContainer'
import { Delete, Edit, Visibility } from '@mui/icons-material';
import { backendCall } from '../../shared/backendServices';
import CustomePopup from '../../shared/popup';
import { handleToastMessage } from '../../shared/toastify';
import { useNavigate } from 'react-router-dom';
import CategoryTable from './categoryTable';

const Category = () => {
  const navigate = useNavigate();
  const [categories, setcategories] = useState([]);
  const [category, setCategory] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);

  useEffect(()=>{
    getCategories('');
  },[])

  const getCategories = (search) => {
    backendCall({
      url: `categories?search=${search}`,
      method: 'GET',
    }).then((res) => {
        if (res && !res.error) {
          setcategories(res.data)
        }
    });
  }

  const handleVerifyDelete = async () => {
    backendCall({
        url: `categories/${category?._id}`,
        method: 'DELETE',
    }).then((res) => {
        if (res && !res.error) {
            handleToastMessage('success', res?.message)
            setOpenDeletePopup(false);
            getCategories('');
        } else{
            handleToastMessage('error', res?.message)
            setOpenDeletePopup(false);
        }
    });
    
}
  const getCategoryDetail = (data) => {
    setCategory(data);
    setOpenPopup(true);
  }
  const onDelete = (row) => {
    setCategory(row)
    setOpenDeletePopup(true);
}

const handleSreach = (e) => {
  getCategories(e.target.value);
}

  const columns = [
    {
        title: (
            <div className="flex bg-primary py-3 pl-5 text-base -mr-[2px]">
                <span className="font-semibold text-white text-sm14">{"Category Type"}</span>
            </div>
        ),
        dataIndex: "ID",
        key: "ID",
        width: 80,
        render: (name, row) => (
                <span className="text-sm text-primary-dark pl-5 h-10 flex items-center gap-2 border-b border-primary-light -mr-[2px]">{row.category}</span>
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
            <Visibility onClick={() => getCategoryDetail(row)} className='cursor-pointer' />
            <Edit onClick={() => navigate(`addupdate/${row?._id}`)} className='cursor-pointer' />
            <Delete onClick={() => onDelete(row)} className='cursor-pointer' />
          </span>
        ),
    },
  ];
  return (
    <ComponentContainer>
      <div className='flex justify-between p-2'>
        <h3 className='text-primary-dark'>Category</h3>
        <button type="button" className="!font-bold uppercase border bg-primary-light text-primary-dark w-32 rounded-lg text-sm14 p-2" onClick={ ()=> navigate('addupdate')}>
            Add Category
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
        <CategoryTable
          columns={columns}
          data={categories}
        />
        <CustomePopup
          children={
            <div>
              <div className='px-6 flex justify-between flex-wrap gap-10'>
                  <div className='my-2 flex gap-3'>
                      <p className='text-primary-dark font-semibold'>Category Type:</p>
                      <p className='text-primary text-sm14 mt-2 sm:mt-1'>{category.category}</p>
                  </div>
              </div>
            </div>
          }
          className="!w-1/2 min-h-[40vh] !h-auto"
          Icon={<p className='text-24 text-primary-dark font-semibold'>Category Detail</p>}
          isShowButton={false}
          isShowIcon
          isOpen={openPopup}
          handleClose={() => setOpenPopup(false)}
          />
          <CustomePopup
            children={<p className='text-primary-dark'>Are you sure? Do you want to delete <p className='font-semibold'>{category.category}</p></p>}
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

export default Category