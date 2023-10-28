import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { LoginContext } from "../../contexts/LoginContext";

export const Login = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(LoginContext);

    function sendLogin(e) {
        e.preventDefault();
        const form = Object.fromEntries(new FormData(e.target));
        if(form.email === '' || form.password === '') {
            toast.error("Email and password can't be empty");
            return;
        }

        fetch('http://localhost:8080/api/auth/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(form),
            credentials: 'include',
        })
        .then(res => res.json())
        .then(res => {
            if(res.logged) {
                setUser(res.user);
                navigate('/');
            } else {
                toast.error(res.message);
            }
        });
    };

    const externalLogin = (type) => {
        const url = `http://localhost:8080/api/auth/${type}`;
        const width = 600;
        const height = 600;
        const y = window.top.outerHeight / 2 + window.top.screenY - ( height / 2);
        const x = window.top.outerWidth / 2 + window.top.screenX - ( width / 2);
        
        window.open(
            url, 
            'targetWindow', 
            `toolbar=no, location=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=${width}, height=${height}, top=${y}, left=${x}`
        );
        

        window.addEventListener('message', (e) => {
            if(e.origin === 'http://localhost:8080' && e.data) {
                setUser(e.data);
                toast.success('Logged in successfully');
                navigate('/');
            }
        });
    }

    return (
        <div id="login" className="h-screen flex justify-center items-center">
            <div className="p-4 flex-1 h-screen">
                <img src="/media/login.jpg" className="rounded-lg object-cover w-full h-full" />
            </div>
            <div className="w-full flex-1">
                <form id="login_form" method="post" action="/api/login" className="w-2/3 mx-auto"
                onSubmit={(e) => sendLogin(e)}>
                    <h1 className="text-4xl text-blue-600 mb-8 font-bold">
                        Login
                    </h1>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="email" className="mb-1">Email: *</label>
                        <input type="email" name="email" id="email" className="bg-blue-100 focus:outline-blue-600 py-2 px-4 rounded border-b-2 border-blue-600 border-solid" />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="password" className="mb-1">Password: *</label>
                        <input type="password" name="password" id="password" className="bg-blue-100 focus:outline-blue-600 py-2 px-4 rounded border-b-2 border-blue-600 border-solid" />
                    </div>
                    <button type="submit" className="bg-blue-600 w-full rounded hover:bg-blue-400 duration-300 text-white py-2 px-4 font-bold">
                        Log in to your account
                    </button>
                    <span className="mt-4 text-gray-600 mt-4 block">
                        Don't have an account? <Link to="/register" className="text-blue-600 font-bold">Register here</Link>
                    </span>
                    <div className="flex relative items-center justify-center w-full">
                        <hr className="w-full h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
                        <span className="absolute px-6 font-medium text-gray-400 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">or</span>
                    </div>
                    <span onClick={() => externalLogin('github')} className="cursor-pointer flex w-full gap-4 justify-center items-center py-2 px-4 rounded border border-black hover:shadow-xl duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 496 512"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/></svg>
                        Login with GitHub
                    </span>
                    <span onClick={() => externalLogin('google')} className="cursor-pointer flex mt-4 w-full gap-4 justify-center items-center py-2 px-4 rounded border border-black hover:shadow-xl duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" height="1.5em" viewBox="0 0 326667 333333" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd"><path d="M326667 170370c0-13704-1112-23704-3518-34074H166667v61851h91851c-1851 15371-11851 38519-34074 54074l-311 2071 49476 38329 3428 342c31481-29074 49630-71852 49630-122593m0 0z" fill="#4285f4"/><path d="M166667 333333c44999 0 82776-14815 110370-40370l-52593-40742c-14074 9815-32963 16667-57777 16667-44074 0-81481-29073-94816-69258l-1954 166-51447 39815-673 1870c27407 54444 83704 91852 148890 91852z" fill="#34a853"/><path d="M71851 199630c-3518-10370-5555-21482-5555-32963 0-11482 2036-22593 5370-32963l-93-2209-52091-40455-1704 811C6482 114444 1 139814 1 166666s6482 52221 17777 74814l54074-41851m0 0z" fill="#fbbc04"/><path d="M166667 64444c31296 0 52406 13519 64444 24816l47037-45926C249260 16482 211666 1 166667 1 101481 1 45185 37408 17777 91852l53889 41853c13520-40185 50927-69260 95001-69260m0 0z" fill="#ea4335"/></svg>
                        Login with Google
                    </span>
                    <span className="mt-4 text-gray-600 mt-4 block">
                        <Link to="/reset-password" className="text-blue-600 italic">
                            Forgot your password?
                        </Link>
                    </span>
                </form>
            </div>

            <script src="/static/js/toast.js" defer></script>
            <script src="/static/js/login.js" defer></script>
        </div>
    )
}
