const ReviewItem = () => {
  return (
    <div className='pt-11 pb-8 border-b border-gray-100 max-xl:max-w-2xl max-xl:mx-auto'>
      <div className='flex sm:items-center flex-col min-[400px]:flex-row justify-between gap-5 mb-4'>
        <div className='flex items-center gap-3'>
          {/* <h6 className='font-semibold text-lg leading-8 text-indigo-600 '>
            {author.nickName}
          </h6> */}
        </div>
        <div className='flex gap-2'>
          {/* {isMyRivew && ( */}
          <>
            <button
              className='bg-green-400 py-1 px-2 rounded-md'
              //   onClick={() => navigate(`/review/edit/${id}`)}
            >
              수정
            </button>
            <button
              className='bg-red-400 py-1 px-2 rounded-md'
              //   onClick={deleteReview}
            >
              삭제
            </button>
          </>
          {/* )} */}
          {/* <p className='font-semibold text-lg leading-8 text-gray-400'>
            {formatDate(updatedAt)}
          </p> */}
        </div>
      </div>
      {/* <p className='font-normal text-lg leading-8 text-gray-400 max-xl:text-justify'>
        {review.content}
      </p> */}
    </div>
  );
};

export default ReviewItem;
