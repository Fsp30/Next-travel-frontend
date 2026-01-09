import '../../../index.css';

export function DestinationLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 mb-8 animate-pulse">
          <div className="h-10 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="flex gap-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/5"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 animate-pulse">
              <div className="flex items-start gap-3">
                <div className="bg-blue-200 p-2 rounded-lg w-12 h-12"></div>
                <div className="flex-1 space-y-3">
                  <div className="h-6 bg-blue-200 rounded w-1/4"></div>
                  <div className="h-4 bg-blue-200 rounded"></div>
                  <div className="h-4 bg-blue-200 rounded w-5/6"></div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 animate-pulse">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-gradient-to-br from-purple-200 to-pink-200 p-2 rounded-lg w-10 h-10"></div>
                <div className="h-7 bg-gray-200 rounded w-48"></div>
              </div>
              <div className="space-y-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-4 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 animate-pulse">
              <div className="h-7 bg-gray-200 rounded w-32 mb-6"></div>
              <div className="bg-gradient-to-br from-blue-200 to-blue-300 rounded-xl p-6 h-48 mb-6"></div>
              <div className="grid grid-cols-2 gap-3">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-gray-100 rounded-lg p-4 h-24"
                  ></div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 animate-pulse">
              <div className="h-7 bg-gray-200 rounded w-40 mb-6"></div>
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-14 bg-gray-100 rounded-lg"></div>
                ))}
              </div>
            </div>

            <div className="bg-gray-100 rounded-lg p-4 border border-gray-200 animate-pulse">
              <div className="h-5 bg-gray-200 rounded w-36 mb-3"></div>
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex justify-between">
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
