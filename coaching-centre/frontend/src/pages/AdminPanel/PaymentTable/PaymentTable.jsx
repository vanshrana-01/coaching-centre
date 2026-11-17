import "./PaymentTable.css";

const PaymentTable = ({
  payments,
  onEdit,
  onDelete,
}) => {

  return (
    <div className="payment-table-wrapper">

      <table className="payment-table">

        <thead>
          <tr>
            <th>Student</th>
            <th>Course</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Status</th>
            <th>Transaction ID</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {payments.map((payment) => (

            <tr key={payment._id}>

              <td>

                <div className="payment-student">

                  <div className="payment-avatar">
                    {payment.student?.name
                      ?.charAt(0)
                      ?.toUpperCase()}
                  </div>

                  <div>

                    <strong>
                      {payment.student?.name ||
                        "Unknown Student"}
                    </strong>

                    <small>
                      {payment.student?.email ||
                        ""}
                    </small>

                  </div>

                </div>

              </td>


              <td>
                {payment.course?.title ||
                  "Unknown Course"}
              </td>


              <td>
                ₹
                {Number(
                  payment.amount || 0
                ).toLocaleString("en-IN")}
              </td>


              <td>
                {payment.paymentDate
                  ? new Date(
                      payment.paymentDate
                    ).toLocaleDateString(
                      "en-IN"
                    )
                  : "N/A"}
              </td>


              <td>

                <span
                  className={`payment-status ${payment.status}`}
                >
                  {payment.status
                    ?.charAt(0)
                    ?.toUpperCase() +
                    payment.status?.slice(1)}
                </span>

              </td>


              <td>
                {payment.transactionId ||
                  "N/A"}
              </td>


              <td>

                <button
                  className="edit-payment-btn"
                  onClick={() =>
                    onEdit(payment)
                  }
                >
                  Edit
                </button>

                <button
                  className="delete-payment-btn"
                  onClick={() =>
                    onDelete(payment._id)
                  }
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default PaymentTable;