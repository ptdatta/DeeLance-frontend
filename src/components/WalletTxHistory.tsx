import Paper from "./Paper";
import Table from "./Table";
import Typography from "./Typography";

function WalletTxHistory({ title, subtitle }: any) {
  return (
    <Paper>
      {title ? (
        <Typography variant="xl" className="font-medium mb-1">
          {title}
        </Typography>
      ) : null}

      {subtitle ? (
        <Typography
          variant="sm"
          className="text-black/60 dark:text-white/60 mb-6"
        >
          {subtitle}
        </Typography>
      ) : null}

      <Table
        variant={1}
        headings={[
          "Transaction ID",
          "Amount (ETH)",
          "Received From",
          "Confirmation",
          "Time (UTC)",
        ]}
        tableItems={[
          [
            <Typography key="1" variant="sm">
              #02918
            </Typography>,
            <Typography key="1" variant="sm">
              0.00000000 BTC
            </Typography>,
            <Typography key="1" variant="sm">
              John
            </Typography>,
            <Typography key="1" variant="sm">
              John
            </Typography>,
            <Typography key="1" variant="sm">
              5:17 PM PST
            </Typography>,
          ],
          [
            <Typography key="1" variant="sm">
              #02918
            </Typography>,
            <Typography key="1" variant="sm">
              0.00000000 BTC
            </Typography>,
            <Typography key="1" variant="sm">
              John
            </Typography>,
            <Typography key="1" variant="sm">
              John
            </Typography>,
            <Typography key="1" variant="sm">
              5:17 PM PST
            </Typography>,
          ],
          [
            <Typography key="1" variant="sm">
              #02918
            </Typography>,
            <Typography key="1" variant="sm">
              0.00000000 BTC
            </Typography>,
            <Typography key="1" variant="sm">
              John
            </Typography>,
            <Typography key="1" variant="sm">
              John
            </Typography>,
            <Typography key="1" variant="sm">
              5:17 PM PST
            </Typography>,
          ],
        ]}
      />
    </Paper>
  );
}

export default WalletTxHistory;
