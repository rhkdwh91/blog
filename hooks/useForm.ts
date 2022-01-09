import { useState, useCallback } from "react";
import DOMPurify from "dompurify";

function useForm(initialForm, validationCheck?) {
  const [form, setForm] = useState(initialForm);

  const onChange = useCallback(
    (e) => {
      const { name, value } = e.currentTarget;
      setForm((form) => ({ ...form, [name]: DOMPurify.sanitize(value) }));
    },
    [form]
  );

  const reset = useCallback(() => setForm(initialForm), [initialForm]);

  return [form, { setForm, onChange, reset }];
}

export default useForm;
