import CopyToClipboardButton from "components/CopyToClipboardButton";
import Paper from "components/Paper";
import Typography from "components/Typography";
import WalletNftCollection from "components/WalletNftCollection";
import WalletTxHistory from "components/WalletTxHistory";

function Overview() {
  return (
    <div className="grid grid-cols-5 gap-6">
      <Paper>
        <Typography variant="lg" className="font-medium mb-1">
          Wallet Balance
        </Typography>
        <Typography className="text-black/60 dark:text-white/60">
          0.0000 Dlancee
        </Typography>
      </Paper>
      <Paper>
        <Typography variant="lg" className="font-medium mb-1">
          Wallet Balance
        </Typography>
        <Typography className="text-black/60 dark:text-white/60">
          0.0000 Dlancee
        </Typography>
      </Paper>
      <Paper>
        <Typography variant="lg" className="font-medium mb-1">
          Wallet Balance
        </Typography>
        <Typography className="text-black/60 dark:text-white/60">
          0.0000 Dlancee
        </Typography>
      </Paper>
      <Paper className="col-span-2 overflow-hidden relative">
        <Typography variant="lg" className="font-medium mb-1">
          Your ETH Address
        </Typography>

        <div className="flex items-center space-x-3 w-full min-w-full max-w-full">
          <Typography
            variant="base"
            className="flex-1 text-black/60 dark:text-white/60 rounded-lg text-ellipsis overflow-hidden"
          >
            0x8EF188Fc03f25eA19e2a48167d3420x8EF188Fc03f25eA19e2a48167d342
          </Typography>

          <div className="flex-shrink-0">
            <CopyToClipboardButton
              className="flex text-xl justify-end"
              text="0x8EF188Fc03f25eA19e2a48167d3420x8EF188Fc03f25eA19e2a48167d342"
            />
          </div>
        </div>
      </Paper>

      <div className="col-span-5">
        <WalletNftCollection />
      </div>

      <div className="col-span-5">
        <WalletTxHistory
          title="Received History"
          subtitle="Showing latest history"
        />{" "}
      </div>

      <div className="col-span-5">
        <WalletTxHistory
          title="Sent History"
          subtitle="Showing latest history"
        />{" "}
      </div>
    </div>
  );
}

export default Overview;
