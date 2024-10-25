import Link from 'next/link';
import { Tab } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '@/store/themeConfigSlice';
import UsersTable from '@/components/UsersTable';
import Features from '@/components/Features';
import { SendAsync } from '@/axios';
import { useRouter } from 'next/router';

export interface iFeature {
    _id: string;
    featureName: string;
    keywordsForSearch: string[];
    description: string;
    enabled: boolean;
    enabledForClient: boolean;
    stage: string;
    version: number;
    subFeatures: iSubFeature[];
    route: string;
    owner: string[];
    showInList: boolean;
}

export interface iSubFeature {
    name: string;
    enabled: boolean;
    enabledForClient: boolean;
    description: string;
    config: iConfig;
    _id: string;
}

export type iConfig = Record<string, string>;

const Tabs = () => {
    const router = useRouter();
    let {featureId} = router.query;
    if(Array.isArray(featureId)) {
        featureId = featureId[0];
    }
    console.log(featureId,'akjdflkadsfjlkasdfjlkasdfjaksdl')
    
    const [FeatureData, setFeatureData] = useState<iFeature[]>([]);
    const [deleteFlag, setDeleteFlag] = useState<boolean>(false);

    const dispatch = useDispatch();

    const fetchAllFeatures = async (clientId : string) => {
        const url = `/feature/getAllFeatures/${clientId}`;
        const Features = await SendAsync<any>({
            url,
            method: 'GET',
        });
        return Features;
    };

    console.log(FeatureData,'FeatureData')

    const updateManyFeatures = async (FeaturesData: iFeature[],clientId : string) => {
        const url = `/feature/createManyFeature/${clientId}`;
        try {
            const res: any = await SendAsync<any>({
                url,
                method: 'POST',
                data: FeaturesData,
            });
        } catch (error) {
            console.log(error, 'Error On Login Page');
        }
    };

    useEffect(() => {
        fetchAllFeatures(featureId!).then((res) => setFeatureData(res));
    }, [featureId,deleteFlag]);

    useEffect(() => {
        dispatch(setPageTitle('Tabs'));
    },[]);

    const handleVendorSave = async () => {
        // const featureData = await fetchAllFeatures();
        const updatedFeaturedData = FeatureData
            .filter((feature: iFeature) => feature.enabledForClient)
            .map((feature: iFeature) => ({
                ...feature,
                subFeatures: feature.subFeatures.filter((subFeature) => subFeature.enabledForClient),
            }));
        console.log(updatedFeaturedData, 'lkajdsflkasdjflkasdjflkasdjflaksd',FeatureData);
        await updateManyFeatures(updatedFeaturedData,featureId!);
    };

    return (
        <div>
            <div className="space-y-8 pt-5">
                <div className="grid h-[85vh] grid-cols-1 gap-6 lg:grid-cols-1">
                    {/* Simple Tabs */}
                    <div className="panel" id="simple">
                        <div className="mb-5 flex items-center justify-between">
                            <h5 className="text-lg font-semibold dark:text-white-light">Simple Tabs</h5>
                            <div className="flex gap-2">
                                <Link href={`/apps/stores/features/addFeature/${featureId}`} className="btn btn-primary gap-2">
                                    <svg className="h-5 w-5" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="12" y1="5" x2="12" y2="19"></line>
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                    </svg>
                                    Add New Feature
                                </Link>
                                <button type="button" className="btn btn-outline-primary">
                                    Cancel
                                </button>
                                <button type="button" className="btn btn-primary" onClick={handleVendorSave}>
                                    Save
                                </button>
                            </div>
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
                                        <Features FeatureData={FeatureData} setDeleteFlag={setDeleteFlag} deleteFlag={deleteFlag} setFeatureData={setFeatureData} />
                                    </Tab.Panel>
                                    <Tab.Panel>
                                        <UsersTable />
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
