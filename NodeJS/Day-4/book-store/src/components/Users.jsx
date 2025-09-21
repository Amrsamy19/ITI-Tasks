import React from 'react'

function Users({user}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Welcome,
            <span className="text-blue-800">
              {` ${user?.name || user?.username}`}
            </span>
            !
          </h2>
        </div>
      </div>
    </div>
  )
}

export default Users