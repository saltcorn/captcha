# captcha

Protect forms from bots. Uses svg-captcha underneath, other engines may be added in the future.

## How to use

1. Install this module (captcha in the Saltcorn module store)
2. Create a field in the table where you want to protect row creation of the type `SvgCaptchaCertificate`.
3. In the Edit view on this table, you must include the field with type `SvgCaptchaCertificate` twice:

   - Once with the fieldview `SvgCaptchaImage`: this will show the image and also include a hidden element with an encryption of the solution (using bcrypt)
   - Once with the `SvgCaptchaInput` fieldview: this is where the user will enter the text in the image

   This was split into two fieldviews to give more flexibility to the form design.
