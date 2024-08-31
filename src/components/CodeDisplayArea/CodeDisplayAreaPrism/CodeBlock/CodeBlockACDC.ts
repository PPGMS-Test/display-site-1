export const CodeBlockACDC: string = 
`<script src="https://unpkg.com/@paypal/
             paypal-js@8.0.0/dist/iife/paypal-js.min.js">
</script>
<div>
  <div id="card-form" class="ui attached">
      <div id="card-number-field-container"></div>
      <div id="card-expiry-field-container"></div>
      <div id="card-cvv-field-container"></div>
      <div id="card-name-field-container"></div>
  </div>
   <button id="multi-card-field-button">Pay now with Card]</button>
</div>
<script>
   await window.paypalLoadScript({
      clientId: clientID,
       components: ["card-fields"],
   });

  const cardField = window.paypal_acdc.CardFields({
     createOrder: createOrderCallback,
     onApprove: approveCallBack,
  });

  let nameField;
  let numberField;
  let cvvField;
  let expiryField;

  const renderCardFlag = cardField.isEligible();
  console.log(renderCardFlag);
  // Render each field after checking for eligibility
  if (renderCardFlag) {
      nameField = cardField.NameField({
          inputEvents: {
              onChange: (data) => {
                  //onchange code
              },
          },
      });
      const nameFieldRenderPromise = nameField.render(
          "#card-name-field-container"
      );

      numberField = cardField.NumberField();
      const numberFieldRenderPromise = numberField.render(
          "#card-number-field-container"
      );

      cvvField = cardField.CVVField();
      const cvvFieldRenderPromise = cvvField.render(
          "#card-cvv-field-container"
      );

      expiryField = cardField.ExpiryField();
      const expiryFieldRenderPromise = expiryField.render(
          "#card-expiry-field-container"
      );

      Promise.all([
          nameFieldRenderPromise,
          numberFieldRenderPromise,
          cvvFieldRenderPromise,
          expiryFieldRenderPromise,
      ]).then(() => {
          //Display thread code
      });

      document
          .getElementById("multi-card-field-button")
          .addEventListener("click", () => {
              cardField.submit().catch((error) => {
                  //error handle
              });
          });
</script>`
