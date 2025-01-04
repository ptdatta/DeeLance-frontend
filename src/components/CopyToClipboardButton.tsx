import { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { FaCopy, FaRegCopy } from "react-icons/fa";

function CopyToClipboardButton({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const [isCopied, setCopied] = useState(false);

  const handleCopy = () => {
    // copyToClipboard(text);
    setCopied(true);
  };

  useEffect(() => {
    let timeOut: any;
    if (isCopied === true) {
      new Promise((resolve) => {
        timeOut = setTimeout(() => {
          resolve("");
        }, 2000);
      }).then(() => {
        clearTimeout(timeOut);
        setCopied(false);
      });
    }
  }, [isCopied]);

  return (
    <CopyToClipboard text={text} onCopy={handleCopy}>
      <button type="button" className={className}>
        {isCopied ? <FaCopy /> : <FaRegCopy />}
      </button>
    </CopyToClipboard>
  );
}

export default CopyToClipboardButton;
