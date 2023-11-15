import React from 'react';
import * as i18n from 'i18next';
import { useAppSelector } from "../Store/store";
import discuss from '../assets/discuss.png'
interface FormProps {

    t: i18n.TFunction;
}
function DetailsOfShipment({ t }: FormProps) {
    const contents = useAppSelector((state) => state.ShipmentData.contents);
    const isLoading = useAppSelector((state) => state.ShipmentData.isLoading)
    const error = useAppSelector((state) => state.ShipmentData.error);



    return (
        <>

            <div className=' datails'>
                <div className='table_details '>
                    <div className=' title'>{t('table.title')}</div>
                    <table className="table">
                        <thead >
                            <tr>
                                <th>{t('table.branch')}</th>
                                <th>{t('table.date')}</th>
                                <th>{t('table.time')}</th>
                                <th>{t('table.details')}</th>
                            </tr>
                        </thead>
                        <tbody >

                            {

                                contents.TransitEvents.map((ele, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>Nasr City</td>
                                            <td>{new Date(ele.timestamp).toLocaleDateString()}</td>
                                            <td>{new Date(ele.timestamp).toLocaleTimeString()}</td>
                                            <td>{ele.state}</td>
                                        </tr>
                                    )

                                })
                            }



                        </tbody>
                    </table>

                </div>


                <div className=' address__container'>
                    <div className=' title'>{t('address.title')}</div>

                    <div className="address ">
                        <p >{t('address.address')}</p>
                    </div>
                    <div className="problem ">

                        <div className=' problem_content '>
                            <p >{t('address.problem')}</p>
                            <a href="" >{t('address.report')}</a>
                        </div>
                        <div className='discuss_content'>
                            <img src={discuss} alt="discuss" />
                        </div>

                    </div>

                </div>

            </div>
        </>


    )
}

export default DetailsOfShipment