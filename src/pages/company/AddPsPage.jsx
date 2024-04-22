import { Timestamp, addDoc, collection } from "firebase/firestore";
import { useContext, useState } from "react";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import { fireDB } from "../../firebase/FirebaseConfig";
import { useNavigate } from "react-router";
import Loader from "../../components/loader/Loader";

const categoryList1 = [
    {
        name: 'software'
    },
    {
        name: 'hardware'
    },
    {
        name: 'software + hardware'
    },
    {
        name: 'mobile'
    },
    {
        name: 'laptop'
    },
    {
        name: 'shoes'
    },
    {
        name: 'home'
    },
    {
        name: 'books'
    }
]

const categoryList2 = [
    {
        name: 'software'
    },
    {
        name: 'hardware'
    },
    {
        name: 'software + hardware'
    },
    {
        name: 'mobile'
    },
    {
        name: 'laptop'
    },
    {
        name: 'shoes'
    },
    {
        name: 'home'
    },
    {
        name: 'books'
    }
]

const AddpsPage = () => {
    const context = useContext(myContext);
    const { loading, setLoading } = context;

    // navigate 
    const navigate = useNavigate();

    // ps state
    const [ps, setps] = useState({
        title: "",
        
        projectImageUrl: "",
        category1: "",
        category2: "",
        description: "",
        
        time: Timestamp.now(),
        date: new Date().toLocaleString(
            "en-US",
            {
                month: "short",
                day: "2-digit",
                year: "numeric",
            }
        )
    });


    // Add ps Function
    const addProjectFunction = async () => {
        if (project.title == "" || project.price == "" || project.proj == "" || ps.category == "" || ps.description == "") {
            return toast.error("all fields are required")
        }

        setLoading(true);
        try {
            // const psRef = collection(fireDB, 'pss');

            const psRef = collection(fireDB, 'projects');
            await addDoc(psRef, ps)
            toast.success("Add ps successfully");
            navigate('/admin-dashboard')
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
            toast.error("Add ps failed");
        }

    }
    return (
        <div>
            <div className='flex justify-center items-center h-screen'>
                {loading && <Loader />}
                {/* Login Form  */}
                <div className="login_Form bg-pink-50 px-8 py-6 border border-pink-100 rounded-xl shadow-md">

                    {/* Top Heading  */}
                    <div className="mb-5">
                        <h2 className='text-center text-2xl font-bold text-pink-500 '>
                            Add ps
                        </h2>
                    </div>

                    {/* Input One  */}
                    <div className="mb-3">
                        <input
                            type="text"
                            name="title"
                            value={ps.title}
                            onChange={(e) => {
                                setps({
                                    ...ps,
                                    title: e.target.value
                                })
                            }}
                            placeholder='ps Title'
                            className='bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300'
                        />
                    </div>

                    {/* Input Two  */}
                    <div className="mb-3">
                        <input
                            type="number"
                            name="price"
                            value={ps.price}
                            onChange={(e) => {
                                setps({
                                    ...ps,
                                    price: e.target.value
                                })
                            }}
                            placeholder='ps Price'
                            className='bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300'
                        />
                    </div>

                    {/* Input Three  */}
                    <div className="mb-3">
                        <input
                            type="text"
                            name="psImageUrl"
                            value={ps.psImageUrl}
                            onChange={(e) => {
                                setps({
                                    ...ps,
                                    psImageUrl: e.target.value
                                })
                            }}
                            placeholder='ps Image Url'
                            className='bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300'
                        />
                    </div>

                    {/* Input Four  */}
                    <div className="mb-3">
                        <select
                            value={ps.category}
                            onChange={(e) => {
                                setps({
                                    ...ps,
                                    category: e.target.value
                                })
                            }}
                            className="w-full px-1 py-2 text-pink-300 bg-pink-50 border border-pink-200 rounded-md outline-none  ">
                            <option disabled>Select ps Category</option>
                            {categoryList.map((value, index) => {
                                const { name } = value
                                return (
                                    <option className=" first-letter:uppercase" key={index} value={name}>{name}</option>
                                )
                            })}
                        </select>
                    </div>

                    {/* Input Five  */}
                    <div className="mb-3">
                        <textarea
                            value={ps.description}
                            onChange={(e) => {
                                setps({
                                    ...ps,
                                    description: e.target.value
                                })
                            }} name="description" placeholder="ps Description" rows="5" className=" w-full px-2 py-1 text-pink-300 bg-pink-50 border border-pink-200 rounded-md outline-none placeholder-pink-300 ">

                        </textarea>
                    </div>

                    {/* Add ps Button  */}
                    <div className="mb-3">
                        <button
                            onClick={addpsFunction}
                            type='button'
                            className='bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md '
                        >
                            Add ps
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddpsPage;
