import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar, faStarHalfAlt as solidStarHalf} from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStarOutline } from '@fortawesome/free-regular-svg-icons';

const StarRating = ({ score }) => {
  const maxStars = 5;
  const roundedScore = Math.round(score * 2) / 2; // Round to the nearest 0.5
  const fullStars = Math.floor(roundedScore);
  const halfStar = roundedScore % 1 !== 0;

  const starIcons = [];

  // Full stars
  for (let i = 0; i < fullStars; i++) {
    starIcons.push(<FontAwesomeIcon key={i} icon={solidStar} color="gold" />);
  }

  // Half star
  if (halfStar) {
    starIcons.push(<FontAwesomeIcon key="half" icon={solidStarHalf} color="gold" />);
  }

  // Remaining empty stars
  for (let i = starIcons.length; i < maxStars; i++) {
    starIcons.push(<FontAwesomeIcon key={i} icon={regularStarOutline} color="gold" />);
  }

  return <div>{starIcons}</div>;
};

export default StarRating;
