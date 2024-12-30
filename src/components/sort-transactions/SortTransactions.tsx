"use client";

import React from "react";
import { Field, Formik, Form } from "formik";
import styles from "./SortTransactions.module.scss";
import Button from "@/components/button/Button";

interface SortTransactionsProps {
    onSort: (sortKey: string) => void;
}

const SortTransactions: React.FC<SortTransactionsProps> = ({ onSort }) => {
    const initialValues = { sort: "" };

    const handleSubmit = (values: { sort: string }) => {
        onSort(values.sort);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.beanie}>
                <h1 className={styles.headline}>ВАШИ ТРАНЗАКЦИИ</h1>
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    {() => (
                        <Form className={styles.form}>
                            <div className={styles.inputGroup}>
                                <Field
                                    as="select"
                                    name="sort"
                                    className={styles.input}
                                >
                                    <option value="" label="Сортировать за"/>
                                    <option value="date" label="По дате"/>
                                    <option value="amount" label="По сумме"/>
                                </Field>
                            </div>
                            <Button type="submit" variant="payment">Сортировать</Button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default SortTransactions;