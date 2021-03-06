const Product = require("../models/product.model");

module.exports.findAllProducts = (req, res) => {
  Product.find()
    .then((allProducts) => res.json({ products: allProducts }))
    .catch((err) => res.json({ message: "Something went wrong", error: err }));
};

module.exports.findOneSingleProduct = (req, res) => {
  Product.findOne({ _id: req.params.id })
    .then((oneSingleProduct) => res.json({ product: oneSingleProduct }))
    .catch((err) => res.json({ message: "Something went wrong", error: err }));
};

module.exports.createNewProduct = (req, res) => {
  const { data } = req.body;
  Product.create(data)
    .then((newlyCreatedProduct) => res.json({ product: newlyCreatedProduct }))
    .catch((err) =>
      res.status(400).json({ message: "Something went wrong", error: err })
    );
};

module.exports.updateExistingProduct = async (req, res) => {
  Product.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    {
      new: true,
      runValidators: true,
    },
    function (err, model) {
      if (err) {
        return res
          .status(422)
          .json({ message: "Something went wrong", error: err });
      }
    }
  )
    .then((updatedProduct) => res.json({ product: updatedProduct }))
    .catch((err) => res.json({ message: "Something went wrong", error: err }));
};

module.exports.deleteAnExistingProduct = (req, res) => {
  Product.deleteOne({ _id: req.params.id })
    .then((result) => res.json({ result: result }))
    .catch((err) => res.json({ message: "Something went wrong", error: err }));
};
