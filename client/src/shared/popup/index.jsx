
import * as React from 'react';
import Modal from '@mui/material/Modal';
import { Cancel, Delete } from '@mui/icons-material'
import { Spinner } from '../spinner/spinner';

const CustomePopup = ({children, Icon ,className, isOpen=false, isShowButton, isShowIcon, isLoading, handleSubmit, handleClose}) => {

    
      return (
        <div >
          <Modal
            open={isOpen}
            className='flex justify-center items-center'
          >
            <div className={`w-[30rem] sm:w-[20rem] h-72 sm:h-96 bg-[#caf9d8] rounded-large flex flex-col outline-none ${className}`}>
                <div className='flex justify-end p-2 text-primary-dark'><Cancel onClick={handleClose} className='cursor-pointer'/></div>
                <div className='flex flex-col gap-7 items-center h-full my-5'>
                    {isShowIcon ? Icon : null}
                    {children}
                    {isShowButton ? 
                    <div className='flex justify-center gap-3'>
                    <button type="button"  className="bg-primary-light text-primary-dark lg:!px-5 !py-3 !font-bold uppercase" onClick={handleClose}>
                        <p className='flex gap-3'>
                            Cancel
                        </p>
                    </button>
                    <button type="button" onClick={handleSubmit}  className="bg-primary-light text-primary-dark lg:!px-5 !py-3 !font-bold uppercase" >
                        <p className='flex gap-3'>
                        <Spinner isLoading={isLoading} />
                            Submit
                        </p>
                    </button>
                    </div> : null}
                </div>
            </div>
          </Modal>
        </div>
  )
}

export default CustomePopup