import Button from "components/Button";
import Typography from "components/Typography";
import { FiExternalLink } from "react-icons/fi";

function LevarageNfts() {
  return (
    <section className="container-wrapper grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      <aside>
        <img
          src="/images/3-nfts.png"
          className="w-full drop-shadow-2xl"
          alt=""
        />
      </aside>

      <main>
        <Typography
          variant="4xl"
          className="max-lg:text-3xl uppercase font-black text-woodsmoke-800 dark:text-white tracking-widest mb-5"
        >
          {"Leverage NFTS"}
        </Typography>

        <Typography variant="lg" className="max-lg:text-base mb-6 opacity-80">
          {
            "Explore the potential of Non-Fungible Tokens to revolutionize ownership, creativity, and digital assets. NFTs are changing the way we value and interact with unique digital content, offering opportunities for artists, collectors, and creators to unlock new possibilities in the digital realm."
          }
        </Typography>

        <Button
          asChild
          endIcon={<FiExternalLink />}
          className="space-x-[0.6em] w-fit"
          variant="outlined"
        >
          <a target="_blank" href="https://nft.deelance.com/" rel="noreferrer">
            {"Buy NFTS"}
          </a>
        </Button>
      </main>
    </section>
  );
}

export default LevarageNfts;
