// single expense initial values
export const initialValues = {
  date: "",
  merchant_id: null,
  total_amount: "",
  currency_id: null,
  claim_reimbursement: true,
  reference_number: "",
  report_id: "",
  tag_id: "",
  paid_id: "",
  itemize: false,
  tax_inclusive: false,
  description: "",
  expense_details: [
    {
      category_id: "",
      description: "",
      tax_id: "",
      amount: "",
      tag_id: "",
    },
    {
      category_id: "",
      description: "",
      tax_id: "",
      amount: "",
      tag_id: "",
    },
  ],
  total_expense: "",
};

// bulk expense initial values
export const initialBulkValues = {
  bulk_expenses: [
    {
      date: "",
      category_id: null,
      description: "",
      tax_id: null,
      total_amount: "",
      tag_id: null,
    },
  ],
};
