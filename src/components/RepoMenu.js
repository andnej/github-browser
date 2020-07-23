import React, { useEffect } from "react";
import { useIterator } from "../hooks";

export function RepoMenu({
  repositories,
  repo,
  onSelect = f => f
}) {
  const index = repositories.map(repository=>repository.name).indexOf(repo);
  const [{ name }, prev, next] = useIterator(repositories, index);

  useEffect(() => {
    if (!name) return;
    onSelect({ name });
  }, [name, onSelect]);

  return(
    <div style={{ display: 'flex'}}>
      <button id="prevButton" onClick={prev}>&lt;</button>
      <p>{name}</p>
      <button id="nextButton" onClick={next}>&gt;</button>
    </div>
  );
}