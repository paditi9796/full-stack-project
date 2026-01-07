import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Full Stack Project
          </h1>
          <p className="text-xl text-white mb-8 max-w-2xl">
            A modern full-stack application built with Next.js, TypeScript, Redux, 
            Node.js, MongoDB, and AWS services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/register"
              className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="/login"
              className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-indigo-600 transition-colors"
            >
              Sign In
            </Link>
          </div>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
            <div className="bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-2">Secure Authentication</h3>
              <p className="text-white text-opacity-90">
                JWT-based authentication with role-based access control
              </p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-2">AWS Integration</h3>
              <p className="text-white text-opacity-90">
                Email service via SES and push notifications via SNS
              </p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-2">Modern Stack</h3>
              <p className="text-white text-opacity-90">
                Built with Next.js, Redux, Node.js, and MongoDB
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
