import Link from 'next/link';
import { Tab } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import CodeHighlight from '@/components/Highlight';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '@/store/themeConfigSlice';

const Tabs = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Tabs'));
    });
    const [codeArr, setCodeArr] = useState<string[]>([]);
    const toggleCode = (name: string) => {
        if (codeArr.includes(name)) {
            setCodeArr((value) => value.filter((d) => d !== name));
        } else {
            setCodeArr([...codeArr, name]);
        }
    };

    return (
        <div>
            <div className="space-y-8 pt-5">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-1 h-[85vh]">
                    {/* Simple Tabs */}
                    <div className="panel" id="simple">
                        <div className="mb-5 flex items-center justify-between">
                            <h5 className="text-lg font-semibold dark:text-white-light">Simple Tabs</h5>
                            
                        </div>
                        <div className="mb-5">
                            <Tab.Group>
                                <Tab.List className="mt-3 flex flex-wrap border-b border-white-light dark:border-[#191e3a]">
                                    <Tab as={Fragment}>
                                        {({ selected }) => (
                                            <button
                                                className={`${
                                                    selected ? '!border-white-light !border-b-white  text-primary !outline-none dark:!border-[#191e3a] dark:!border-b-black ' : ''
                                                } -mb-[1px] block border border-transparent p-3.5 py-2 hover:text-primary dark:hover:border-b-black`}
                                            >
                                                Features
                                            </button>
                                        )}
                                    </Tab>
                                    <Tab as={Fragment}>
                                        {({ selected }) => (
                                            <button
                                                className={`${
                                                    selected ? '!border-white-light !border-b-white  text-primary !outline-none dark:!border-[#191e3a] dark:!border-b-black ' : ''
                                                } -mb-[1px] block border border-transparent p-3.5 py-2 hover:text-primary dark:hover:border-b-black`}
                                            >
                                                Members
                                            </button>
                                        )}
                                    </Tab>
                                   
                                </Tab.List>
                                <Tab.Panels>
                                    <Tab.Panel>
                                        <div className="active pt-5">
                                            <h4 className="mb-4 text-2xl font-semibold">We move your world!</h4>
                                            <p className="mb-4">
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                            </p>
                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                            </p>
                                        </div>
                                    </Tab.Panel>
                                    <Tab.Panel>
                                        <div>
                                            <div className="flex items-start pt-5">
                                                <div className="h-20 w-20 flex-none ltr:mr-4 rtl:ml-4">
                                                    <img
                                                        src="/assets/images/profile-34.jpeg"
                                                        alt="img"
                                                        className="m-0 h-20 w-20 rounded-full object-cover ring-2 ring-[#ebedf2] dark:ring-white-dark"
                                                    />
                                                </div>
                                                <div className="flex-auto">
                                                    <h5 className="mb-4 text-xl font-medium">Media heading</h5>
                                                    <p className="text-white-dark">
                                                        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus
                                                        viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Tab.Panel>
                                    
                                </Tab.Panels>
                            </Tab.Group>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tabs;
