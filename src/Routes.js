import PaymentForm from "./Components/PaymentsTab";
import ReceiptsTable from "./Components/Table.js";

export const RouteList = [
  {
    id: "payments",
    path: "/app/Payments",
    element: <PaymentForm />,
  },
  {
    id: "receipts",
    path: "/app/Receipts",
    element: <ReceiptsTable />,
  },
];
