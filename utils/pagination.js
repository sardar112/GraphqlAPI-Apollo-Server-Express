const StringtoBase64 = (data) => Buffer.from(data).toString('base64');
const base64toString = (data) => Buffer.from(data, 'base64').toString('ascii');

const getPaginatedData = async (
  Model,
  filterBy,
  dbFilterValue,
  pageInfo,
  orderBy
) => {
  const query = {};
  query[filterBy] = dbFilterValue;

  if (pageInfo.cursor) {
    query['_id'] = {
      $lt: base64toString(pageInfo.cursor),
    };
  }
  // console.log('Model', Model);
  // console.log('filterBy', filterBy);
  // console.log('dbFilterValue', dbFilterValue);
  // console.log('pageInfo', pageInfo);
  // console.log('orderBy', orderBy);

  // const pageNumber = pageInfo.page * 1 || 1;
  // const limit = pageInfo.limit * 1 || 10;
  // const skip = (pageNumber - 1) * limit;
  let ordBy = orderBy ? orderBy : `createdAt`;
  // console.log(ordBy);
  let documents = dbFilterValue
    ? await Model.find(query)
        .sort({ ordBy: pageInfo.sortBy ? pageInfo.sortBy : -1 })
        .limit(pageInfo.limit + 1)
    : await Model.find(query)
        .sort({ ordBy: pageInfo.sortBy })
        .limit(pageInfo.limit + 1);
  // console.log('documents found', documents);
  const hasNextPage = documents.length > pageInfo.limit;
  // console.log('nextPageFound', hasNextPage);
  documents = hasNextPage ? documents.slice(0, -1) : documents;
  // console.log('paginated documents', documents);
  let totalDocuments = await Model.countDocuments();
  return {
    documents,
    pageInfo: {
      nextPageCursor: hasNextPage
        ? StringtoBase64(documents[documents.length - 1]._id)
        : null,
      hasNextPage,
      totalCount: totalDocuments,
    },
  };
};

export default getPaginatedData;
