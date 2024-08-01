const SkeletonLoading = () => {
  return (
    <div
      role="status"
      className="max-w-sm animate-pulse w-full min-h-[calc(100vh-350px)]"
    >
      <div className="rounded-lg bg-gray-200  dark:bg-gray-700 w-full mb-4 h-[185px]"></div>
      <div className="rounded-lg bg-gray-200  dark:bg-gray-700 w-full mb-4 h-[185px]"></div>
      <div className="rounded-lg bg-gray-200  dark:bg-gray-700 w-full mb-4 h-[185px]"></div>
    </div>
  );
};

export default SkeletonLoading;
