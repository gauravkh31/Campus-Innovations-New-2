/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import Loader from "../../components/loader/Loader";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const LoginCompany = () => {
    const context = useContext(myContext);
    const { loading, setLoading } = context;

    // navigate 
    const navigate = useNavigate();

    // company Signup State 
    const [companyLogin, setcompanyLogin] = useState({
        email: "",
        password: ""
    });

    /**========================================================================
     *                          company Login Function 
    *========================================================================**/

    const companyLoginFunction = async () => {
        // validation 
        if (companyLogin.email === "" || companyLogin.password === "") {
            toast.error("All Fields are required")
        }

        setLoading(true);
        try {
            const companys = await signInWithEmailAndPassword(auth, companyLogin.email, companyLogin.password);
            // console.log(companys.company)

            try {
                const q = query(
                    collection(fireDB, "company"),
                    where('uid', '==', companys?.company?.uid)
                );
                const data = onSnapshot(q, (QuerySnapshot) => {
                    let company;
                    QuerySnapshot.forEach((doc) => company = doc.data());
                    localStorage.setItem("companys", JSON.stringify(company) )
                    setcompanyLogin({
                        email: "",
                        password: ""
                    })
                    toast.success("Login Successfully");
                    setLoading(false);
                    if(company.role === "company") {
                        navigate('/company-dashboard');
                    }else{
                        navigate('/admin-dashboard');
                    }
                });
                return () => data;
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error("Login Failed");
        }

    }
    return (
        <div className='flex justify-center items-center h-screen'>
            {loading && <Loader />}
            {/* Login Form  */}
            <div className="login_Form bg-pink-50 px-8 py-6 border border-pink-100 rounded-xl shadow-md">

                {/* Top Heading  */}
                <div className="mb-5">
                    <h2 className='text-center text-2xl font-bold text-pink-500 '>
                        Login
                    </h2>
                </div>

                {/* Input One  */}
                <div className="mb-3">
                    <input
                        type="email"
                        name="email"
                        placeholder='Email Address'
                        value={companyLogin.email}
                        onChange={(e) => {
                            setcompanyLogin({
                                ...companyLogin,
                                email: e.target.value
                            })
                        }}
                        className='bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200'
                    />
                </div>

                {/* Input Two  */}
                <div className="mb-5">
                    <input
                        type="password"
                        placeholder='Password'
                        value={companyLogin.password}
                        onChange={(e) => {
                            setcompanyLogin({
                                ...companyLogin,
                                password: e.target.value
                            })
                        }}
                        className='bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200'
                    />
                </div>

                {/* Signup Button  */}
                <div className="mb-5">
                    <button
                        type='button'
                        onClick={companyLoginFunction}
                        className='bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md '
                    >
                        Login
                    </button>
                </div>

                <div>
                    <h2 className='text-black'>Don't Have an account <Link className=' text-pink-500 font-bold' to={'/signup'}>Signup</Link></h2>
                </div>

            </div>
        </div>
    );
}

export default Login;

