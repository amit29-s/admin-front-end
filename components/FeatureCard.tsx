import React, { useState } from 'react';
import { SendAsync } from '@/axios';
import SubFeatureCard from './SubFeatureCard';
import { iFeature } from '@/pages/apps/stores/features/[featureId]';

interface iProps {
    feature: iFeature;
    deleteFlag: boolean;
    FeatureData: iFeature[];
    setFeatureData:((features : iFeature[]) => void);
    setDeleteFlag: (val: boolean) => void;
}

const FeatureCard: React.FC<iProps> = (props) => {
    const { feature, setDeleteFlag, deleteFlag,FeatureData,setFeatureData } = props;

    const [featureSwitch, setFeatureSwitch] = useState<boolean>(feature.enabled);

    const handleFeatureChange = async (event: any, id: string) => {
        const featureChecked = event.target.checked;
        setFeatureSwitch(featureChecked);

        const updatedFeatures = FeatureData.map((feature) => {
            if(feature._id === id) {
                return {...feature,enabledForClient: featureChecked}
            } else {
                return feature;
            }
        })
        setFeatureData(updatedFeatures);
        // const url = `/feature/updateFeature/${id}`;
        // try {
        //     const res: any = await SendAsync<any>({
        //         url,
        //         method: 'PUT',
        //         data: { enabled: event.target.checked },
        //     });
        //     if(res) {
        //         setFeature({...feature,enabled : event.target.checked});
        //     }
        // } catch (error) {
        //     console.log(error, 'Error While Updating Feature');
        // }
    };

    const handleDelete = async (id: string) => {
        const url = `/feature/deleteFeature/${id}`;
        try {
            const resData = await SendAsync<any>({
                url,
                method: 'DELETE',
            });
            if (resData) {
                setDeleteFlag(!deleteFlag);
            }
        } catch (error) {
            console.log(error, 'Error Occured while deleting the record');
        }
    };
    return (
        <div className="px-5">
            <div className="relative flex flex-col">
                <h5>
                    <label className="inline-flex cursor-pointer items-center gap-2">
                        <span className="ms-3 text-xl font-semibold text-[#3b3f5c] dark:text-white-light ">{feature.featureName}</span>
                        <input checked={featureSwitch} onChange={(event) => handleFeatureChange(event, feature._id)} type="checkbox" value="" className="peer sr-only" />
                        <div className="after:start-[2px] peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                    </label>
                </h5>
                <p className="text-white-dark">{feature?.description}</p>

                <button type="button" className="absolute right-0 flex hover:text-danger" onClick={() => handleDelete(feature._id)}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
                        <path d="M20.5001 6H3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                        <path
                            d="M18.8334 8.5L18.3735 15.3991C18.1965 18.054 18.108 19.3815 17.243 20.1907C16.378 21 15.0476 21 12.3868 21H11.6134C8.9526 21 7.6222 21 6.75719 20.1907C5.89218 19.3815 5.80368 18.054 5.62669 15.3991L5.16675 8.5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                        ></path>
                        <path opacity="0.5" d="M9.5 11L10 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                        <path opacity="0.5" d="M14.5 11L14 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                        <path
                            opacity="0.5"
                            d="M6.5 6C6.55588 6 6.58382 6 6.60915 5.99936C7.43259 5.97849 8.15902 5.45491 8.43922 4.68032C8.44784 4.65649 8.45667 4.62999 8.47434 4.57697L8.57143 4.28571C8.65431 4.03708 8.69575 3.91276 8.75071 3.8072C8.97001 3.38607 9.37574 3.09364 9.84461 3.01877C9.96213 3 10.0932 3 10.3553 3H13.6447C13.9068 3 14.0379 3 14.1554 3.01877C14.6243 3.09364 15.03 3.38607 15.2493 3.8072C15.3043 3.91276 15.3457 4.03708 15.4286 4.28571L15.5257 4.57697C15.5433 4.62992 15.5522 4.65651 15.5608 4.68032C15.841 5.45491 16.5674 5.97849 17.3909 5.99936C17.4162 6 17.4441 6 17.5 6"
                            stroke="currentColor"
                            strokeWidth="1.5"
                        ></path>
                    </svg>
                </button>
            </div>

            {featureSwitch && (
                <div className="grid grid-cols-1 gap-6 pt-5 lg:grid-cols-2">
                    {feature &&
                        feature?.subFeatures.map((subFeature, index) => {
                            return (
                                <SubFeatureCard key={subFeature.name} subFeature={subFeature} featureId={feature._id} feature={feature} FeatureData={FeatureData} setFeatureData={setFeatureData}/>
                            );
                        })}
                </div>
            )}
        </div>
    );
};

export default FeatureCard;
