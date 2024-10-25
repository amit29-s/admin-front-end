import { SendAsync } from '@/axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Add = () => {

    const router = useRouter();

    const initialRecords = {
        image: '',
        storeName: '',
        storeType: '',
        base_url: '',
        status: 'active',
    };
    const [values, setValues] = useState(initialRecords);

    const handleChange = (event: any) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const submitForm = async (event : any) => {
        event?.preventDefault();
        if(values.image && values.status && values.storeName && values.storeType) {
            const url = '/organization/createOrganization';
            try {     
                const res : any = await SendAsync<any>({
                    url,
                    method: 'POST',
                    data: values,
                });
                if(res) {
                    console.log(res,'adsklfjaslkdfjaslkdfjasldk')
                    router.push('/apps/stores/list');
                  }
            } catch (error) {
                console.log(error,'Error On Login Page');
                alert('Please Enter All the Required Fields');
                setValues(initialRecords);
            }
        } else {
            alert('Please Enter All the Required Fields');
        }
    };

    return (
        <div className="h-[80vh]">
            <hr className="my-6 border-white-light dark:border-[#1b2e4b]" />
            <form onSubmit={submitForm}>
                <div className="mt-8 px-4">
                    <div className="flex flex-col justify-between lg:flex-row">
                        <div className="mb-6 w-full lg:w-3/4 ltr:lg:mr-6 rtl:lg:ml-6">
                            <div className="text-lg font-semibold">Add Organization :-</div>
                            <div className="mt-4 flex items-center">
                                <label htmlFor="reciever-name" className="mb-0 w-1/3 ltr:mr-2 rtl:ml-2">
                                    Image Link
                                </label>
                                <input onChange={handleChange} id="reciever-name" type="text" name="image" className="form-input flex-1" placeholder="Enter Image Link" />
                            </div>
                            <div className="mt-4 flex items-center">
                                <label htmlFor="reciever-email" className="mb-0 w-1/3 ltr:mr-2 rtl:ml-2">
                                    Store Name
                                </label>
                                <input onChange={handleChange} id="reciever-email" type="text" name="storeName" className="form-input flex-1" placeholder="Enter Store Name" />
                            </div>
                            <div className="mt-4 flex items-center">
                                <label htmlFor="reciever-address" className="mb-0 w-1/3 ltr:mr-2 rtl:ml-2">
                                    Store Type
                                </label>
                                <input onChange={handleChange} id="reciever-address" type="text" name="storeType" className="form-input flex-1" placeholder="Enter Store Type" />
                            </div>
                            <div className="mt-4 flex items-center">
                                <label htmlFor="reciever-name" className="mb-0 w-1/3 ltr:mr-2 rtl:ml-2">
                                    Base URL
                                </label>
                                <input onChange={handleChange} id="reciever-name" type="text" name="base_url" className="form-input flex-1" placeholder="Enter Base URL" />
                            </div>
                            <div className="mt-4 flex items-center">
                                <label htmlFor="reciever-number" className="mb-0 w-1/3 ltr:mr-2 rtl:ml-2">
                                    Status
                                </label>

                                <select onChange={handleChange} name="status" id="Status" className="form-input flex-1">
                                    <option value={'active'}>Active</option>
                                    <option value={'inactive'}>InActive</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-success mt-5 w-full gap-2">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ltr:mr-2 rtl:ml-2">
                                    <path
                                        d="M3.46447 20.5355C4.92893 22 7.28595 22 12 22C16.714 22 19.0711 22 20.5355 20.5355C22 19.0711 22 16.714 22 12C22 11.6585 22 11.4878 21.9848 11.3142C21.9142 10.5049 21.586 9.71257 21.0637 9.09034C20.9516 8.95687 20.828 8.83317 20.5806 8.58578L15.4142 3.41944C15.1668 3.17206 15.0431 3.04835 14.9097 2.93631C14.2874 2.414 13.4951 2.08581 12.6858 2.01515C12.5122 2 12.3415 2 12 2C7.28595 2 4.92893 2 3.46447 3.46447C2 4.92893 2 7.28595 2 12C2 16.714 2 19.0711 3.46447 20.5355Z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                    />
                                    <path
                                        d="M17 22V21C17 19.1144 17 18.1716 16.4142 17.5858C15.8284 17 14.8856 17 13 17H11C9.11438 17 8.17157 17 7.58579 17.5858C7 18.1716 7 19.1144 7 21V22"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                    />
                                    <path opacity="0.5" d="M7 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Add;
