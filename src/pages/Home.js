import Container from "@mui/material/Container";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import TransactionChart from "../components/TransactionChart";
import TransactionForm from "../components/TransactionForm";
import TransactionsList from "../components/TransactionsList";
import { useSelector } from "react-redux";

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [editTransaction, setEditTransaction] = useState({});
  const { categories } = useSelector((state) => state.auth.user);

  useEffect(() => {
    fetchTransctions();
  }, []);

  async function fetchTransctions() {
    const token = Cookies.get("token");
    const res = await fetch(`${process.env.REACT_APP_API_URL}/transaction`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { data } = await res.json();
    setTransactions(data);
  }

  return (
    <Container>
      <TransactionChart data={transactions} />

      <TransactionForm
        fetchTransctions={fetchTransctions}
        editTransaction={editTransaction}
        categories={categories}
      />

      <TransactionsList
        data={transactions}
        fetchTransctions={fetchTransctions}
        setEditTransaction={setEditTransaction}
      />
    </Container>
  );
}
