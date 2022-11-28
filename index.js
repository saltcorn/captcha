const {
  input,
  div,
  text,
  script,
  domReady,
  textarea,
  style,
  text_attr,
} = require("@saltcorn/markup/tags");
const { features } = require("@saltcorn/data/db/state");
const File = require("@saltcorn/data/models/file");
const headers = [];
const { compareSync, hashSync } = require("bcryptjs");

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
      attributes: [],
      validate: () => (x) => {
        if (!x) return { error: "Incorrect Captcha" };
        else return true;
      },
      read: (v) => {
        return v;
      },
      fieldviews: {
        SvgCaptcha: {
          isEdit: true,
          run: (nm, v, attrs, cls, required, field) => {
            const n = Math.round(10000 * Math.random());
            return (
              div(n) +
              input({
                type: "number",
                name: text_attr(nm),
                id: `input${text_attr(nm)}`,
              }) +
              input({
                type: "hidden",
                name: text_attr(nm) + "__hash",
                id: `input${text_attr(nm)}__hash`,
                value: hashSync(`${n}`, 10),
              })
            );
          },
        },
      },
    },
  ],
};