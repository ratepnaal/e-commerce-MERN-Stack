const ServerError = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-5 py-24">
      <div className="max-w-md text-center">
        <div className="text-9xl mb-8 animate-bounce">🛠️</div>
        
        <h1 className="text-4xl font-bold text-indigo-900 mb-4">
          استراحة قصيرة للمحرك!
        </h1>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          يبدو أن السيرفر قرر أخذ قسط من الراحة، أو أن هناك مشكلة تقنية طارئة. 
          لا تقلق، فريقنا التقني (بما فيهم أنا 😅) يعمل الآن على إصلاح العطل.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
          >
            تحديث الصفحة
          </button>
          
          <a 
            href="/"
            className="px-6 py-3 bg-white text-indigo-600 border border-indigo-100 rounded-xl font-semibold hover:bg-indigo-50 transition-all"
          >
            العودة للرئيسية
          </a>
        </div>

        <div className="mt-12 text-xs text-gray-400 font-mono">
          Error Code: 500 | System Update in Progress
        </div>
      </div>
    </div>
  );
};

export default ServerError;