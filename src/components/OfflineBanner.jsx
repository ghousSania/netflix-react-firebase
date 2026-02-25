const OfflineBanner = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-red-700 text-white text-center py-2 z-50">
      You are offline. Please check your internet connection.
    </div>
  );
};

export default OfflineBanner;
