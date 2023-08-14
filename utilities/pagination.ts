async function pagination(model: any, limit: any, page: any) {
  const data = await model
    .find()
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();

  // get total documents in the Posts collection
  const count = await model.countDocuments();

  // return response with posts, total pages, and current page
  return {
    data,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
  };
}

export default pagination;
