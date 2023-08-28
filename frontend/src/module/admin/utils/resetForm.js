const resetForm = (refs) => {
    refs.forEach((ref) => (ref.current ? (ref.current.value = "") : ""));
};

export default resetForm;