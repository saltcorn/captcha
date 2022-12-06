const {
  input,
  div,
  text,
  script,
  domReady,
  textarea,
  p,
  style,
  text_attr,
  i,
} = require("@saltcorn/markup/tags");
const { verify } = require("hcaptcha");

module.exports = {
  name: "HCaptchaCertificate",
  sql_name: "boolean",
  attributes: [
    {
      name: "error_msg",
      label: "Error message",
      sublabel:
        "This is shown to the user if the valued entered does not match.",
      type: "String",
    },
    {
      name: "sitekey",
      label: "Sitekey",
      sublabel: "hCaptcha site key",
      required: true,
      type: "String",
    },
    {
      name: "secret",
      label: "Secret key",
      required: true,
      sublabel: "hCaptcha account secret",
      type: "String",
    },
  ],

  validate:
    ({ error_msg }) =>
    (x) => {
      if (!x) return { error: error_msg || "Incorrect captcha value" };
      else return true;
    },
  read: (v) => {
    return v;
  },
  postProcess: async (v, field) => {
    if (typeof v === "boolean") return;
    const secret = field.attributes.secret;
    const token = v.success ? v.success : v;
    const hres = await verify(secret, token);
    if (hres.success) {
      return { success: true };
    } else {
      return { error: field.attributes.error_msg || "verification failed" };
    }
  },

  fieldviews: {
    edit: {
      isEdit: true,
      run: (nm, v, attrs, cls, required, field) =>
        input({
          class: ["me-2 mt-1", cls],
          "data-fieldname": field.name,
          type: "checkbox",
          onChange: attrs.onChange,
          readonly: attrs.readonly,
          name: nm,
          id: `input${nm}`,
          ...(v && { checked: true }),
          ...(attrs.disabled && { onclick: "return false;" }),
        }),
    },
    show: {
      isEdit: false,
      run: (v) =>
        typeof v === "undefined" || v === null
          ? ""
          : v
          ? i({
              class: "fas fa-lg fa-check-circle text-success",
            })
          : i({
              class: "fas fa-lg fa-times-circle text-danger",
            }),
    },
    HCaptchaWidget: {
      isEdit: true,
      unsuitableAsAdminDefault: true,
      readFromFormRecord: (rec, name) => {
        if (rec["h-captcha-response"])
          return { success: rec["h-captcha-response"] };
        else return { error: "No hcaptcha response" };
      },
      run: (nm, v, attrs, cls, required, field) => {
        return (
          script({
            src: "https://js.hcaptcha.com/1/api.js",
            async: true,
            defer: true,
          }) +
          div({
            class: "h-captcha",
            "data-sitekey": field.attributes.sitekey,
          })
        );
      },
    },
  },
};
