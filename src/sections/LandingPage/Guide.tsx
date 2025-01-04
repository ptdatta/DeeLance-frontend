import Typography from "components/Typography";
import useMediaQuery from "hooks/useMediaQuery";
import { useTranslation } from "react-i18next";

const Card = ({ showLine = true, title, disc }: any) => {
  return (
    <div className="flex space-x-4">
      <div className="flex flex-col items-center">
        <div className="w-4 h-4 rounded-full bg-black dark:bg-white" />
        {showLine ? (
          <div className="flex-1 w-[2px] bg-black dark:bg-white" />
        ) : null}
      </div>

      <main className="pb-8">
        <Typography variant="lg" className="mb-3 font-semibold mt-[-.3em]">
          {title}
        </Typography>

        <Typography className="opacity-80 lh-1_6">{disc}</Typography>
      </main>
    </div>
  );
};

function Guide() {
  const isAbove1024px = useMediaQuery("(min-width:1024px)");
  const { t } = useTranslation();

  return (
    <section className="container-wrapper">
      <header className="mb-6 lg:mb-10">
        <Typography
          variant="2xl"
          className="max-lg:text-lg text-green-haze-600 mb-2"
        >
          {t("Unlocking the Power of Web3:")}
        </Typography>
        <Typography variant="4xl" className="max-lg:text-3xl font-bold">
          {t("A Comprehensive Guide")}
        </Typography>
      </header>

      <main className="grid lg:grid-cols-[repeat(5,1fr)] lg:grid-rows-1 max-lg:gap-6 gap-10">
        <div
          style={{ gridRow: !isAbove1024px ? "auto" : "1 / 2 " }}
          className="lg:col-start-1 lg:col-end-4"
        >
          <img
            src="/images/guide-banner.png"
            className="rounded-md w-full object-cover"
            alt=""
          />
        </div>

        <div
          style={{ gridRow: !isAbove1024px ? "auto" : "1 / 2 " }}
          className="lg:col-start-3 lg:col-end-[-1] lg:pt-10"
        >
          <Typography className="relative lg:col-span-2 lg:row-span-1 lg:ml-[36%] mb-8">
            <img
              src="/images/water-drops.png"
              className="absolute bottom-full left-0 max-lg:hidden"
              alt=""
            />
            {t(
              "Welcome to our in-depth guide on understanding Web3, the next evolution of the internet. Web3 represents a groundbreaking shift in the digital landscape, emphasizing decentralized technologies, blockchain, and the empowerment of individuals. In this guide, we'll walk you through the core concepts, technologies, and possibilities of Web3, helping you grasp its significance and harness its potential. Whether you're a developer, a business owner, or simply curious about the future of the web, this guide will provide you with the knowledge and insights you need to navigate this exciting new digital frontier."
            )}
          </Typography>

          <div className="lg:col-start-2 lg:col-end-5 lg:row-start-3 lg:row-end-4 bg-green-haze-500 dark:bg-green-haze-700 rounded-md py-6 lg:py-8 px-6 lg:px-10">
            <Card
              title={t("Decentralization: The Core of Web 3.0")}
              disc={t(
                "Decentralization is the foundational principle of Web 3.0, shifting control from centralized entities to distributed networks. This approach empowers users, enhances security, and increases transparency. Key applications include blockchain technology, Decentralized Autonomous Organizations (DAOs), and Decentralized Applications (DApps), all contributing to a more user-centric internet experience."
              )}
            />
            <Card
              title={t("Tokenization: The Economic Engine")}
              disc={t(
                "Tokenization in Web 3.0 involves converting assets into digital tokens on a blockchain, revolutionizing asset management and ownership. It offers benefits like improved liquidity, fractional ownership, and streamlined transactions. This is evident in the growing popularity of Non-Fungible Tokens (NFTs) and security tokens, which represent unique digital or real-world assets and financial instruments, respectively."
              )}
            />
            <Card
              showLine={false}
              title={t("Privacy & Security: Paramount in Web 3.0")}
              disc={t(
                "In Web 3.0, privacy and security are more crucial than ever. Technologies like end-to-end encryption and zero-knowledge proofs protect user data, while secure identity management systems offer control over digital identities. Balancing scalability with security and navigating complex regulatory landscapes remain challenges, but they are essential for a safe and compliant digital environment"
              )}
            />
          </div>
        </div>
      </main>
    </section>
  );
}

export default Guide;
