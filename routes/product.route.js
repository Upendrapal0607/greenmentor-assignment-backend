
const {mysqlConnection} = require("../config/db")
const express = require("express")

const productRoute = express.Router();

productRoute.get("/",async(req,res)=>{
    
    try {
        const {page,limit} = req.query;
    // This is currect code but it were give me error during the deployment process
    const pageSize = page || 1;
    const pageLimit = limit || 6;
    const offset = (pageSize - 1) * pageLimit;
    const products = await mysqlConnection({
      query: `SELECT * FROM products LIMIT ${pageLimit} OFFSET ${offset}`,
      values: [],
    });

    const Totalproducts = await mysqlConnection({
      query: `SELECT * FROM products`,
      values: [],
    });

    const responseData = {
      data: products,
      total: Totalproducts.length,
      limit: pageLimit,
      page: pageSize,
    };
    const data = JSON.stringify(responseData);

   res.status(200).send(data);

  } catch (error) {
    console.error(error);
    res.status(500).send({message: "Error occurred",error});
  }

}) 

module.exports = {productRoute}