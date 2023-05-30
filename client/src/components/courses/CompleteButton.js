import { useNavigate } from "react-router-dom";

function CompleteAndContinueButton(props) {
  const navigate = useNavigate();
  function completeAndContinue() {
    navigate(`/courses/${props.courseId}/lessons/${props.lessonId}`);
  }
  return (
    <button
      onClick={completeAndContinue}
      style={{
        backgroundColor: "#ccc",
        border: "none",
        padding: "0.7rem",
        cursor: "pointer",
        borderRadius: "5px",
      }}
    >
      Complete and continue
    </button>
  );
}

export default CompleteAndContinueButton;
