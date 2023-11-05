import { FaStar, FaRegStar } from "react-icons/fa6";

const LawyerRating = ({ rating }: { rating: number }) => {
  const max = 5;
  const stars = [];

  for (let i = 1; i <= max; i++) {
    i <= rating
      ? stars.push(<FaStar key={i} />)
      : stars.push(<FaRegStar key={i} />);
  }

  return <div className="flex gap-[2px]">{stars}</div>;
};

export default LawyerRating;
