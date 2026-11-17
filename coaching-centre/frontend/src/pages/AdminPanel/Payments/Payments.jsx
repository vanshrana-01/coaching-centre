import { useEffect, useState } from "react";
import api from "../../../api/axios";
import PaymentTable from "../PaymentTable/PaymentTable";
import "./Payments.css";

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingPayment, setEditingPayment] = useState(null);

  const [formData, setFormData] = useState({
    student: "",
    course: "",
    amount: "",
    status: "pending",
    transactionId: "",
  });

  // ================= GET PAYMENTS =================

  const getPayments = async () => {
    try {
      const response = await api.get("/payments");

      setPayments(response.data.payments || []);
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to load payments"
      );
    } finally {
      setLoading(false);
    }
  };

  // ================= GET USERS =================

  const getStudents = async () => {
    try {
      const response = await api.get("/admin/users");

      const users = response.data.users || [];

      setStudents(
        users.filter(
          (user) => user.role === "student"
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  // ================= GET COURSES =================

  const getCourses = async () => {
    try {
      const response = await api.get("/admin/courses");

      setCourses(
        response.data.courses || []
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPayments();
    getStudents();
    getCourses();
  }, []);

  // ================= INPUT CHANGE =================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= ADD PAYMENT =================

  const handleAddPayment = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(
        "/payments",
        {
          student: formData.student,
          course: formData.course,
          amount: Number(formData.amount),
          status: formData.status,
          transactionId:
            formData.transactionId,
        }
      );

      setPayments((prev) => [
        response.data.payment,
        ...prev,
      ]);

      alert("Payment added successfully");

      closeForm();

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to add payment"
      );
    }
  };

  // ================= EDIT PAYMENT =================

  const handleEdit = (payment) => {
    setEditingPayment(payment);

    setFormData({
      student: payment.student?._id || "",
      course: payment.course?._id || "",
      amount: payment.amount || "",
      status: payment.status || "pending",
      transactionId:
        payment.transactionId || "",
    });

    setShowForm(true);
  };

  // ================= UPDATE PAYMENT =================

  const handleUpdatePayment = async (e) => {
    e.preventDefault();

    try {
      const response = await api.put(
        `/payments/${editingPayment._id}`,
        {
          student: formData.student,
          course: formData.course,
          amount: Number(formData.amount),
          status: formData.status,
          transactionId:
            formData.transactionId,
        }
      );

      setPayments((prev) =>
        prev.map((payment) =>
          payment._id === editingPayment._id
            ? response.data.payment
            : payment
        )
      );

      alert("Payment updated successfully");

      closeForm();

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to update payment"
      );
    }
  };

  // ================= DELETE PAYMENT =================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this payment?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await api.delete(`/payments/${id}`);

      setPayments((prev) =>
        prev.filter(
          (payment) =>
            payment._id !== id
        )
      );

      alert("Payment deleted successfully");

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to delete payment"
      );
    }
  };

  // ================= CLOSE FORM =================

  const closeForm = () => {
    setShowForm(false);
    setEditingPayment(null);

    setFormData({
      student: "",
      course: "",
      amount: "",
      status: "pending",
      transactionId: "",
    });
  };

  // ================= SEARCH =================

  const filteredPayments = payments.filter(
    (payment) => {

      const student =
        payment.student?.name
          ?.toLowerCase() || "";

      const course =
        payment.course?.title
          ?.toLowerCase() || "";

      const text =
        search.toLowerCase();

      return (
        student.includes(text) ||
        course.includes(text)
      );
    }
  );

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="admin-payments">
        <h1>Payments</h1>
        <p>Loading payments...</p>
      </div>
    );
  }

  return (
    <div className="admin-payments">

      {/* HEADER */}

      <div className="payments-header">

        <div>
          <h1>Payments</h1>

          <p>
            Track and manage student fee payments.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingPayment(null);
            setShowForm(true);
          }}
        >
          + Add Payment
        </button>

      </div>


      {/* SUMMARY */}

      <div className="payment-summary">

        <div className="payment-summary-card">
          <span>Total Payments</span>

          <strong>
            {payments.length}
          </strong>
        </div>


        <div className="payment-summary-card">
          <span>Paid</span>

          <strong>
            {
              payments.filter(
                (p) => p.status === "paid"
              ).length
            }
          </strong>
        </div>


        <div className="payment-summary-card">
          <span>Pending</span>

          <strong>
            {
              payments.filter(
                (p) => p.status === "pending"
              ).length
            }
          </strong>
        </div>


        <div className="payment-summary-card">
          <span>Total Revenue</span>

          <strong>
            ₹
            {payments
              .filter(
                (p) => p.status === "paid"
              )
              .reduce(
                (total, p) =>
                  total +
                  Number(p.amount || 0),
                0
              )
              .toLocaleString("en-IN")}
          </strong>
        </div>

      </div>


      {/* SEARCH */}

      <input
        type="text"
        placeholder="Search student or course..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />


      {/* TABLE */}

      <PaymentTable
        payments={filteredPayments}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />


      {/* FORM */}

      {showForm && (

        <div className="payment-modal">

          <div className="payment-form">

            <div className="payment-form-header">

              <h2>
                {editingPayment
                  ? "Edit Payment"
                  : "Add Payment"}
              </h2>

              <button
                type="button"
                onClick={closeForm}
              >
                ×
              </button>

            </div>


            <form
              onSubmit={
                editingPayment
                  ? handleUpdatePayment
                  : handleAddPayment
              }
            >

              {/* STUDENT */}

              <div className="input-group">

                <label>
                  Student
                </label>

                <select
                  name="student"
                  value={formData.student}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select Student
                  </option>

                  {students.map((student) => (

                    <option
                      key={student._id}
                      value={student._id}
                    >
                      {student.name}
                    </option>

                  ))}

                </select>

              </div>


              {/* COURSE */}

              <div className="input-group">

                <label>
                  Course
                </label>

                <select
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select Course
                  </option>

                  {courses.map((course) => (

                    <option
                      key={course._id}
                      value={course._id}
                    >
                      {course.title}
                    </option>

                  ))}

                </select>

              </div>


              {/* AMOUNT */}

              <div className="input-group">

                <label>
                  Amount
                </label>

                <input
                  type="number"
                  name="amount"
                  placeholder="45000"
                  min="1"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* STATUS */}

              <div className="input-group">

                <label>
                  Status
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >

                  <option value="pending">
                    Pending
                  </option>

                  <option value="paid">
                    Paid
                  </option>

                  <option value="failed">
                    Failed
                  </option>

                </select>

              </div>


              {/* TRANSACTION ID */}

              <div className="input-group">

                <label>
                  Transaction ID
                </label>

                <input
                  type="text"
                  name="transactionId"
                  placeholder="TXN123456"
                  value={
                    formData.transactionId
                  }
                  onChange={handleChange}
                />

              </div>


              {/* BUTTONS */}

              <div className="payment-form-actions">

                <button
                  type="button"
                  onClick={closeForm}
                >
                  Cancel
                </button>

                <button type="submit">

                  {editingPayment
                    ? "Update Payment"
                    : "Add Payment"}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
};

export default Payments;