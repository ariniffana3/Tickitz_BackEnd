const helperWrapper = require("../../helper/wrapper");
const movieModel = require("./movieModel");

module.exports = {
  getAllMovie: async (request, response) => {
    try {
      let { page, limit, sort, search } = request.query;
      page = Number(page);
      limit = Number(limit);
      const offset = page * limit - limit;
      const totalData = await movieModel.getCountMovie();
      const totalPage = Math.ceil(totalData / limit);
      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData,
      };
      const result = await movieModel.getAllMovie(limit, offset, sort, search);
      return helperWrapper.response(
        response,
        200,
        "succes get data !",
        result,
        pageInfo
      );
    } catch (error) {
      console.log(error);
      return helperWrapper.response(response, 400, "bad request", null);
    }
  },
  getMovieById: async (request, response) => {
    try {
      const { id } = request.params;
      const result = await movieModel.getMovieById(id);

      if (result.length <= 0) {
        return helperWrapper.response(
          response,
          404,
          `Data by Id${id} not found`,
          null
        );
      }
      return helperWrapper.response(response, 200, "succes get data !", result);

      //   response.status(200);
      //   response.send("hello world");
    } catch (error) {
      return helperWrapper.response(response, 400, "bad request", null);
    }
  },
  createMovie: async (request, response) => {
    try {
      const { name, category, synopsis } = request.body;
      const setData = {
        name,
        category,
        synopsis,
      };
      const result = await movieModel.createMovie(setData);
      return helperWrapper.response(
        response,
        200,
        "Success create data !",
        result
      );
    } catch (error) {
      return helperWrapper.response(response, 400, "bad request", null);
    }
  },
  updateMovie: async (request, response) => {
    try {
      //   response.status(200);
      //   response.send("hello world");
      const { id } = request.params;
      const { name, category, synopsis } = request.body;
      const resultt = await movieModel.getMovieById(id);

      if (resultt.length <= 0) {
        return helperWrapper.response(
          response,
          404,
          `Data by Id${id} not found`,
          null
        );
      }
      const newData = {
        name,
        category,
        synopsis,
        updatedAt: new Date(Date.now()),
      };
      for (const data in newData) {
        if (!newData) {
          delete newData[data];
        }
      }
      const result = await movieModel.updateMovie(id, newData);
      return helperWrapper.response(
        response,
        200,
        "succes update data !",
        result
      );
    } catch (error) {
      return helperWrapper.response(response, 400, "bad request", null);
    }
  },
  deleteMovie: async (request, response) => {
    try {
      const { id } = request.params;
      const resultt = await movieModel.getMovieById(id);

      if (resultt.length <= 0) {
        return helperWrapper.response(
          response,
          404,
          `Data by Id ${id} not found`,
          null
        );
      }
      const result = await movieModel.deleteMovie(id);
      return helperWrapper.response(
        response,
        200,
        "succes delete data !",
        result
      );
    } catch (error) {
      return helperWrapper.response(response, 400, "bad request", null);
    }
  },
};
