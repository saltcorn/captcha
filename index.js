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
} = require("@saltcorn/markup/tags");
const { compareSync, hashSync } = require("bcryptjs");
const svgCaptcha = require("svg-captcha");
module.exports = {
  sc_plugin_api_version: 1,
  plugin_name: "captcha",
  //headers,
  types: [
    {
      name: "SvgCaptchaCertificate",
      sql_name: "boolean",
      readFromFormRecord: (rec, name) => {
        if (!rec[name]) return false;
        if (!rec[name + "__hash"]) return false;
        const cmp = compareSync(rec[name], rec[name + "__hash"]);
        return cmp;
      },
      attributes: [
        {
          name: "error_msg",
          label: "Error message",
          sublabel:
            "This is shown to the user if the valued entered does not match.",
          type: "String",
        },
      ],
      skipAdminValidation: true,
      validate:
        ({ error_msg }) =>
        (x) => {
          if (!x) return { error: error_msg || "Incorrect captcha value" };
          else return true;
        },
      read: (v) => {
        return v;
      },
      fieldviews: {
        SvgCaptchaImage: {
          isEdit: true,
          run: (nm) => {
            var captcha = svgCaptcha.create();
            return (
              captcha.data +
              input({
                type: "hidden",
                name: text_attr(nm) + "__hash",
                id: `input${text_attr(nm)}__hash`,
                value: hashSync(captcha.text, 10),
              })
            );
          },
        },
        SvgCaptchaInput: {
          isEdit: true,
          run: (nm, v, attrs, cls, required, field) => {
            const errorFeedback =
              typeof v === "string"
                ? p(
                    { class: "text-danger" },
                    attrs?.error_msg || "Incorrect value"
                  )
                : "";
            return (
              input({
                type: "text",
                class: "form-control",
                name: text_attr(nm),
                id: `input${text_attr(nm)}`,
              }) + errorFeedback
            );
          },
        },
      },
    },
  ],
};
