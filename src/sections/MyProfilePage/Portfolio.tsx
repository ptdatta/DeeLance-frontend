import Typography from "components/Typography";
import { BsThreeDotsVertical } from "react-icons/bs";
import LinesEllipsis from "react-lines-ellipsis";

const Card = ({ title, description, image }: any) => {
  return (
    <div className="rounded-lg border-1 border-white/50 overflow-hidden bg-woodsmoke-200 dark:bg-woodsmoke-900 cursor-pointer hover:translate-y-1">
      <div className="aspect-[1/.6] w-full bg-black">
        <img src={image} alt={title} className="object-cover w-full h-full" />
      </div>

      <div className="py-4 px-6">
        <Typography
          variant="sm"
          className="text-black/80 dark:text-white/80 mb-3"
        >
          <LinesEllipsis
            text={description}
            maxLine="2"
            ellipsis="..."
            trimRight
            basedOn="letters"
          />
        </Typography>

        <Typography variant="xl" className="ml-auto w-fit flex">
          <BsThreeDotsVertical />
        </Typography>
      </div>
    </div>
  );
};

function Portfolio() {
  // Dummy data as an array of objects
  const dummyData = [
    {
      title: "Project 1",
      description:
        "Crafting a stunning and responsive landing page design that captivates your audience. Elevate your brand with an elegant layout that leaves a lasting impression.",
      image: "/images/Portfolio/img1.png",
    },
    {
      title: "Project 2",
      description:
        "Designing a bespoke landing page that seamlessly adapts to all devices. Immerse your visitors in a visually appealing design, enhancing your online presence.",
      image: "/images/Portfolio/img2.png",
    },
    {
      title: "Project 3",
      description:
        "Building a user-friendly landing page design with modern features. Transform your online identity with a sophisticated layout that speaks volumes.",
      image: "/images/Portfolio/img3.png",
    },
    {
      title: "Project 4",
      description:
        "Crafting an engaging landing page with a focus on responsiveness. Imprint your brand in the digital realm with a sophisticated design.",
      image: "/images/Portfolio/img4.png",
    },
    {
      title: "Project 5",
      description:
        "Creating a visually appealing and responsive landing page design. Unleash the potential of your brand with a captivating layout that resonates with your audience.",
      image: "/images/Portfolio/img5.png",
    },
    {
      title: "Project 6",
      description:
        "Designing an impactful landing page with a touch of elegance. Elevate your online presence with a dynamic and responsive design that converts.",
      image: "/images/Portfolio/img6.png",
    },
    // Add more objects for additional dummy data
  ];

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-8">
      {dummyData.map((data, i) => (
        <Card
          key={i}
          title={data.title}
          description={data.description}
          image={data.image}
        />
      ))}
    </div>
  );
}

export default Portfolio;
