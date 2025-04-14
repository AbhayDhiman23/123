const Product = require("../models/Product");
const joi = require("joi");
const cloudinary = require("../config/cloudinary.config");

// Add a new product
const addProduct = async (req, res) => {
  try {
    const schema = joi.object({
      brandName: joi.string().required().max(50).min(2),
      category: joi.string().required(),
      productType: joi.string().required().max(50).min(2),
      itemTitle: joi.string().required().max(50).min(2),
      itemNickName: joi.string().required().max(30).min(2),
      materialCode: joi.string().required().max(30),
      skuId: joi.string().required().max(30),
      mappingId: joi.string().required().max(30),
      mrp: joi.string().required(),
      basicPrice: joi.string().required(),
      image: joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const {
      brandName,
      category,
      productType,
      itemTitle,
      itemNickName,
      materialCode,
      skuId,
      mappingId,
      mrp,
      basicPrice,
      image,
    } = req.body;

    const productExists = await Product.findOne({ skuId });
    if (productExists)
      return res.status(400).json(`Product with SKU ID ${skuId} already exists`);

    const result = await cloudinary.uploader.upload(image);

    const newProduct = new Product({
      brandName,
      category,
      productType,
      itemTitle,
      itemNickName,
      materialCode,
      skuId,
      mappingId,
      mrp,
      basicPrice,
      image: result.secure_url,
    });

    await newProduct.save();
    return res.status(200).json("Product has been saved.");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// Get a product by ID
const getProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const product = await Product.findById(id);

    if (!product)
      return res.status(404).json(`Product with ID ${id} does not exist.`);

    return res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// Update a product
const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const schema = joi.object({
      brandName: joi.string().required().max(50).min(2),
      category: joi.string().required(),
      productType: joi.string().required().max(50).min(2),
      itemTitle: joi.string().required().max(50).min(2),
      itemNickName: joi.string().required().max(30).min(2),
      materialCode: joi.string().required().max(30),
      skuId: joi.string().required().max(30),
      mappingId: joi.string().required().max(30),
      mrp: joi.string().required(),
      basicPrice: joi.string().required(),
      image: joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const {
      brandName,
      category,
      productType,
      itemTitle,
      itemNickName,
      materialCode,
      skuId,
      mappingId,
      mrp,
      basicPrice,
      image,
    } = req.body;

    const productCheck = await Product.findByIdAndUpdate(
      id,
      {
        brandName,
        category,
        productType,
        itemTitle,
        itemNickName,
        materialCode,
        skuId,
        mappingId,
        mrp,
        basicPrice,
        image,
      },
      { new: true }
    );

    if (!productCheck)
      return res.status(404).json(`Product with ID ${id} does not exist.`);

    return res.status(200).json("Product has been updated.");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const productCheck = await Product.findById(id);

    if (!productCheck)
      return res.status(404).json(`Product with ID ${id} does not exist.`);

    await Product.findByIdAndDelete(id);

    return res.status(200).json("Product has been deleted.");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
