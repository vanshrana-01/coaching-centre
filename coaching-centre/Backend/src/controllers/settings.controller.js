const settingsModel = require("../models/settings");

// ================= GET SETTINGS =================

const getSettings = async (req, res) => {
  try {
    let settings = await settingsModel.findOne();

    // Agar settings nahi hain to create karo
    if (!settings) {
      settings = await settingsModel.create({});
    }

    res.status(200).json({
      message: "Settings fetched successfully",
      settings,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ================= UPDATE SETTINGS =================

const updateSettings = async (req, res) => {
  try {
    const {
      emailNotifications,
      smsNotifications,
      maintenanceMode,
    } = req.body;

    let settings = await settingsModel.findOne();

    if (!settings) {
      settings = await settingsModel.create({
        emailNotifications,
        smsNotifications,
        maintenanceMode,
      });
    } else {
      settings.emailNotifications =
        emailNotifications ?? settings.emailNotifications;

      settings.smsNotifications =
        smsNotifications ?? settings.smsNotifications;

      settings.maintenanceMode =
        maintenanceMode ?? settings.maintenanceMode;

      await settings.save();
    }

    res.status(200).json({
      message: "Settings updated successfully",
      settings,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
  getSettings,
  updateSettings,
};