import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useDeleteCommissionProdMutation, useGetCommissionProductsByIdQuery, useUpdateCommissionProdMutation } from '../../redux/features/commissionProduct/commissionProductApi';
import { MdAutoDelete } from 'react-icons/md';
import { toast } from 'react-toastify';

const CommissionProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, isLoading, isError } = useGetCommissionProductsByIdQuery(id);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<any>({});
    const [updateProduct] = useUpdateCommissionProdMutation()
    const [deleteProduct] = useDeleteCommissionProdMutation()

    // Sync local state when data arrives
    useEffect(() => {
        if (data?.data) setFormData(data.data);
    }, [data]);

    if (isLoading) return <div className="p-10 text-center animate-pulse">Loading...</div>;
    if (isError || !data?.data) return <div className="p-10 text-center text-red-500">Product not found.</div>;

    const product = data.data;
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        const data = {
            name: formData.name,
            lot: Number(formData.lot),
            quantity: formData.quantity,
            commissionRate: formData.commissionRate,
            bosta: formData.bosta,
            unit: formData.unit,
        }
        await updateProduct({ id, data });
        setIsEditing(false);
    };

    const handleDelete = async (id: string) => {
        try {
            const confirmed = window.confirm("Are you sure you want to delete this product?");

            if (!confirmed) return;

            await deleteProduct(id).unwrap();

            toast.success("Product deleted successfully");

            navigate("/commission/products");
        } catch (error) {
            toast.error("Failed to delete product");
        } finally {
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white shadow-2xl rounded-2xl mt-10 border border-gray-100">
            {/* Header with Toggle */}
            <div className="flex justify-between gap-2 items-center border-b pb-6 mb-6">
                <div>

                    <h1 className="text-xl font-semibold md:text-4xl  text-gray-900">
                        {isEditing ? "Edit Product" : product?.name}
                    </h1>

                    <p className="text-sm text-blue-600 font-mono mt-1">LOT:{product?.supplier?.name}- {product.lot}</p>

                    <button
                        onClick={() => navigate(`/purchase/report/${id}`)}
                        className='mt-1'
                    >
                        <span className="p-2  text-xs font-normal rounded bg-green-700 uppercase text-white hover:bg-black transition shadow">
                            Reports
                        </span>
                    </button>

                </div>
                <div className=" flex flex-col items-center gap-1 space-x-3">
                    {isEditing ? (
                        <>
                            <button onClick={() => setIsEditing(false)} className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded-lg transition">Cancel</button>
                            <button onClick={handleSave} className="px-2 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md transition">Save Changes</button>
                        </>
                    ) : (
                        <button onClick={() => setIsEditing(true)} className="px-2  py-1 bg-gray-800 text-white rounded-lg hover:bg-black transition">Edit</button>
                    )}

                    <button onClick={() => handleDelete((id as string))} className="text-2xl px-2 py-1 bg-red-600 text-white rounded-lg hover:bg-black transition"><MdAutoDelete /></button>

                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Section 1: Core Info */}
                <div className="space-y-5">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">Basic Information</h3>

                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Product Name</label>
                        {isEditing ? (
                            <input name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none" />
                        ) : (
                            <p className="text-lg font-medium text-gray-800">{product.name}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Supplier</label>
                        {isEditing ? (
                            <></>
                        ) : (
                            <p className="text-lg font-medium text-gray-800">{product?.supplier?.name}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1">Lot</label>
                        {isEditing ? (
                            <input type='number' name="lot" value={formData.lot} onChange={handleChange} className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none" />
                        ) : (
                            <p className="text-lg font-medium text-gray-800">{product.lot}</p>
                        )}
                    </div>


                </div>

                {/* Section 2: Inventory & Pricing */}
                <div className="space-y-5 bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">Inventory & Pricing</h3>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 mb-1">Stock Qty ({product.unit})</label>
                            {isEditing ? (
                                <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} className="w-full p-2 border rounded-md" />
                            ) : (
                                <p className={`text-xl font-bold ${product.quantity <= product.reorderLevel ? 'text-red-500' : 'text-gray-800'}`}>
                                    {product.quantity}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 mb-1">Commission Rate</label>
                            {isEditing ? (
                                <input type="number" name="commissionRate" value={formData.commissionRate} onChange={handleChange} className="w-full p-2 border rounded-md" />
                            ) : (
                                <p className="text-xl font-bold text-green-600">৳{product.commissionRate}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2">
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 mb-1">Bag</label>
                            {isEditing ? (
                                <input type="number" name="bosta" value={formData.bosta} onChange={handleChange} className="w-full p-2 border rounded-md" />
                            ) : (
                                <p className="text-md font-semibold text-orange-500">{product.bosta}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 mb-1">Unit</label>
                            {isEditing ? (
                                <input name="unit" value={formData.unit} onChange={handleChange} className="w-full p-2 border rounded-md" />
                            ) : (
                                <p className="text-md font-semibold text-gray-700">{product.unit}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer info */}
            {!isEditing && (
                <div className="mt-8 pt-6 border-t flex justify-between text-[10px] text-gray-400 uppercase tracking-tighter">
                    <span>Created: {new Date(product.createdAt).toLocaleString()}</span>
                    <span>System ID: {product.bosta || 'N/A'}</span>
                </div>
            )}
        </div>
    );
};

export default CommissionProductDetails;