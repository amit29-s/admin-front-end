import React, { useState } from 'react';
import { SendAsync } from '@/axios';
import { iFeature, iSubFeature } from '@/pages/apps/stores/features/[featureId]';

interface iProps {
    feature:iFeature;
    subFeature: iSubFeature;
    featureId: string;
    FeatureData: iFeature[];
    setFeatureData:((features : iFeature[]) => void);
}

const SubFeatureCard: React.FC<iProps> = (props) => {
    const { subFeature,featureId,feature,FeatureData,setFeatureData } = props;

    const [subFeatureSwitch,setSubFeatureSwitch] = useState<boolean>(subFeature.enabled);


    const handleSubFeatureChange = async (event: any, subFeatureId: string) => {
        const updatedSubFeatureSwitch = event.target.checked;
        setSubFeatureSwitch(updatedSubFeatureSwitch);

        // Update the sub-feature's enabled state in the feature object
        const updatedSubFeatures = feature.subFeatures.map((sf) =>
            sf._id === subFeatureId ? { ...sf, enabledForClient: updatedSubFeatureSwitch } : sf
        );

        const updatedFeaturesData = FeatureData.map(feature => {
            if(feature._id === featureId) {
                return {...feature,subFeatures : updatedSubFeatures}
            } else {
                return feature;
            }
        })
        console.log(updatedFeaturesData,'kjasldkfjsdalkfjskldfjslkdfjslk')
        setFeatureData(updatedFeaturesData);
        // setFeature(updatedFeature);
        // console.log(updatedFeature,'askdjflkasjdflkasdjflkasdjflkasdjflkasd')

        // const url = `/feature/updateFeature/${featureId}`;
        // try {
        //     const res: any = await SendAsync<any>({
        //         url,
        //         method: 'PUT',
        //         data: updatedFeature, 
        //     });
        // } catch (error) {
        //     console.log(error, 'Error While Updating Feature');
        // }
    };


    return (
        <div className="panel">
            <div className="px-5">
                <h5>
                    <label className="inline-flex cursor-pointer items-center gap-2">
                        <span className="ms-3 text-xl font-semibold text-[#3b3f5c] dark:text-white-light ">{subFeature?.name}</span>
                        <input type="checkbox" checked={subFeatureSwitch} onChange={(event) => handleSubFeatureChange(event,subFeature?._id)} value="" className="peer sr-only" />
                        <div className="after:start-[2px] peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                    </label>
                </h5>
                <p className="text-white-dark">{subFeature?.description}</p>
            </div>
        </div>
    );
};

export default SubFeatureCard;
