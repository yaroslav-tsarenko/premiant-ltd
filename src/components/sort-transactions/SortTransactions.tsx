"use client";

import React from "react";
import { Field, Formik, Form } from "formik";
import styles from "./SortTransactions.module.scss";
import Button from "@/components/button/Button";

const SortTransactions = () => {
    const initialValues = { sort: "" };

    const handleSubmit = (values: { sort: string }) => {
        console.log("Submitted values:", values);
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
                        </Form>
                    )}
                </Formik>
            </div>
            <Button variant="payment">Сортировать</Button>
        </div>
    );
};

export default SortTransactions;
