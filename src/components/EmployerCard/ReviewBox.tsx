import StarRating from "components/StarRating";
import Typography from "components/Typography";

function ReviewBox() {
  return (
    <div className="border-b-1 border-s-woodsmoke-600 mb-5">
      <div className="flex justify-between items-center">
        <Typography className=" text-xl font-semibold my-3">
          Roberto.b
        </Typography>
        <Typography className="text-sm text-white/40">Dec 7, 2022</Typography>
      </div>
      <div className="flex items-center gap-2">
        <StarRating />
        <p className=" text-white/40 text-xs">(15)</p>
      </div>
      <Typography className=" text-sm font-normal my-4">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio aperiam
        at rem recusandae. Voluptatem, laudantium officiis, optio provident
        consectetur dolor exercitationem nobis rerum esse incidunt quaerat
        recusandae harum voluptas libero?
      </Typography>
      <Typography className=" text-sm font-normal my-4">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio aperiam
        at rem recusandae. Voluptatem, laudantium officiis, optio provident
        consectetur dolor exercitationem nobis rerum esse incidunt quaerat
        recusandae harum voluptas libero?
      </Typography>
    </div>
  );
}

export default ReviewBox;
