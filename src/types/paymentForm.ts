export interface PaymentFormProps {
    placeholders: { label: string }[];
    options: { value: string; label: string }[];
    initialValues: { amount?: string | undefined; wallet?: string };
    onSubmit: (values: { amount: string; wallet: string }) => void;
    submitForm: (submit: () => void) => void;
    type?: 'deposit' | 'withdraw';
}