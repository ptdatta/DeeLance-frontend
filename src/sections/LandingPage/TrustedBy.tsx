import Typography from "components/Typography";
import useMediaQuery from "hooks/useMediaQuery";
import Marquee from "react-fast-marquee";
import { useTranslation } from "react-i18next";

const images = [
  {
    img: "/images/seen-on/beInCrypto.png",
    styles: { height: "2.6em" },
    link: "",
  },
  {
    img: "/images/seen-on/yahoo-finance.png",
    styles: { height: "2.6em" },
    link: "https://finance.yahoo.com/news/deelance-launches-worlds-first-fully-205800325.html",
  },
  {
    img: "/images/seen-on/insider.png",
    styles: { height: "2.2em" },
    link: "https://www.businessinsider.de/krypto/deelance-prognose/",
  },
  {
    img: "/images/seen-on/cryptonews.svg",
    styles: { height: "2.6em" },
    link: "https://cryptonews.com/news/will-deelance-dethrone-upwork-and-fiverr-as-the-go-to-freelance-marketplace-explore-its-web3-and-metaverse-advantages.htm",
  },
  {
    img: "/images/seen-on/finanzen-net.svg",
    styles: { height: "1.9em" },
    link: "",
  },
  {
    img: "/images/seen-on/cointelegraph.svg",
    styles: { height: "2.6em" },
    link: "",
  },
];

function TrustedBy() {
  const isAbove640px = useMediaQuery("(min-width : 640px)");
  const { t } = useTranslation();

  return (
    <section>
      <header className="container-wrapper">
        <Typography
          variant="2xl"
          className="max-lg:text-xl text-center text-woodsmoke-800 dark:text-white mb-10"
        >
          {t("Trusted by Top Brands")}
        </Typography>
      </header>

      <Marquee
        className="flex items-center justify-between text-[60%] sm:text-[90%] xl:text-[100%]"
        speed={isAbove640px ? 50 : 30}
        autoFill
      >
        {images.map((item, i) => {
          const imgStyle = {
            ...item?.styles,
          };

          return (
            <a
              href={item.link}
              rel="noreferrer"
              key={i}
              target="_blank"
              className="flex transition-all duration-200 mx-[1em] sm:mx-[2em]"
            >
              <img
                src={item.img}
                alt="deelance-partners"
                className="w-auto brightness-0 opacity-70 dark:invert"
                style={imgStyle}
              />
            </a>
          );
        })}
      </Marquee>
    </section>
  );
}

export default TrustedBy;
