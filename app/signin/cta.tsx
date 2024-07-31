'use client';

import Link from 'next/link';

const CallToActionGrid = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col justify-between p-6 bg-white rounded-lg shadow-lg">
          <div>
            <h2 className="text-xl font-semibold mb-4">Members before August 2024 Signup</h2>
            <p className="mb-4">Sign up here if you are a member of the Nordkurve but don't have a digital account. Use your Nordkurve email address and create a new password</p>
          </div>
          <Link legacyBehavior href="/signin/up">
            <a className="self-start mt-4 px-4 py-2 bg-red-800 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700">
              Signup
            </a>
          </Link>
        </div>
        <div className="flex flex-col justify-between p-6 bg-white rounded-lg shadow-lg">
          <div>
            <h2 className="text-xl font-semibold mb-4">New Member Signup</h2>
            <p className="mb-4">Sign up here if you are a new member of the Nordkurve and this website.</p>
          </div>
          <Link legacyBehavior href="/signin/new">
            <a className="self-start mt-4 px-4 py-2 bg-red-800 text-white font-semibold rounded-lg shadow-md hover:bg-green-700">
              Signup
            </a>
          </Link>
        </div>
        <div className="flex flex-col justify-between p-6 bg-white rounded-lg shadow-lg">
          <div>
            <h2 className="text-xl font-semibold mb-4">Login</h2>
            <p className="mb-4">If you've already got an account on nk12.de, log in here</p>
          </div>
          <Link legacyBehavior href="/signin">
            <a className="self-start mt-4 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700">
              Login
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CallToActionGrid;
