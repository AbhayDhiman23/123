const Setting = require("../models/Setting");
const joi = require("joi");

const addSetting = async (req, res) => {
  try {
    const schema = joi.object({
      name: joi.string().required().max(30).min(2),
      value: joi.string().required().max(250).min(1),
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const { name, value } = req.body;
    const settingExists = await Setting.findOne({ name: name });

    if (settingExists)
      return res.status(400).json(`Setting ${name} already exists`);

    const new_setting = new Setting({
      name,
      value,
    });

    await new_setting.save();
    return res.status(200).json("Setting has been saved.");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getSettings = async (req, res) => {
  try {
    const settings = await Setting.find();
    return res.status(200).json(settings);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getSetting = async (req, res) => {
  try {
    const id = req.params.id;

    const setting = await Setting.findById(id);

    if (!setting)
      return res.status(404).json(`Setting with ${id} does not exist.`);

    return res.status(200).json(setting);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const updateSetting = async (req, res) => {
  try {
    const id = req.params.id;

    const schema = joi.object({
      name: joi.string().required().max(30).min(2),
      value: joi.string().required().max(250).min(1),
    });

    const { error } = schema.validate(req.body);

    if (error) return res.status(400).json(error.details[0].message);

    const { name, value } = req.body;
    const settingCheck = await Setting.findByIdAndUpdate(
      id,
      { name, value },
      { new: true }
    );

    if (!settingCheck)
      return res.status(404).json(`Setting with ${id} does not exist.`);

    return res.status(200).json("Setting has been updated.");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const deleteSetting = async (req, res) => {
  try {
    const id = req.params.id;

    const settingCheck = await Setting.findById(id);

    if (!settingCheck)
      return res.status(404).json(`Setting with ${id} does not exist.`);

    await Setting.findByIdAndDelete(id);

    return res.status(200).json("Setting has been deleted.");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  addSetting,
  getSettings,
  getSetting,
  updateSetting,
  deleteSetting,
};
