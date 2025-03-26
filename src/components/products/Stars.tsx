import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";

const Stars = ({ rating }: { rating: number | null }) => {
  const actualRating = rating ?? 0;
  const fullStars = Math.floor(actualRating);
  const halfStars = actualRating % 1 !== 0; //// Czy jest pół gwiazdki?
  const emptyStars = 5 - Math.ceil(actualRating);

  return (
    <div className="flex justify-center gap-1">
      {Array(fullStars)
        .fill(null)
        .map((_, index) => {
          return (
            <FontAwesomeIcon
              key={`full-${index}`}
              icon={faStarSolid}
              className="text-amber-300"
            />
          );
        })}

      {halfStars && (
        <FontAwesomeIcon icon={faStarHalfAlt} className="text-amber-300" />
      )}

      {Array(emptyStars)
        .fill(null)
        .map((_, index) => {
          return (
            <FontAwesomeIcon
              key={`empty-${index}`}
              icon={faStarRegular}
              className="text-amber-300"
            />
          );
        })}
    </div>
  );
};

export default Stars;
