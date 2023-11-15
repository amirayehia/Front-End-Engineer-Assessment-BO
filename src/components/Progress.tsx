import React, { useEffect, useState } from 'react';
import { useAppSelector } from "../Store/store";
import * as i18n from 'i18next';
interface FormProps {
    t: i18n.TFunction;
}
function Progress({ t }: FormProps) {
    const [currentState, setCurrentState] = useState('');
    const [barState, setBarState] = useState('normal');
    const [barStateText, setBarStateText] = useState('normal-text')
    const contents = useAppSelector((state) => state.ShipmentData.contents);
    const isLoading = useAppSelector((state) => state.ShipmentData.isLoading)
    const error = useAppSelector((state) => state.ShipmentData.error);

    const ManipulateState = () => {
        let shipmentStatus;

        if (contents.CurrentStatus.state.includes("CANCELLED")) {
            setBarState('error');
            setBarStateText('error-text')
            let data = [...contents.TransitEvents];
            let index = data.length - 2;
            shipmentStatus = data[index].state;
            shipmentStatus = data[index].state;
        } else if (contents.CurrentStatus.state.includes('WAITING')) {
            setBarState('pending');
            setBarStateText('pending-text')
            let data = [...contents.TransitEvents];
            let index = data.length - 2;
            shipmentStatus = data[index].state;
        } else if (contents.CurrentStatus.state.includes("DELIVERED")) {
            setBarState('success');
            setBarStateText('success-text')
            shipmentStatus = 'DELIVERED'
        } else {
            shipmentStatus = contents.CurrentStatus.state
        }
        console.log(shipmentStatus)
        setCurrentState(shipmentStatus)
    }
    useEffect(() => {
        ManipulateState()
    }, [contents.CurrentStatus]);











    console.log(contents)
    return (
        <div className='progress__bar'>
            <div className="shipment__data">
                <div className=' header'> {t('progress.number') + contents.TrackingNumber}</div>
                <div className=' header'>{t('progress.update')}</div>
                <div className=' header'>{t('progress.merchent')} </div>
                <div className=' header'>{t('progress.time')}</div>
                <div className={` ${barStateText} special`}>{contents.CurrentStatus.state}</div>
                <div className=' data'>{new Date(contents.CurrentStatus.timestamp).toDateString()}</div>
                <div className=' data'>SOUQ.COM</div>
                <div className=' data'>{new Date(contents.PromisedDate).toDateString()}</div>
            </div>

            <div className='progress__container '>
                {


                    currentState.includes('DELIVERED') ? <div className="progress">
                        <div className={` ${barState} progress__ w-full`}>
                        </div>
                        <div className={` ${barState} flex w-4 h-4 rounded-full  text-white absolute left-0 text-xs justify-center items-center`}>
                            <i className="fa-solid fa-check "></i>
                        </div>
                        <div className={` ${barState} flex w-4 h-4 rounded-full  text-white absolute  left-1/3 text-xs justify-center items-center`}>
                            <i className="fa-solid fa-check "></i>
                        </div>
                        <div className={` ${barState} flex w-4 h-4 rounded-full text-white absolute  left-2/3 text-xs justify-center items-center`}>
                            <i className="fa-solid fa-check text-white"></i>
                        </div>
                        <div className={` ${barState} flex w-4 h-4 rounded-full  text-white absolute  right-0 text-xs justify-center items-center`}>
                            <i className="fa-solid fa-check "></i>
                        </div>
                    </div> : currentState.includes('OUT_FOR_DELIVERY') ? <div className="progress">
                        <div className={`${barState}   w-2/3 progress__`} >
                        </div>
                        <div className={`${barState}  w-4 h-4 left-0 text-xs flex rounded-full  text-white absolute  justify-center items-center`}>
                            <i className="fa-solid fa-check "></i>
                        </div>
                        <div className={`${barState} w-4 h-4 left-1/3  text-xs  flex rounded-full  text-white absolute  justify-center items-center`}>
                            <i className="fa-solid fa-check "></i>
                        </div>
                        <div className={`${barState}  w-10 h-10 left-2/3 text-lg flex rounded-full  text-white absolute  justify-center items-center`}>
                            <i className="fa-solid fa-truck-fast"></i>
                        </div>
                        <div className=' w-10 h-10 right-0 text-lg text-gray-200 flex rounded-full bg-white  absolute   justify-center items-center border'>
                            <i className="fa-solid fa-clipboard-check"></i>
                        </div>
                    </div> : currentState.includes('PACKAGE_RECEIVED') ? <div className="progress">
                        <div className={`${barState}  w-1/3 progress__`}>
                        </div>
                        <div className={`${barState} flex w-4 h-4 rounded-full   left-0 text-xs text-white absolute justify-center items-center`}>
                            <i className="fa-solid fa-check "></i>
                        </div>
                        <div className={`${barState} flex w-10 h-10 rounded-full text-white text-lg   absolute  left-1/3  justify-center items-center`}>
                            <i className="fa-solid fa-handshake-simple"></i>
                        </div>
                        <div className='flex w-10 h-10 rounded-full bg-white border text-gray-200 absolute  left-2/3 text-lg justify-center items-center'>
                            <i className="fa-solid fa-truck-fast"></i>
                        </div>
                        <div className='flex w-10 h-10 rounded-full bg-white text-gray-200 absolute  right-0 text-lg justify-center items-center border'>
                            <i className="fa-solid fa-clipboard-check"></i>
                        </div>
                    </div> : currentState.includes('TICKET_CREATED') ? <div className="progress ">
                        <div className={`${barState} w-0 progress__`} >
                        </div>
                        <div className={`${barState} flex w-10 h-10 rounded-full  text-white text-lg  absolute start-0  justify-center items-center`}>
                            <i className="fa-solid fa-plus"></i>
                        </div>
                        <div className='flex w-10 h-10 rounded-full bg-white border text-gray-200  text-lg   absolute  start-1/3  justify-center items-center' >
                            <i className="fa-solid fa-handshake-simple"></i>
                        </div>
                        <div className='flex w-10 h-10 rounded-full bg-white border text-gray-200 absolute  start-2/3 text-lg justify-center items-center'>
                            <i className="fa-solid fa-truck-fast"></i>
                        </div>
                        <div className='flex w-10 h-10 rounded-full bg-white text-gray-200 absolute  end-0 text-lg justify-center items-center border'>
                            <i className="fa-solid fa-clipboard-check"></i>
                        </div>
                    </div > : ''
                }
            </div>
            <div className='flex flex-wrap justify-between pb-6 px-6 bottom_data'>
                <div className=''>{t('progress.created')}</div>
                <div className=''>{t('progress.recieved')} </div>
                <div className=''> {t('progress.delivery')}</div>
                <div className=''> {t('progress.delivered')} </div>
            </div>


        </div>


    )
}

export default Progress