"use client";

import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import Dot from "@/components/dot/Dot";
import axios from "axios";
import styles from "./AdminStaticTRC.module.scss";
import { BACKEND_URL } from "@/constants/constants";
import AdminBeanie from "@/components/admin-beanie/AdminBeanie";
import Alert from "@/components/alert/Alert";

const AdminStaticTRC = () => {
    const [trcAddress, setTrcAddress] = useState<string>("");
    const [alert, setAlert] = useState<{ title: string; description: string, bottomText: string } | null>(null);

    // Fetch the current TRC address
    useEffect(() => {
        axios
            .get(`${BACKEND_URL}/trc/get-trc`)
            .then((response) => {
                setTrcAddress(response.data.address); // Set the fetched address
                console.log("Static trc:", response.data);
            })
            .catch((error) => {
                console.error("Error fetching TRC address:", error);
            });
    }, []);

    const handleApplyChanges = async (values: { trcAddress: string }) => {
        try {
            await axios.put(`${BACKEND_URL}/trc/update-trc`, { address: values.trcAddress });
            setAlert({ title: "Успех!", description: "TRC адрес обновлён успещно на:", bottomText: values.trcAddress });
            console.log(values.trcAddress);
            setTrcAddress(values.trcAddress);
            setTimeout(() => {
                window.location.reload();
            }, 1000)
        } catch (error) {
            console.error("Error updating TRC address:", error);
            setAlert({ title: "Error", description: "An error occurred while updating the address", bottomText: "Unknown error" });
        }
    };

    return (
        <>
            {alert && <Alert title={alert.title} description={alert.description} bottomText={alert.bottomText} onClose={() => setAlert(null)} />}
            <div className={styles.wrapper}>
                <Formik
                    initialValues={{ trcAddress: trcAddress || "" }}
                    enableReinitialize
                    onSubmit={(values) => {
                        handleApplyChanges(values);
                    }}
                >
                    {({ isSubmitting, handleSubmit }) => (
                        <Form className={styles.form}>
                            <AdminBeanie title="Details" onApplyChanges={handleSubmit} /> {/* Trigger form submission */}
                            <Dot textTransform="none" title="Enter the details where users will send money" />
                            <div className={styles.inputGroup}>
                                <Field
                                    name="trcAddress"
                                    type="text"
                                    className={styles.input}
                                    placeholder="TRC-20 Wallet"
                                />
                            </div>
                            <button type="submit" disabled={isSubmitting} style={{ display: "none" }}></button>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
};

export default AdminStaticTRC;
