import Typography from "./Typography";

function MilestoneSubmittedCard() {
  return (
    <div className="p-5 rounded-md bg-woodsmoke-900">
      <Typography variant="lg" className="mb-3">
        Milestone 01
      </Typography>

      <Typography variant="base" className="mb-5 text-white/60">
        Lorem ipsum dolor sit amet consectetur. Ultrices curabitur lobortis
        pharetra id nisi. Eu justo justo econsequat nisl. Turpis ipsum
        consectetur elit tempus. Lorem ipsum dolor sit amet consectetur.
        Ultrices curabitur lobortis pharetra id nisi. Eu justo justo econsequat
        nisl.{" "}
      </Typography>

      <div className="flex items-center flex-wrap [&>*]:m-3 -m-3">
        <div>
          <Typography>Due Date: 12 may 2022</Typography>
        </div>
        <div>
          <Typography>Amount: $450</Typography>
        </div>
      </div>
    </div>
  );
}

export default MilestoneSubmittedCard;
