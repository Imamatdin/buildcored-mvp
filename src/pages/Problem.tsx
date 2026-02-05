import { useParams, Navigate } from "react-router-dom";
import { getProblemById } from "@/lib/problems";
import ProblemForm from "@/components/ProblemForm";

export default function Problem() {
  const { id } = useParams<{ id: string }>();
  const problemId = parseInt(id || "0", 10);
  const problem = getProblemById(problemId);

  if (!problem) {
    return <Navigate to="/problems" replace />;
  }

  return <ProblemForm problem={problem} />;
}
