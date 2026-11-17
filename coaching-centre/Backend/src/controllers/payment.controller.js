const paymentModel = require("../models/payment");

// ==================== CREATE PAYMENT ====================

const createPayment = async (req, res) => {
  try {
    const {
      student,
      course,
      amount,
      status,
      transactionId,
    } = req.body;

    if (!student || !course || !amount) {
      return res.status(400).json({
        message: "Student, course and amount are required",
      });
    }

    const payment = await paymentModel.create({
      student,
      course,
      amount,
      status: status || "pending",
      transactionId,
    });

    const populatedPayment =
      await paymentModel
        .findById(payment._id)
        .populate("student", "name email")
        .populate("course", "title");

    res.status(201).json({
      message: "Payment created successfully",
      payment: populatedPayment,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ==================== GET ALL PAYMENTS - ADMIN ====================

const getAllPayments = async (req, res) => {
  try {

    const payments = await paymentModel
      .find()
      .populate("student", "name email")
      .populate("course", "title")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Payments fetched successfully",
      payments,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ==================== GET SINGLE PAYMENT ====================

const getPayment = async (req, res) => {
  try {

    const { id } = req.params;

    const payment = await paymentModel
      .findById(id)
      .populate("student", "name email")
      .populate("course", "title");

    if (!payment) {
      return res.status(404).json({
        message: "Payment not found",
      });
    }

    res.status(200).json({
      payment,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ==================== UPDATE PAYMENT ====================

const updatePayment = async (req, res) => {
  try {

    const { id } = req.params;

    const payment =
      await paymentModel.findByIdAndUpdate(
        id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      )
      .populate("student", "name email")
      .populate("course", "title");

    if (!payment) {
      return res.status(404).json({
        message: "Payment not found",
      });
    }

    res.status(200).json({
      message: "Payment updated successfully",
      payment,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ==================== DELETE PAYMENT ====================

const deletePayment = async (req, res) => {
  try {

    const { id } = req.params;

    const payment =
      await paymentModel.findByIdAndDelete(id);

    if (!payment) {
      return res.status(404).json({
        message: "Payment not found",
      });
    }

    res.status(200).json({
      message: "Payment deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
  createPayment,
  getAllPayments,
  getPayment,
  updatePayment,
  deletePayment,
};