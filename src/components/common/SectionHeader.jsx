import { Link } from "react-router-dom";

function SectionHeader({
  title,
  description,
  actionText,
  actionLink
}) {
  return (
    <div className="section-header">

      <div>
        <h2>{title}</h2>

        {description && (
          <p>{description}</p>
        )}
      </div>

      {actionText && actionLink && (
        <Link
          to={actionLink}
          className="section-action"
        >
          {actionText} →
        </Link>
      )}

    </div>
  );
}

export default SectionHeader;