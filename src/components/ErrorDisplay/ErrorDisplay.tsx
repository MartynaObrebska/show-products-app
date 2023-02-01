interface Props {
  errorMessage: "server-error" | "bad-request";
}
export default function ErrorDisplay(props: Props) {
  const { errorMessage } = props;

  return (
    <div className="app">
      {errorMessage}! code {errorMessage === "server-error" ? "5" : "4"}XX
    </div>
  );
}
