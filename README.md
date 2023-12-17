# Frontend Engineer: Technical Challenge PayPal Button

## Task

Take a look at the component `PayPalButton`, located in `/src/PayPalButton.tsx`.

1. What issues with it can you spot?

### 1. Asynchronous State Update Issue:

#### Problem:
The `this.props.formik.submitForm()` is an asynchronous function call without an await, causing the line (`await this.sleepUntilSubmitted()`) to execute before `submitForm` completes.

#### Fix:
- Add `await` before `this.props.formik.submitForm()` to ensure that the subsequent line waits for the completion of the asynchronous operation.

---

### 2.  Undefined `_paypal_token`:

#### Problem:
In `createOrderOrBillingAgreement`, method is returning `this.props.formik.values._paypal_token!` without checking if `_paypal_token` exists, it may cause in an error if it's not present in `formik.values`.

#### Fix:
- Check if `_paypal_token` exists before attempting to return it. Alternatively, provide a default value to handle cases where it is undefined.

---

### 3.  Infinite Loop in `sleepUntilSubmitted`:

#### Problem:
The `sleepUntilSubmitted` method contains an infinite loop (`while (this.props.formik.isSubmitting)`) which may lead to performance issues due to continuous busy-waiting.

#### Fix:
- Consider using a timeout or an alternative mechanism to check for completion instead of relying on an infinite loop. This can help prevent performance degradation and improve the responsiveness of the application.


### 4.  Asynchronous Sleep in `sleepUntilSubmitted`:

#### Problem:

The `async` is already applied to the `sleepUntilSubmitted` function, and dont need in `sleep` function

#### Fix:
- Remove `async` from sleep function.

### 5. Unused `onApprove` Function:

#### Problem:

The `onApprove` function doesn't perform any specific actions.

#### Fix:
- Remove `onApprove` function.
---

2. Re-factor the class component into a functional component, while applying improvements regarding the problems you noted before and any other optimizations.
`src/PayPalButtonFC.tsx`
3. Bonus: Get rid of the HOC connect component (perhaps by utilising other available APIs).

- We use `useFormik` hook provided by Formik to access Formik's state and methods without using the `connect HOC`. Functional Component of PayPalButton component doesnot have `HOC connect`. check `src/PayPalButtonFC.tsx`.

4. Bonus: There is an issue with running the current implementation in `React.StrictMode` - the PayPal button will be duplicated, how would you go about solving this problem?


- The issue with the PayPal button being duplicated in React.StrictMode is likely due to the React.StrictMode invokes certain functions twice during development mode to help detect side-effects. To resolve this issue, we can consider wrapping the creation of the PayPal button inside a useEffect hook, check source file: `src/PayPalButtonRenderOnceInStrictMode.tsx`.


Issue with the PayPal button being duplicated in `React.StrictMode` is likely due to the intentional double invocation of certain functions by React.StrictMode during development mode. This is done to aid in the detection of potential side-effects.



### Additional notes

- The component uses [PayPal SDK](https://developer.paypal.com/docs/business/javascript-sdk/javascript-sdk-reference/). Keep in mind that due to the mock returning a fake value, `onAccept` will never be executed in this demo and the expected result is the SDK failing with `500` while trying to call `https://www.sandbox.paypal.com/smart/api/payment/fake_paypal_token/ectoken`
- The component also utilises [formik](https://formik.org/) as form/state management library.

## Submit your solution

You can provide your solution either

- as a zipped file containing the code or
- as a link to a fork of this repository.
