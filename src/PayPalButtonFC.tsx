import React from 'react';
import ReactDOM from 'react-dom';
import { useFormik } from 'formik';
import type PayPal from '@paypal/paypal-js';

const buttonStyle = {
  color: 'gold',
  fundingicons: false,
  label: 'checkout',
  shape: 'rect',
  size: 'responsive',
  tagline: false,
} as PayPal.PayPalButtonsComponentOptions['style'];

type PayPalButtonComponent = React.ComponentType<
  PayPal.PayPalButtonsComponentOptions & { commit: boolean; env: string }
>;

export type PayPalFormValues = { _paypal_token?: string };

const PayPalButtonFunctionalComponent = () => {
  const paypal = window['paypal'];
  const formik = useFormik<PayPalFormValues>({
    initialValues: {
      _paypal_token: '',
    },
    onSubmit: async () => {
      await sleepUntilSubmitted();
      if (formik.isValid) formik.setSubmitting(true);
    },
  });

  const createOrderOrBillingAgreement = async () => {
    await formik.submitForm();
    await sleepUntilSubmitted();
    if (formik.isValid) formik.setSubmitting(true);
    return formik.values._paypal_token || '';
  };

  const sleepUntilSubmitted = async () => {
    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    while (formik.isSubmitting) {
      await sleep(100);
    }
  };

  if (!paypal) return null;

  const Button = (paypal.Buttons! as any).driver('react', {
    React,
    ReactDOM,
  }) as PayPalButtonComponent;

  const { isSubmitting } = formik;

  return (
    <div>
      <div style={(isSubmitting && { display: 'none' }) || {}}>
        <Button
          commit
          env="sandbox"
          createBillingAgreement={createOrderOrBillingAgreement}
          onCancel={() => formik.setSubmitting(false)}
          onError={() => formik.setSubmitting(false)}
          style={buttonStyle}
        />
      </div>
    </div>
  );
};

export default PayPalButtonFunctionalComponent;
