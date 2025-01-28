import Table from 'rc-table';
import { Spinner } from '../../shared/spinner/spinner';
const ContactTable = ({columns, data}) => {
    
  return (
    <div>
        <Table 
         style={{ width: '100%' }}
          emptyText={
            <div className='flex justify-center text-primary-dark my-10'>
              {
                data?.length === 0 ?
                'No data found':
                <Spinner isLoading size="small" />
              }
            </div>
          }
          sticky
          // className="matrix"
          scroll={{ x: 100 }}
          columns={columns} 
          data={data}
          className='overflow-x-hidden'
        />
    </div>
  )
}

export default ContactTable