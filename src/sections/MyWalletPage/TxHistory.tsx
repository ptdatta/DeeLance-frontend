import WalletTxHistory from "components/WalletTxHistory";

function TxHistory() {
  return (
    <div className="space-y-6">
      <WalletTxHistory
        title="Received History"
        subtitle="Showing latest history"
      />

      <WalletTxHistory title="Sent History" subtitle="Showing latest history" />
    </div>
  );
}

export default TxHistory;
