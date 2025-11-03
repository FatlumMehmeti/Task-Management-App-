import * as yup from "yup";

export const yupResolverLocal =
  (schema: yup.ObjectSchema<any>) => async (values: unknown) => {
    try {
      const data = await schema.validate(values, { abortEarly: false });
      return { values: data, errors: {} } as any;
    } catch (err) {
      const vErr = err as yup.ValidationError;
      const fieldErrors: Record<string, { type: string; message: string }> = {};
      if (Array.isArray(vErr.inner) && vErr.inner.length) {
        for (const ie of vErr.inner) {
          if (ie.path && !fieldErrors[ie.path]) {
            fieldErrors[ie.path] = {
              type: ie.type || "validation",
              message: ie.message,
            };
          }
        }
      } else if (vErr.path) {
        fieldErrors[vErr.path] = {
          type: vErr.type || "validation",
          message: vErr.message,
        };
      }
      return { values: {}, errors: fieldErrors } as any;
    }
  };
