const express = require("express");
const router = express.Router();
const upload = require("../utils/imageUpload");
const { protect } = require("../middleware/authMiddleware");
const cloudinary = require("../config/cloudinary.config");
const Product = require("../models/Product");

// Route for creating a product
router.post("/create", upload.single("image"), protect, async (req, res) => {
  try {
    const schema = joi.object({
      brandName: joi.string().required().max(30).min(2),
      category: joi.string().required(),
      productType: joi.string().required(),
      itemTitle: joi.string().required().max(50).min(2),
      itemNickName: joi.string().max(30),
      materialCode: joi.string().required(),
      skuId: joi.string().required(),
      mappingId: joi.string().required(),
      mrp: joi.number().required(),
      basicPrice: joi.number().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

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
    } = req.body;

    // Check if the product already exists
    const productExists = await Product.findOne({ skuId });
    if (productExists) return res.status(400).json({ message: "Product already exists" });

    // Upload image to Cloudinary
    let imageUrl = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "products",
      });
      imageUrl = result.secure_url;
    }

    // Create a new product
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
      image: imageUrl,
    });

    await newProduct.save();
    return res.status(201).json({ message: "Product has been saved." });
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
