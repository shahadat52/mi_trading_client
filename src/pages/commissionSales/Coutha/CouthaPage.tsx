/* eslint-disable @typescript-eslint/no-explicit-any */

import { useParams } from 'react-router';
import { useGetAllSettlementsOfSupplierQuery } from '../../../redux/features/settlement/settlementApi';
import { useState } from 'react';
import { GrUpdate } from 'react-icons/gr';
import BepariCoutha from './BepariCoutha.tsx'
import Modal from '../../../components/Modal';
import BepariCouthaUpdateEntry from './BepariCouthaUpdateEntry';

const CouthaPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState('')
    const { id } = useParams()
    const { data } = useGetAllSettlementsOfSupplierQuery(id)
    const [selectedSettlement, setSelectedSettlement] = useState(null)
    const settlements = data?.data || [];



    return (
        <div>
            <div className='grid grid-cols-1 lg:grid-cols-3 '>
                {
                    settlements?.map((item: any, idx: number) => (
                        //settlement cart
                        <div key={item?._id} className={`text-xs flex items-center m-3 rounded-2xl border  border-white/20  bg-green-50 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.25)] py-3 px-6 justify-between gap-4`}>
                            <p>{idx + 1}.</p>
                            <p className=''>Invoice: <span className='font-semibold'>{item?.invoice}</span></p>
                            <p>Lot: <span className='font-semibold'>{item?.lot}</span></p>
                            <div className='flex flex-col items-end'>
                                <p>{item?.grandTotal} টাকা</p>
                            </div>
                            <div className='flex flex-col items-end'>
                                <button
                                    onClick={() => { setSelected(item); setIsOpen(true) }}
                                    className="text-green-600 text-2xl font-bold"
                                >
                                    <span className='font-bold text-2xl'><GrUpdate /></span>
                                </button>
                            </div>
                            <div onClick={() => setSelectedSettlement(item)} className='flex flex-col items-end'>
                                <button className="bg-blue-600 text-white px-2 py-1 rounded">Print</button>
                            </div>
                        </div>
                    ))
                }
            </div >
            {
                selectedSettlement && <BepariCoutha settlement={selectedSettlement} onClose={() => setSelectedSettlement(null)} />
            }

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <BepariCouthaUpdateEntry item={selected} onClose={() => setIsOpen(false)} />
            </Modal>
        </div >
    );
};

export default CouthaPage;