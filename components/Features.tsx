import React, { useEffect, useState } from 'react';
import FeaturesJson from '../data/features.json';
import Link from 'next/link';
import FeatureCard from './FeatureCard';
import ClickAwayListener from 'react-click-away-listener';
import { iFeature } from '@/pages/apps/stores/features/[featureId]';

interface iProps {
    FeatureData: iFeature[];
    deleteFlag: boolean;
    setFeatureData: (features: iFeature[]) => void;
    setDeleteFlag: (val: boolean) => void;
}

const Features:React.FC<iProps> = (props) => {
    const {FeatureData,deleteFlag,setDeleteFlag,setFeatureData} = props;

    const [focus, setFocus] = useState(false);
    const [search, setSearch] = useState('');
    

    const overlaySearchClick = () => {
        setFocus(true);
    };
                     
    const overlayClickAway = () => {
        setFocus(false);
    };

    const handleSearch = (event: any) => {
        setSearch(event.target.value);
    };

    

    // Filter features based on search input
    const filteredFeatures =  FeatureData &&  FeatureData.filter(feature => {
        const lowercasedSearch = search.toLowerCase();
        return (
            feature.keywordsForSearch.some(keyword => 
                keyword.toLowerCase().includes(lowercasedSearch)
            ) ||
            feature.featureName.toLowerCase().includes(lowercasedSearch) ||
            feature.description.toLowerCase().includes(lowercasedSearch)
        );
    });

    return (
        <>
            <div className="mt-5">
                <div className="mb-5 space-y-5">
                    <form>
                        <ClickAwayListener onClickAway={overlayClickAway}>
                            <form onSubmit={(e) => e.preventDefault()}>
                                <div className="search-form-overlay relative h-12 w-full rounded-md border border-white-dark/20" onClick={overlaySearchClick}>
                                    <input
                                        value={search}
                                        onChange={handleSearch}
                                        type="text"
                                        placeholder="Search..."
                                        className={`peer form-input hidden h-full bg-white placeholder:tracking-wider ltr:pl-12 rtl:pr-12 ${focus ? '!block' : ''}`}
                                    />
                                    <button
                                        type="submit"
                                        className={`absolute inset-y-0 my-auto flex h-9 w-9 items-center justify-center p-0 text-dark/70 peer-focus:text-primary ltr:right-1 rtl:left-1 ${focus ? '!ltr:!right-auto ltr:left-1 rtl:right-1' : ''}`}
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="11.5" cy="11.5" r="9.5" stroke="currentColor" strokeWidth="1.5" opacity="0.5"></circle>
                                            <path d="M18.5 18.5L22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                                        </svg>
                                    </button>
                                </div>
                            </form>
                        </ClickAwayListener>
                    </form>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-6 pt-5 lg:grid-cols-2">
                {/* Render filtered features */}
                {filteredFeatures.length > 0 ? (
                    filteredFeatures.map((feature, index) => (
                        <div className="panel" key={feature._id}>
                            <FeatureCard feature={feature} setDeleteFlag={setDeleteFlag} deleteFlag={deleteFlag} FeatureData={FeatureData} setFeatureData={setFeatureData} />
                        </div>
                    ))
                ) : (
                    <div className="panel">
                        <p>No features found matching your search.</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default Features;
