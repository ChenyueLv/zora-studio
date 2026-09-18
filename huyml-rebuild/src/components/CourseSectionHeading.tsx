import type { ReactNode } from "react";

/** Shared title hierarchy for every section of the course website. */
export function CourseSectionHeading({
  id,
  title,
  description,
}: {
  id: string;
  title: string;
  description: ReactNode;
}) {
  return (
    <header className="course-section-heading">
      <h2 id={id}>{title}</h2>
      <p>{description}</p>
    </header>
  );
}
