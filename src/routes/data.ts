import { useLocation, NavLink } from "react-router-dom";

let invoices: Array<Invoice> = [
    {
      name: "Santa Monica",
      number: 1995,
      amount: "$10,800",
      due: "12/05/1995",
    },
    {
      name: "Stankonia",
      number: 2000,
      amount: "$8,000",
      due: "10/31/2000",
    },
    {
      name: "Ocean Avenue",
      number: 2003,
      amount: "$9,500",
      due: "07/22/2003",
    },
    {
      name: "Tubthumper",
      number: 1997,
      amount: "$14,000",
      due: "09/01/1997",
    },
    {
      name: "Wide Open Spaces",
      number: 1998,
      amount: "$4,600",
      due: "01/27/1998",
    },
];


export type Invoice = {
    name: string,
    number: number,
    amount: string,
    due: string
}

export function getInvoices(): Array<Invoice> {
    return invoices;
}

export function getInvoice(number: number): Invoice {
    return invoices.find(
      (invoice) => invoice.number === number
    )!;
}

export function deleteInvoice(number: number) {
    invoices = invoices.filter(
      (invoice) => invoice.number !== number
    );
}