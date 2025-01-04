import {
  FaYoutube,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import Typography from "./Typography";
import Logo from "./Logo";

function Footer() {
  return (
    <footer className="bg-white dark:bg-woodsmoke-950 pt-10 lg:pt-14 dark:text-white/80 text-black/80 shadow-2xl shadow-black">
      <div className="container-wrapper">
        <main className="grid grid-cols-[1fr_auto] lg:grid-cols-[1fr_1fr_1fr_1fr_auto] justify-between gap-8 lg:gap-16">
          <div className="flex flex-col max-lg:items-center justify-between items-start max-lg:col-span-2 max-lg:pb-4">
            {/* <img src="/images/logo.svg" className="h-10 mb-6" alt="" /> */}
            <Logo className="h-9 mb-8" />

            <div className="flex items-center [&>*:not(:last-child)]:me-4 text-xl">
              <a href="/">
                <FaYoutube />
              </a>
              <a href="/">
                <FaInstagram />
              </a>
              <a href="/">
                <FaFacebook />
              </a>
              <a href="/">
                <FaTwitter />
              </a>
              <a href="/">
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          <div className="pt-3">
            <Typography
              variant="xl"
              className="text-green-haze-600 font-medium mb-6"
              asChild
            >
              <h4>{"Company"}</h4>
            </Typography>

            <div className="space-y-4 flex flex-col">
              <Typography asChild>
                <a
                  href="https://academy.deelance.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  {"Academy"}
                </a>
              </Typography>
              <Typography asChild>
                <a
                  rel="noreferrer"
                  href="https://academy.deelance.com/"
                  target="_blank"
                >
                  {"Blog"}
                </a>
              </Typography>
              <Typography asChild>
                <a
                  href="https://deelance.com/en/team"
                  target="_blank"
                  rel="noreferrer"
                >
                  {"Team"}
                </a>
              </Typography>
            </div>
          </div>

          <div className="pt-3">
            <Typography
              variant="xl"
              className="text-green-haze-600 font-medium mb-6"
            >
              {"Our Products"}
            </Typography>

            <div className="space-y-4 flex flex-col">
              <Typography asChild>
                <a
                  href="https://faucet.deelance.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  {"Faucet"}
                </a>
              </Typography>
              <Typography asChild>
                <a
                  href="https://testnet.deelance.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  {"Deelance Testnet"}
                </a>
              </Typography>
              <Typography asChild>
                <a
                  href="https://stake.deelance.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  {"Staking Platform"}
                </a>
              </Typography>
              <Typography asChild>
                <a
                  href="https://rewards.deelance.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  {"Withdraw"}
                </a>
              </Typography>
              <Typography asChild>
                <a
                  href="https://nft.deelance.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Nfts
                </a>
              </Typography>
            </div>
          </div>

          <div className="pt-3">
            <Typography
              variant="xl"
              className="text-green-haze-600 font-medium mb-6"
            >
              {"Contact"}
            </Typography>

            <div className="space-y-4">
              <Typography>{"Chat"}</Typography>
              <Typography>{"Metaverse"}</Typography>
            </div>
          </div>

          <div className="pt-3">
            <Typography
              variant="xl"
              className="text-green-haze-600 font-medium mb-6"
            >
              {"Find"}
            </Typography>

            <div className="space-y-4">
              <Typography>
                {" "}
                <a href="/">{"Freelancers"}</a>
              </Typography>
              <Typography>
                <a href="/">{"Jobs"}</a>
              </Typography>
            </div>
          </div>
        </main>

        <hr className="opacity-40 mt-12" />

        <div className="py-8 flex max-lg:flex-col items-center justify-between dark:text-white/60 text-black/60 space-y-5">
          <div className="flex flex-wrap items-center [&>*]:mx-3 [&>*]:my-1 -my-1 -mx-3 max-lg:justify-center ">
            <Typography asChild>
              <a href="/privacy&policy" target="_blank">
                {"Cookies Policy"}
              </a>
            </Typography>
            <Typography asChild>
              <a href="/privacy&policy" target="_blank">
                {"Privacy Policy"}
              </a>
            </Typography>
            <Typography asChild>
              <a href="/terms" target="_blank">
                {"Terms & Conditions"}
              </a>
            </Typography>
          </div>

          <Typography>{"© 2023-24, deelance. All Right Reserved"}</Typography>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
