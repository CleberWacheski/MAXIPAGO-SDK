export type OrdersQuery = {
   filterOptions: FilterOptionsByOrders;
};

type FilterOptionsByOrders = {
   period: "today" | "yesterday" | "lastmonth" | "thismonth" | "range";
   pageSize: number;
   startDate: string;
   endDate: string;
   startTime: string;
   endTime: string;
   orderByDirection: "asc" | "desc";
   pageToken: string;
   pageNumber: number;
};

export type OrderQuery = {
   filterOptions: FilterOptionsByOrder;
};

type FilterOptionsByOrder = {
   orderId: string;
};
