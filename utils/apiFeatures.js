class ApiFeature {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };

    // const removeFields = ["keyword", "page", "limit"];

    // removeFields.forEach((key) => delete queryCopy[key]);

    //Filter by price

    let queryStr = JSON.stringify(queryCopy);

    console.log(queryStr)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));
    console.log(this)
    return this;
  }

 
}

export default ApiFeature;
