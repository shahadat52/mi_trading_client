import RegistrationForm from "./RegisterForm";

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="flex w-full max-w-5xl shadow-2xl rounded-xl overflow-hidden">

        {/* Left Side: Logo and Wavy Background */}
        <div className="hidden lg:flex w-1/2 p-12 items-center justify-center 
                        bg-gradient-to-br from-green-300 to-teal-500 
                        relative overflow-hidden">


          <div className="absolute inset-0 opacity-20"
            style={{
              /* Simple CSS to mimic a subtle wave overlay */
              backgroundImage: 'radial-gradient(circle at 10% 50%, rgba(255,255,255,0.2) 1%, transparent 10%)',
              backgroundSize: '400px 400px'
            }}>
          </div>

          {/* Logo Placeholder */}
          <div className="relative z-10 p-6 bg-white bg-opacity-10 rounded-xl 
                            transform scale-75 backdrop-blur-sm">
            <img src="/mi_logo1.png" alt="" />
          </div>
        </div>

        {/* Right Side: Registration Form */}
        <div className="w-full lg:w-1/2 p-10 md:p-16 
                        bg-gray-800 text-white flex flex-col justify-center">
          <RegistrationForm />
        </div>

      </div>
    </div>
  );
}

export default RegisterPage;