import Avatar from "./Avatar";
import Button from "./Button";
import Paper from "./Paper";
import Typography from "./Typography";

function WalletNftCollection() {
  return (
    <Paper>
      <div className="flex items-center justify-between mb-8">
        <Typography variant="xl" className="font-medium">
          NFT Collection
        </Typography>

        <Button size="sm">+ Add Tokens</Button>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {new Array(12).fill("").map((_, i) => (
          <Avatar key={i} title="5 Artworks" subtitle="Ethereum Blockchain" />
        ))}
      </div>
    </Paper>
  );
}

export default WalletNftCollection;
