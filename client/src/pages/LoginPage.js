const LoginPage = ({ setIsLoggedIn }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setIsLoggedIn(true);
            alert("Login successful!");
        }, 1000);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="py-20">
            <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <div className="text-center mb-8">
                        <Heart className="h-12 w-12 text-pink-500 mx-auto mb-4"/>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
                        <p className="text-gray-600">Sign in to your account to continue.</p>
                    </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input
                               type="email"
                               id="email"
                               name="email"
                               value={formData.email}
                               onChange={handleChange}
                               required
                               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                               placeholder="Enter your email"/>
                        </div>

                        <div>
                           <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                           </label>
                           <div className="relative">
                            <input
                               type={showPassword ? 'text' : 'password'}
                               id="password"
                               name="password"
                               value={formData.password}
                               onChange={handleChange}
                               required
                               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-12"
                               placeholder="Enter your password"/>
                            <button
                               type="button"
                               onClick={() => setShowPassword(!showPassword)}
                               className="absolute right-3 top-3 text-gray-500 hover:text-gray-700">
                                {showPassword ? <EyeOff className="h-6 w-6"/> : <Eye className="h-6 w-6"/>}
                               </button>
                           </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                  id="remember"
                                  name="remember"
                                  type="checkbox"
                                  className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                                  />
                                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                                    Remember /**
                                     * 
                                     */
                                    name() {
                                        
                                    }
                                  </label>
                            </div>
                        </div>
                    </form>
                </div>
        </div>
    )
}