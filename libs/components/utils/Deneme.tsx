import { useFormStatus } from "react-dom";

const Deneme = () => {
  const { pending } = useFormStatus();
  return (
    <div>
      <button
        className="px-4 py-2 bg-defaultRed text-white disabled:bg-disabledRed"
        disabled={pending}
      >
        Deneme
      </button>
    </div>
  );
};

export default Deneme;
