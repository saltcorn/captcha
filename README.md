# captcha

Protect forms from bots. Uses svg-captcha or hCaptacha underneath

## How to use svg-captcha

The SVG captured based solution has the advantage that it runs entirely on the
Saltcorn server and is completely private: user data are not shared with a
third-party.

1. Install this module (captcha in the Saltcorn module store)
2. Create a field in the table where you want to protect row creation of the type `SvgCaptchaCertificate`.
3. In the Edit view on this table, you must include the field with type `SvgCaptchaCertificate` twice:

   - Once with the fieldview `SvgCaptchaImage`: this will show the image and also include a hidden element with an encryption of the solution (using bcrypt)
   - Once with the `SvgCaptchaInput` fieldview: this is where the user will enter the text in the image

   This was split into two fieldviews to give more flexibility to the form design.

## hCaptcha

hCaptcha based solutions use the [hCaptcha](https://www.hcaptcha.com/) api. This is
probably harder for bots to solve than svg-captcha, however in the front-end user data are
captured and transmitted to hCaptcha. You can also use this to monetise your application
because hCaptcha can be set up to pay you for your users micro-tasks.

Using the solution requires Saltcorn 0.8.0 or more recent.

1. Install this module (captcha in the Saltcorn module store)
2. Create a field in the table where you want to protect row creation of the type `HCaptchaCertificate`.
   In the field attributes, set your hCaptcha site key and account secret, both of which you can obtain
   by setting up an account on [hCaptcha](https://www.hcaptcha.com/)
3. In the Edit view on this table, include the field with type `HCaptchaCertificate` using the `HCaptchaWidget` fieldview
