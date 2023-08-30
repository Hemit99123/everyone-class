const resetForm = (refs) => {
    refs.forEach((ref) => {
        if (ref?.current) {
            ref.current.value = "";
        }
    });
};

export default resetForm;
