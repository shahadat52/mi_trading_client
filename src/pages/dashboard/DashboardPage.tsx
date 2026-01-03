
import { FaChartLine, FaUsers, FaShoppingCart, FaDollarSign } from 'react-icons/fa';
// import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const stats = [
    {
        title: 'Total Sales',
        value: '৳ 1,250,000',
        icon: FaDollarSign,
    },
    {
        title: 'Orders',
        value: '1,284',
        icon: FaShoppingCart,
    },
    {
        title: 'Customers',
        value: '845',
        icon: FaUsers,
    },
    {
        title: 'Growth',
        value: '+18%',
        icon: FaChartLine,
    },
];

// const chartData = [
//   { name: 'Jan', sales: 40000 },
//   { name: 'Feb', sales: 30000 },
//   { name: 'Mar', sales: 50000 },
//   { name: 'Apr', sales: 45000 },
//   { name: 'May', sales: 60000 },
//   { name: 'Jun', sales: 75000 },
// ];

const DashboardPage = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
                    <p className="text-sm text-gray-500">Business overview & performance</p>
                </div>
                <button className="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm hover:bg-gray-800">
                    Download Report
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((item) => (
                    <div
                        key={item.title}
                        className="bg-white rounded-2xl shadow-sm p-6 flex items-center justify-between"
                    >
                        <div>
                            <p className="text-sm text-gray-500">{item.title}</p>
                            <h2 className="text-xl font-bold text-gray-800">{item.value}</h2>
                        </div>
                        <item.icon className="h-8 w-8 text-gray-400" />
                    </div>
                ))}
            </div>

            {/* Sales Chart */}
            {/* <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Sales Overview</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div> */}

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
                <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex justify-between">
                        <span>New order placed</span>
                        <span className="text-gray-400">2 min ago</span>
                    </li>
                    <li className="flex justify-between">
                        <span>Payment received</span>
                        <span className="text-gray-400">10 min ago</span>
                    </li>
                    <li className="flex justify-between">
                        <span>New customer registered</span>
                        <span className="text-gray-400">1 hour ago</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default DashboardPage;
