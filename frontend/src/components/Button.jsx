export function Button({ label, onPress }) {
  if (!label) return null;

  return (
    <button
      onClick={onPress}
      type="button"
      class="text-white bg-gray-800 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2"
    >
      {label}
    </button>
  );
}
