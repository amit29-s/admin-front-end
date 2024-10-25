import { SendAsync } from '@/axios';
import { FieldArray, Form, Formik } from 'formik';
import { useRouter } from 'next/router';

interface FormValues {
    featureName: string;
    description: string;
    keyword1: string;
    keyword2: string;
    keyword3: string;
    showFeature: boolean;
    showInList: boolean;
    subFeatures: { name: string; description: string; enabled: boolean }[];
}

const initialValues: FormValues = {
    featureName: '',
    description: '',
    keyword1: '',
    keyword2: '',
    keyword3: '',
    showFeature: false,
    showInList: true,
    subFeatures: [],
};

const Add = () => {
    const router = useRouter();

    let {addFeatureId} = router.query;
    if(Array.isArray(addFeatureId)) {
        addFeatureId = addFeatureId[0];
    }

    const submitForm = async (values: FormValues) => {
        const url = '/feature/createFeature';

        const featurePayload = {
            featureName: values.featureName,
            keywordsForSearch: [values.keyword1, values.keyword2, values.keyword3],
            description: values.description,
            enabled: values.showFeature,
            showInList: values.showInList,
            stage: 'beta',
            version: 1,
            subFeatures: values.subFeatures,
            owner: [],
        };

        try {

            console.log(featurePayload,'<--feature payload')
            // const res = await SendAsync<any>({
            //     url,
            //     method: 'POST',
            //     data: featurePayload,
            // });
            // if (res) {
            //     router.push(`/apps/stores/features/${addFeatureId}`);
            // }
        } catch (error) {
            console.log(error, 'Error On Login Page');
        }
    };

    return (
        <div className="">
            <hr className="my-6 border-white-light dark:border-[#1b2e4b]" />
            <div className="mt-8 px-4">
                <Formik initialValues={initialValues} onSubmit={submitForm} enableReinitialize>
                    {({ values, handleChange, setFieldValue }) => {
                        console.log(values, 'akldjfklasdjflkasd');
                        return (
                            <Form>
                                <div className="flex flex-col justify-between lg:flex-row">
                                    <div className="mb-6 w-full lg:w-3/4 ltr:lg:mr-6 rtl:lg:ml-6">
                                        <div className="text-lg font-semibold">Add Feature :-</div>
                                        <div className="mt-4 flex items-center">
                                            <label htmlFor="reciever-name" className="mb-0 w-1/3 ltr:mr-2 rtl:ml-2">
                                                Feature Name
                                            </label>
                                            <input
                                                value={values.featureName}
                                                onChange={handleChange}
                                                id="reciever-name"
                                                type="text"
                                                name="featureName"
                                                className="form-input flex-1"
                                                placeholder="Enter Feature Name"
                                            />
                                        </div>
                                        <div className="mt-4 flex items-center">
                                            <label htmlFor="reciever-email" className="mb-0 w-1/3 ltr:mr-2 rtl:ml-2">
                                                Description
                                            </label>
                                            <input
                                                value={values.description}
                                                onChange={handleChange}
                                                id="reciever-email"
                                                type="text"
                                                name="description"
                                                className="form-input flex-1"
                                                placeholder="Enter Description"
                                            />
                                        </div>
                                        <div className="mt-4 flex items-center">
                                            <label htmlFor="reciever-address" className="mb-0 w-1/3 ltr:mr-2 rtl:ml-2">
                                                Search Keywords
                                            </label>
                                            <div className="flex flex-grow flex-wrap gap-2">
                                                <input
                                                    value={values.keyword1}
                                                    onChange={handleChange}
                                                    id="reciever-address"
                                                    type="text"
                                                    name="keyword1"
                                                    className="form-input flex-1"
                                                    placeholder="Enter First Keyword"
                                                />
                                                <input
                                                    value={values.keyword2}
                                                    onChange={handleChange}
                                                    id="reciever-address"
                                                    type="text"
                                                    name="keyword2"
                                                    className="form-input flex-1"
                                                    placeholder="Enter Second Keyword"
                                                />
                                                <input
                                                    value={values.keyword3}
                                                    onChange={handleChange}
                                                    id="reciever-address"
                                                    type="text"
                                                    name="keyword3"
                                                    className="form-input flex-1"
                                                    placeholder="Enter Third Keyword"
                                                />
                                            </div>
                                        </div>

                                        <div className="mt-4 flex items-center">
                                            <label className="mb-0 mt-4 flex w-full items-center ltr:mr-2 rtl:ml-2">
                                                <span className="mb-0 w-1/3 ltr:mr-2 rtl:ml-2 ">Show In Admin</span>
                                                <input
                                                    id="showInList"
                                                    name="showInList"
                                                    checked={values.showInList}
                                                    onChange={(e) => setFieldValue('showInList', e.target.checked)}
                                                    type="checkbox"
                                                    value=""
                                                    className="peer sr-only"
                                                />
                                                <div className="after:start-[2px] peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                                            </label>
                                        </div>

                                        {/* <div className="mt-4 flex items-center">
                                            <label className="mb-0 mt-4 flex w-full items-center ltr:mr-2 rtl:ml-2">
                                                <span className="mb-0 w-1/3 ltr:mr-2 rtl:ml-2 ">Show Feature</span>
                                                <input
                                                    id="showFeature"
                                                    name="showFeature"
                                                    checked={values.showFeature}
                                                    onChange={(e) => setFieldValue('showFeature', e.target.checked)}
                                                    type="checkbox"
                                                    value=""
                                                    className="peer sr-only"
                                                />
                                                <div className="after:start-[2px] peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                                            </label>
                                        </div> */}

                                        <FieldArray name="subFeatures">
                                            {({ remove, push }) => {
                                                return (
                                                    <div className="">
                                                        <div className="mt-4 text-lg font-semibold">Sub Features</div>
                                                        {values.subFeatures.length > 0 &&
                                                            values.subFeatures.map((subFeature, index) => {
                                                                return (
                                                                    <div key={index} className="mt-4 rounded-md border-2 border-gray-900 p-8 relative">
                                                                        <div className="mt-4 flex items-center">
                                                                            <label htmlFor="reciever-email" className="mb-0 w-1/3 ltr:mr-2 rtl:ml-2">
                                                                                Sub Feature Name
                                                                            </label>
                                                                            <input
                                                                                name={`subFeatures[${index}].name`}
                                                                                value={subFeature.name}
                                                                                onChange={handleChange}
                                                                                placeholder="SubFeature Name"
                                                                                type="text"
                                                                                className="form-input flex-1"
                                                                            />
                                                                        </div>
                                                                        <div className="mt-4 flex items-center">
                                                                            <label htmlFor="reciever-email" className="mb-0 w-1/3 ltr:mr-2 rtl:ml-2">
                                                                                Sub Feature Description
                                                                            </label>
                                                                            <input
                                                                                name={`subFeatures[${index}].description`}
                                                                                value={subFeature.description}
                                                                                onChange={handleChange}
                                                                                placeholder="SubFeature Description"
                                                                                type="text"
                                                                                className="form-input flex-1"
                                                                            />
                                                                        </div>

                                                                        {/* <div className="mt-4 flex items-center">
                                                                            <label className="mb-0 mt-4 flex w-full items-center ltr:mr-2 rtl:ml-2">
                                                                                <span className="mb-0 w-1/3 ltr:mr-2 rtl:ml-2 ">Show Sub Feature</span>
                                                                                <input
                                                                                    id={`subFeatures[${index}].enabled`}
                                                                                    name={`subFeatures[${index}].enabled`}
                                                                                    checked={subFeature.enabled}
                                                                                    onChange={(e) => setFieldValue(`subFeatures[${index}].enabled`, e.target.checked)}
                                                                                    type="checkbox"
                                                                                    value=""
                                                                                    className="peer sr-only"
                                                                                />
                                                                                <div className="after:start-[2px] peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
                                                                            </label>
                                                                        </div> */}
                                                                        <button type="button" className="absolute right-2 top-2 flex hover:text-danger" onClick={() => remove(index)}>
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
                                                                );
                                                            })}
                                                        <div className="mt-4 flex items-center">
                                                            <button onClick={() => push({ name: '', description: '', enabled: false })} className="btn btn-primary gap-2">
                                                                <svg
                                                                    className="h-5 w-5"
                                                                    viewBox="0 0 24 24"
                                                                    stroke="currentColor"
                                                                    strokeWidth="1.5"
                                                                    fill="none"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                >
                                                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                                                </svg>
                                                                Add New Sub Feature
                                                            </button>
                                                        </div>
                                                    </div>
                                                );
                                            }}
                                        </FieldArray>

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
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </div>
    );
};

export default Add;
