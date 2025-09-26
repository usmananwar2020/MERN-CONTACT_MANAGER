import { useEffect, useState } from 'react';
import ComponentContainer from '../../components/container/componentContainer'
import CustomTable from '../../shared/customTable'
import { backendCall } from '../../shared/backendServices';
import { formatedDate } from '../../shared/dateTimeFormater';

const Reminder = () => {
  const [reminder, setReminder] = useState([]);
  useEffect(() => {
    getCategories('');
  }, [])

  const getCategories = (search) => {
    backendCall({
      url: `reminder?search=${search}`,
      method: 'GET',
    }).then((res) => {
      if (res && !res.error) {
        setReminder(res.data)
      }
    });
  }

  const handleSreach = (e) => {
    getCategories(e.target.value);
  }

    const columns = [
      {
          title: (
              <div className="flex bg-primary py-3 pl-5 text-base -mr-[2px]">
                  <span className="font-semibold text-white text-sm14">{"Title"}</span>
              </div>
          ),
          dataIndex: "ID",
          key: "ID",
          width: 30,
          render: (name, row) => (
                  <span className="text-sm text-primary-dark pl-5 h-10 flex items-center gap-2 border-b border-primary-light -mr-[2px]">Hey {row?.userId?.username}, {row.title}</span>
          ),
      },
      {
          title: (
              <div className="flex bg-primary py-3 pl-5 text-base -mr-[2px] ">
                  <span className="font-semibold text-white text-sm14">{"Description"}</span>
              </div>
          ),
          dataIndex: "action",
          key: "action",
          width: 50,
          render: (name, row) => (
                  <span className="text-sm text-primary-dark pl-5 h-10 flex items-center gap-2 border-b border-primary-light -mr-[2px]">{row.description}</span>
          ),
      },
      {
          title: (
              <div className="flex bg-primary py-3 pl-5 text-base -mr-[2px] ">
                  <span className="font-semibold text-white text-sm14">{"Created Date"}</span>
              </div>
          ),
          dataIndex: "action",
          key: "action",
          width: 20,
          render: (name, row) => (
                  <span className="text-sm text-primary-dark pl-5 h-10 flex items-center gap-2 border-b border-primary-light -mr-[2px]">{formatedDate(row.createdAt)}</span>
          ),
      },
    ];

  return (
    <ComponentContainer>
      <div className='flex justify-between p-2'>
        <h3 className='text-primary-dark'>Reminder</h3>
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
        data={reminder}
      />
    </ComponentContainer>
  )
}

export default Reminder